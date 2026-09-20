package com.lifeos.tasks.dto; import com.lifeos.tasks.*; import jakarta.validation.constraints.*; import java.time.LocalDate;
public record TaskRequest(@NotBlank @Size(max=200) String title,@Size(max=5000) String description,@NotNull TaskStatus status,@NotNull TaskPriority priority,@Positive Integer estimatedMinutes,LocalDate dueDate){}
