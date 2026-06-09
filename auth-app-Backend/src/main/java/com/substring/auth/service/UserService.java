package com.substring.auth.service;

import com.substring.auth.dtos.UserDto;

import java.util.List;

public interface UserService {

    //Create User
    UserDto createUser(UserDto userDto);

    //GetUser By Email
    UserDto getUserByEmail(String email);

    //Get All Users
    List<UserDto> getAllUsers();

    //Update Users
    UserDto updateUserByEmail(String email, UserDto updatedUser);

    //Delete User
    void deleteUser(String email);
}