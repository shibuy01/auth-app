package com.substring.auth.security;

import com.substring.auth.entities.Provider;
import com.substring.auth.entities.RefreshToken;
import com.substring.auth.entities.User;
import com.substring.auth.repositories.RefreshTokenRepo;
import com.substring.auth.repositories.UserRepo;
import com.substring.auth.service.CookieService;
import com.substring.auth.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.UUID;

@Component
@AllArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserRepo userRepository;
    private final CookieService cookieService;
    private final JwtService jwtService;
    private final RefreshTokenRepo refreshTokenRepo;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        logger.info("Authentication Successful");
        logger.info(authentication.toString());

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // identify user..
        String registrationId = "unknown";
        if(authentication instanceof OAuth2AuthenticationToken token){
            registrationId = token.getAuthorizedClientRegistrationId();
        }

        logger.info("registrationId: " + registrationId);
        logger.info("user " + oAuth2User.getAttributes().toString());

        User user ;
        switch (registrationId) {
            case "google" -> {
                String googleId = oAuth2User.getAttributes().getOrDefault("sub", "").toString();
                String email = oAuth2User.getAttributes().getOrDefault("email", "").toString();
                String name = oAuth2User.getAttributes().getOrDefault("name", "").toString();
                String picture = oAuth2User.getAttributes().getOrDefault("picture", "").toString();
               User newuser = User.builder()
                        .email(email)
                        .name(name)
                        .image(picture)
                        .provider(Provider.GOOGLE)
                        .build();

                user = userRepository.findByEmail(email);

                if(user == null){
                    user = userRepository.save(newuser);
                }
            }
            default -> {
                throw new RuntimeException("Invalid registration id");
            }
        }

        String jti = UUID.randomUUID().toString();
        RefreshToken refreshTokenDb = RefreshToken.builder()
                .jti(jti)
                .user(user)
                .revoked(false)
                .createdAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .build();

        refreshTokenRepo.save(refreshTokenDb);

        String accessToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user, refreshTokenDb.getJti());
        cookieService.attachRefreshCookie(response, refreshToken, (int) jwtService.getRefreshTtlSeconds());

        response.getWriter().write("Login Successful...");
    }
}
