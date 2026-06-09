package com.substring.auth.controller;

import com.substring.auth.dtos.UserDto;
import com.substring.auth.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userDto));
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserDto> getUsersByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @PutMapping("/{email}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable String email,
            @RequestBody UserDto userDto) {

        return ResponseEntity.ok(
                userService.updateUserByEmail(email, userDto)
        );
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteUser(
            @PathVariable String email) {

        this.userService.deleteUser(email);

        return ResponseEntity.ok("User deleted successfully");
    }
}
