package com.substring.auth.controller;

import com.substring.auth.dtos.LoginRequestDto;
import com.substring.auth.dtos.LoginResponseDto;
import com.substring.auth.dtos.UserDto;
import com.substring.auth.entities.RefreshToken;
import com.substring.auth.entities.Role;
import com.substring.auth.entities.User;
import com.substring.auth.repositories.RefreshTokenRepo;
import com.substring.auth.repositories.UserRepo;
import com.substring.auth.security.JwtService;
import com.substring.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenRepo refreshTokenRepo;

    // User Register Function...
    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(
            @RequestBody UserDto userDto) {
        return ResponseEntity.ok(authService.registerUser(userDto));
    }


    // User Login Function...
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @Valid @RequestBody LoginRequestDto loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("User not found");
        }

        if (!passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword())) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }

        //Refresh Token
        String jti = UUID.randomUUID().toString();
        var refreshTokenOb = RefreshToken.builder()
                .jti(jti)
                .user(user)
                .createdAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .revoked(false)
                .build();

        // RefreshToken Save --Information...
        refreshTokenRepo.save(refreshTokenOb);

        // Access Token Generate...
        String accesstoken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user, refreshTokenOb.getJti());

        UserDto responseUser = UserDto.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .name(user.getName())
                .image(user.getImage())
                .provider(user.getProvider())
                .created_at(user.getCreatedAt())
                .roles(user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()))
                .build();

        LoginResponseDto response = LoginResponseDto.builder()
                .token(accesstoken)
                .token_type("Bearer")
                .expires_in("3600")
                .access_token(accesstoken)
                .user(responseUser)
                .build();

        return ResponseEntity.ok(response);
    }

    // User Logout Function...
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logout successful");
    }
}