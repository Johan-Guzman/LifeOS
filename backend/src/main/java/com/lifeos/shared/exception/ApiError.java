package com.lifeos.shared.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ApiError(
        int status,
        String message,
        LocalDateTime timestamp,
        Map<String, String> errors
) {
    public static ApiError of(int status, String message) {
        return new ApiError(status, message, LocalDateTime.now(), Map.of());
    }

    public static ApiError validation(Map<String, String> errors) {
        return new ApiError(400, "Validation failed", LocalDateTime.now(), errors);
    }
}
