package com.lifeos;

import com.lifeos.events.EventRepository;
import com.lifeos.expenses.ExpenseRepository;
import com.lifeos.goals.GoalRepository;
import com.lifeos.habits.HabitRepository;
import com.lifeos.projects.ProjectRepository;
import com.lifeos.tasks.TaskRepository;
import com.lifeos.users.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class LifeosApiIntegrationTests {

    private static final Pattern TOKEN_PATTERN = Pattern.compile("\\\"token\\\":\\\"([^\\\"]+)\\\"");
    private static final Pattern ID_PATTERN = Pattern.compile("\\\"id\\\":(\\d+)");

    @Autowired private MockMvc mockMvc;
    @Autowired private UserRepository userRepository;
    @Autowired private TaskRepository taskRepository;
    @Autowired private EventRepository eventRepository;
    @Autowired private HabitRepository habitRepository;
    @Autowired private GoalRepository goalRepository;
    @Autowired private ProjectRepository projectRepository;
    @Autowired private ExpenseRepository expenseRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    private final List<String> testEmails = new ArrayList<>();

    @AfterEach
    void cleanUp() {
        testEmails.forEach(email -> userRepository.findByEmail(email).ifPresent(user -> {
            taskRepository.deleteAll(taskRepository.findAllByUserIdOrderByCreatedAtDesc(user.getId()));
            eventRepository.deleteAll(eventRepository.findAllByUserIdOrderByStartDateTimeAsc(user.getId()));
            habitRepository.deleteAll(habitRepository.findAllByUserIdOrderByCreatedAtDesc(user.getId()));
            goalRepository.deleteAll(goalRepository.findAllByUserIdOrderByCreatedAtDesc(user.getId()));
            projectRepository.deleteAll(projectRepository.findAllByUserIdOrderByCreatedAtDesc(user.getId()));
            expenseRepository.deleteAll(expenseRepository.findAllByUserIdOrderByExpenseDateDesc(user.getId()));
            userRepository.delete(user);
        }));
    }

    @Test
    void healthIsPublic() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(content().string("LifeOS API is running"));
    }

    @Test
    void registerHashesPasswordAndDoesNotExposeIt() throws Exception {
        String email = uniqueEmail();

        mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content(registerJson("Johan Test", email)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.user.email").value(email))
                .andExpect(jsonPath("$.user.password").doesNotExist());

        String passwordHash = userRepository.findByEmail(email).orElseThrow().getPassword();
        assertThat(passwordHash).isNotEqualTo("Password123!");
        assertThat(passwordEncoder.matches("Password123!", passwordHash)).isTrue();
    }

    @Test
    void duplicateEmailAndInvalidRegistrationReturnConsistentErrors() throws Exception {
        String email = uniqueEmail();
        register(email);

        mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content(registerJson("Other User", email)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status").value(409))
                .andExpect(jsonPath("$.message").value("Email already registered"))
                .andExpect(jsonPath("$.timestamp").exists());

        mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"\",\"email\":\"not-an-email\",\"password\":\"short\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.errors.email").exists());
    }

    @Test
    void loginReturnsJwtAndInvalidPasswordIsUnauthorized() throws Exception {
        String email = uniqueEmail();
        register(email);

        mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + email + "\",\"password\":\"Password123!\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.user.password").doesNotExist());

        mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + email + "\",\"password\":\"wrong-password\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401));
    }

    @Test
    void protectedEndpointWithoutJwtReturnsJson401() throws Exception {
        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.message").value("Authentication is required"));
    }

    @Test
    void taskCrudUsesJwtAndOnlyReturnsOwnedTasks() throws Exception {
        String token = register(uniqueEmail());
        MvcResult created = mockMvc.perform(post("/api/tasks").header(HttpHeaders.AUTHORIZATION, bearer(token))
                        .contentType(MediaType.APPLICATION_JSON).content(taskJson("First task", "TODO")))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.title").value("First task")).andReturn();
        long id = idFrom(created);

        mockMvc.perform(get("/api/tasks").header(HttpHeaders.AUTHORIZATION, bearer(token)))
                .andExpect(status().isOk()).andExpect(jsonPath("$[0].id").value(id));
        mockMvc.perform(get("/api/tasks/{id}", id).header(HttpHeaders.AUTHORIZATION, bearer(token)))
                .andExpect(status().isOk()).andExpect(jsonPath("$.title").value("First task"));
        mockMvc.perform(put("/api/tasks/{id}", id).header(HttpHeaders.AUTHORIZATION, bearer(token))
                        .contentType(MediaType.APPLICATION_JSON).content(taskJson("Updated task", "IN_PROGRESS")))
                .andExpect(status().isOk()).andExpect(jsonPath("$.title").value("Updated task"));
        mockMvc.perform(delete("/api/tasks/{id}", id).header(HttpHeaders.AUTHORIZATION, bearer(token)))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/api/tasks").header(HttpHeaders.AUTHORIZATION, bearer(token)))
                .andExpect(status().isOk()).andExpect(jsonPath("$").isEmpty());
    }

    @Test
    void userCannotAccessAnotherUsersTask() throws Exception {
        String ownerToken = register(uniqueEmail());
        String otherToken = register(uniqueEmail());
        long id = idFrom(mockMvc.perform(post("/api/tasks").header(HttpHeaders.AUTHORIZATION, bearer(ownerToken))
                        .contentType(MediaType.APPLICATION_JSON).content(taskJson("Private task", "TODO")))
                .andExpect(status().isCreated()).andReturn());

        mockMvc.perform(get("/api/tasks/{id}", id).header(HttpHeaders.AUTHORIZATION, bearer(otherToken)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));
    }

    @Test
    void otherModuleListsDoNotLeakDataAcrossUsers() throws Exception {
        String ownerToken = register(uniqueEmail());
        String otherToken = register(uniqueEmail());
        create(ownerToken, "/api/events", "{\"title\":\"Private event\",\"startDateTime\":\"2026-10-01T09:00:00\",\"endDateTime\":\"2026-10-01T10:00:00\"}");
        create(ownerToken, "/api/habits", "{\"name\":\"Read\",\"frequency\":\"DAILY\",\"targetPerWeek\":7,\"currentStreak\":0,\"longestStreak\":0,\"active\":true}");
        create(ownerToken, "/api/goals", "{\"title\":\"Private goal\",\"status\":\"ACTIVE\",\"progress\":0}");
        create(ownerToken, "/api/projects", "{\"name\":\"Private project\",\"status\":\"PLANNED\"}");
        create(ownerToken, "/api/expenses", "{\"description\":\"Coffee\",\"amount\":3.50,\"category\":\"FOOD\",\"expenseDate\":\"2026-10-01\"}");

        for (String path : List.of("/api/events", "/api/habits", "/api/goals", "/api/projects", "/api/expenses")) {
            mockMvc.perform(get(path).header(HttpHeaders.AUTHORIZATION, bearer(otherToken)))
                    .andExpect(status().isOk()).andExpect(jsonPath("$").isEmpty());
        }
    }

    private void create(String token, String path, String json) throws Exception {
        mockMvc.perform(post(path).header(HttpHeaders.AUTHORIZATION, bearer(token))
                        .contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isCreated());
    }

    private String register(String email) throws Exception {
        return tokenFrom(mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content(registerJson("Test User", email)))
                .andExpect(status().isCreated()).andReturn());
    }

    private String uniqueEmail() {
        String email = "test-" + UUID.randomUUID() + "@lifeos.test";
        testEmails.add(email);
        return email;
    }

    private static String registerJson(String name, String email) {
        return "{\"name\":\"" + name + "\",\"email\":\"" + email + "\",\"password\":\"Password123!\"}";
    }

    private static String taskJson(String title, String status) {
        return "{\"title\":\"" + title + "\",\"status\":\"" + status + "\",\"priority\":\"HIGH\",\"estimatedMinutes\":30}";
    }

    private static String bearer(String token) { return "Bearer " + token; }

    private static String tokenFrom(MvcResult result) throws Exception {
        return value(TOKEN_PATTERN, result.getResponse().getContentAsString());
    }

    private static long idFrom(MvcResult result) throws Exception {
        return Long.parseLong(value(ID_PATTERN, result.getResponse().getContentAsString()));
    }

    private static String value(Pattern pattern, String response) {
        Matcher matcher = pattern.matcher(response);
        assertThat(matcher.find()).as("Expected JSON field in response: %s", response).isTrue();
        return matcher.group(1);
    }
}
