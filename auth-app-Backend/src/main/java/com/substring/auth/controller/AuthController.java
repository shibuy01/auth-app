package com.substring.auth.controller;

import com.substring.auth.dtos.*;
import com.substring.auth.entities.RefreshToken;
import com.substring.auth.entities.Role;
import com.substring.auth.entities.User;
import com.substring.auth.repositories.RefreshTokenRepo;
import com.substring.auth.repositories.UserRepo;
import com.substring.auth.security.JwtService;
import com.substring.auth.service.AuthService;
import com.substring.auth.service.CookieService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;
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
    private final CookieService cookieService;

    // User Register Function...
    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(
            @RequestBody UserDto userDto) {
        return ResponseEntity.ok(authService.registerUser(userDto));
    }


    // User Login Function...
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @Valid @RequestBody LoginRequestDto loginRequest, HttpServletResponse responses) {

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

        // Use Cookies Service To Attach Refresh Token In Cookie
        cookieService.attachRefreshCookie(responses, refreshToken, (int)jwtService.getRefreshTtlSeconds());
        cookieService.addNoStoreHeaders(responses);

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
//                .token(accesstoken)
                .access_token(accesstoken)
                .refresh_token(refreshToken)
                .token_type("Bearer")
                .expires_in("3600")
                .user(responseUser)
                .build();

        return ResponseEntity.ok(response);
    }


    // access and refresh token rename karne ke lie...

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refreshToken(
            @RequestBody(required = false) RefreshTokenRequest body,
            HttpServletResponse responses,
            HttpServletRequest request
    ){

        String refreshToken = readRefreshTokenFromRequest(body, request).orElseThrow(()->new BadCredentialsException("Invalid refresh Token"));

        if(!jwtService.isRefreshTokenValid(refreshToken)) {
            throw new BadCredentialsException("Invalid refresh Token");
        }

        String jti = jwtService.getJti(refreshToken);
        UUID userId = jwtService.getUserId(refreshToken);
        RefreshToken storedRefreshToken = refreshTokenRepo.findByJti(jti).orElseThrow(()->new BadCredentialsException("refresh Token not recognized.."));

    }

    //this method will read refresh token from request header or body
    private Optional<String> readRefreshTokenFromRequest(
            RefreshTokenRequest body,
            HttpServletRequest request) {

        // 1. HttpOnly Cookie (Highest Priority)
        if (request.getCookies() != null) {

            Optional<String> cookieToken = Arrays.stream(request.getCookies())
                    .filter(cookie -> Objects.equals(
                            cookieService.getRefreshTokenCookieName(),
                            cookie.getName()))
                    .map(Cookie::getValue)
                    .map(String::trim)
                    .filter(token -> !token.isBlank())
                    .findFirst();

            if (cookieToken.isPresent()) {
                return cookieToken;
            }
        }

        // 2. Request Body
        if (body != null
                && body.getRefreshToken() != null
                && !body.getRefreshToken().isBlank()) {

            return Optional.of(body.getRefreshToken().trim());
        }

        // 3. Custom Header
        String refreshHeader = request.getHeader("X-Refresh-Token");

        if (refreshHeader != null && !refreshHeader.isBlank()) {
            return Optional.of(refreshHeader.trim());
        }

        return Optional.empty();
    }


    // User Logout Function...
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logout successful");
    }
}