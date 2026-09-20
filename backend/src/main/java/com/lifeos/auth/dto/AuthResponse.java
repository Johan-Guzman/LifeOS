package com.lifeos.auth.dto;

import com.lifeos.users.dto.UserResponse;
public record AuthResponse(String token, UserResponse user) { }
