package com.substring.auth.service;

import com.substring.auth.dtos.UserDto;

public interface AuthService {

    //Register User
    UserDto registerUser(UserDto userDto);

    //Login User
    UserDto loginUser(UserDto userDto);
}
