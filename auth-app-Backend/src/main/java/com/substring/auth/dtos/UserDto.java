package com.substring.auth.dtos;

import com.substring.auth.entities.Provider;
import com.substring.auth.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private String email;
    private String name;
    private String password;
    private String image;
    private Provider provider;
    private Set<String> roles;
}
