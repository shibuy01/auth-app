package com.substring.auth.controller;

import com.substring.auth.dtos.LoginResponseDto;
import com.substring.auth.dtos.UserDto;
import com.substring.auth.entities.User;
import com.substring.auth.repositories.UserRepo;
import com.substring.auth.security.JwtService;
import com.substring.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(authService.registerUser(userDto));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @Valid @RequestBody UserDto userDto) {

        User user = userRepository.findByEmail(userDto.getEmail());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("User not found");
        }

        if (!passwordEncoder.matches(
                userDto.getPassword(),
                user.getPassword())) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }

        String token = jwtService.generateToken(user);

        LoginResponseDto response = LoginResponseDto.builder()
                .token(token)
                .user(userDto)
                .token_type("Bearer")
                .expires_in("3600")
                .access_token(token)
                .user(userDto)
                .build();

        return ResponseEntity.ok(response);
    }
}
