package com.substring.auth.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {

    private String token;
    private String token_type;
    private String expires_in;
    private String access_token;
    private UserDto  user;
    private String refresh_token;
}