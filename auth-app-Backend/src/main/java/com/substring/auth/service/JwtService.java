package com.substring.auth.service;

import com.substring.auth.entities.Role;
import com.substring.auth.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Data
public class JwtService {

    private final SecretKey secretKey;
    private final long accessTtlSeconds;
    private final long refreshTtlSeconds;
    private final String issuer;

    public JwtService(
            @Value("${security.jwt.secret}") String secret,
            @Value("${security.jwt.access-ttl-seconds}") long accessTtlSeconds,
            @Value("${security.jwt.refresh-ttl-seconds}") long refreshTtlSeconds,
            @Value("${security.jwt.issuer}") String issuer
    ) {

        if (secret == null || secret.length() < 64) {
            throw new IllegalArgumentException(
                    "JWT Secret Key must be at least 64 characters for HS512"
            );
        }

        this.secretKey = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );

        this.accessTtlSeconds = accessTtlSeconds;
        this.refreshTtlSeconds = refreshTtlSeconds;
        this.issuer = issuer;
    }

    // Generate Access Token
    public String generateToken(User user) {

        Instant now = Instant.now();

        List<String> roles = user.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(user.getId().toString())
                .setIssuer(issuer)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(accessTtlSeconds)))
                .claim("email", user.getEmail())
                .claim("roles", roles)
                .claim("typ", "access")
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    // Generate Refresh Token
    public String generateRefreshToken(User user, String jti) {

        Instant now = Instant.now();

        return Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(user.getId().toString())
                .setIssuer(issuer)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(refreshTtlSeconds)))
                .claim("typ", "refresh")
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    // Parse JWT Token
    public Jws<Claims> parse(String token) {

        try {

            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);

        } catch (Exception ex) {

            throw new RuntimeException(
                    "Invalid or Expired JWT Token",
                    ex
            );
        }
    }

    // Validate Access Token
    public boolean isAccessTokenValid(String token) {
        Claims claims = parse(token).getBody();
        return "access".equals(claims.get("typ", String.class));
    }

    // Validate Refresh Token
    public boolean isRefreshToken(String token) {
        Claims claims = parse(token).getBody();
        return "refresh".equals(claims.get("typ", String.class));
    }

    // Extract User ID
    public UUID getUserId(String token) {
        Claims claims = parse(token).getBody();
        return UUID.fromString(claims.getSubject());
    }

    // Extract JWT ID
    public String getJti(String token) {
        Claims claims = parse(token).getBody();
        return claims.getId();
    }

    // Extract Email
    public String getEmail(String token) {
        Claims claims = parse(token).getBody();
        return claims.get("email", String.class);
    }

    // Extract Roles
    @SuppressWarnings("unchecked")
    public List<String> getRoles(String token) {
        Claims claims = parse(token).getBody();
        return claims.get("roles", List.class);
    }
}