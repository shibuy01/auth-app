package com.substring.auth.service;

import com.substring.auth.dtos.UserDto;
import com.substring.auth.entities.User;
import com.substring.auth.repositories.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto registerUser(UserDto userDto) {

        User existingUser =
                this.userRepo.findByEmail(userDto.getEmail());

        if (existingUser != null) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already exists : "
                            + userDto.getEmail()
            );
        }

        User user = dtoToUser(userDto);

        user.setPassword(
                passwordEncoder.encode(userDto.getPassword())
        );

        User savedUser = userRepo.save(user);

        return userToDto(savedUser);
    }

    private User dtoToUser(UserDto userDto){

        User user = new User();

        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());

        return user;
    }

    private UserDto userToDto(User user){

        UserDto dto = new UserDto();

        dto.setName(user.getName());
        dto.setEmail(user.getEmail());

        return dto;
    }

    @Override
    public UserDto loginUser(UserDto userDto) {
        return null;
    }
}