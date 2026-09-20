package com.lifeos.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {
    private final String secret;
    private final long expiration;
    private SecretKey signingKey;

    public JwtService(@Value("${jwt.secret}") String secret,
                      @Value("${jwt.expiration}") long expiration) {
        this.secret = secret;
        this.expiration = expiration;
    }

    @PostConstruct
    void initialize() {
        if (secret == null || secret.getBytes(StandardCharsets.UTF_8).length < 32) {
            throw new IllegalStateException("JWT_SECRET must contain at least 32 bytes");
        }
        if (expiration <= 0) {
            throw new IllegalStateException("JWT_EXPIRATION must be positive");
        }
        signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String email) {
        Date now = new Date();
        return Jwts.builder().subject(email).issuedAt(now)
                .expiration(new Date(now.getTime() + expiration)).signWith(signingKey).compact();
    }

    public String extractEmail(String token) {
        return claims(token).getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            return userDetails.getUsername().equals(extractEmail(token)) && !isTokenExpired(token);
        } catch (RuntimeException exception) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) { return claims(token).getExpiration().before(new Date()); }
    private Claims claims(String token) {
        return Jwts.parser().verifyWith(signingKey).build().parseSignedClaims(token).getPayload();
    }
}
