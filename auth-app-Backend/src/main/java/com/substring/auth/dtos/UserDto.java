package com.substring.auth.dtos;

import com.substring.auth.entities.Provider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private String email;
    private String password;
    private String name;
    private String image;
    private Provider provider;
    private Set<String> roles;
    private LocalDateTime created_at;
}