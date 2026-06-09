package com.substring.auth.service;

import com.substring.auth.dtos.UserDto;
import com.substring.auth.entities.User;
import com.substring.auth.exceptions.ResourceNotFoundEXception;
import com.substring.auth.repositories.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImple implements UserService {

    private final UserRepo userRepo;

    public UserServiceImple(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDto createUser(UserDto userDto) {

        User user = dtoToUser(userDto);

        User savedUser = userRepo.save(user);

        return userToDto(savedUser);
    }

    @Override
    public UserDto getUserByEmail(String email) {

        User user = userRepo.findByEmail(email);

        if (user == null) {
            throw new ResourceNotFoundEXception("User not found with email : " + email);
        }

        return userToDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {

        List<User> users = userRepo.findAll();

        return users.stream()
                .map(this::userToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateUserByEmail(String email, UserDto updatedUser) {

        User user = userRepo.findByEmail(email);

        if (user == null) {
            throw new ResourceNotFoundEXception("User not found with email : " + email);
        }

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setImage(updatedUser.getImage());

        User updated = userRepo.save(user);

        return userToDto(updated);
    }

    @Override
    public void deleteUser(String email) {

        User user = userRepo.findByEmail(email);

        if (user == null) {
            throw new ResourceNotFoundEXception("User not found with email : " + email);
        }

        userRepo.delete(user);
    }

    // DTO -> Entity
    private User dtoToUser(UserDto dto) {

        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .image(dto.getImage())
                .provider(dto.getProvider())
                .build();
    }

    // Entity -> DTO
    private UserDto userToDto(User user) {

        return UserDto.builder()
                .name(user.getName())
                .email(user.getEmail())
                .password(user.getPassword())
                .image(user.getImage())
                .provider(user.getProvider())
                .build();
    }
}