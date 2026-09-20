package com.lifeos.users;

import org.springframework.web.bind.annotation.*;

import com.lifeos.users.dto.UserResponse;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping({"", "/me"})
    public UserResponse currentUser(@AuthenticationPrincipal UserDetails principal) {
        return UserResponse.from(userService.getByEmail(principal.getUsername()));
    }
}

