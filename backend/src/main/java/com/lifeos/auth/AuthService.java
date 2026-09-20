package com.lifeos.auth;

import com.lifeos.auth.dto.AuthResponse;
import com.lifeos.auth.dto.LoginRequest;
import com.lifeos.auth.dto.RegisterRequest;
import com.lifeos.shared.exception.ConflictException;
import com.lifeos.users.User;
import com.lifeos.users.UserRepository;
import com.lifeos.users.dto.UserResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository; this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager; this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email().trim().toLowerCase())) {
            throw new ConflictException("Email already registered");
        }
        User user = userRepository.save(new User(request.name().trim(), request.email().trim().toLowerCase(),
                passwordEncoder.encode(request.password())));
        return response(user);
    }

    public AuthResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase();
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, request.password()));
        User user = userRepository.findByEmail(email).orElseThrow();
        return response(user);
    }

    private AuthResponse response(User user) {
        return new AuthResponse(jwtService.generateToken(user.getEmail()), UserResponse.from(user));
    }
}
