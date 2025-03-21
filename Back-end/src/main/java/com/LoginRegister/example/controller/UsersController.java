package com.LoginRegister.example.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.LoginRegister.example.dto.UserDTO;
import com.LoginRegister.example.dto.UserRegistrationDTO;
import com.LoginRegister.example.requests.LoginRequest;
import com.LoginRegister.example.requests.ForgotPasswordRequest;
import com.LoginRegister.example.service.UserService;

@RestController
public class UsersController {

    @Autowired
    UserService userService;

    @PostMapping("/addUser")
    public UserDTO addUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        return userService.addUser(userRegistrationDTO);
    }

    @PostMapping("/loginUser")
    public Map<String, Object> loginUser(@RequestBody LoginRequest loginRequest) {
        return userService.loginUser(loginRequest);
    }

    @PostMapping("/forgotPassword")
    public Map<String, Object> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        return userService.forgotPassword(forgotPasswordRequest);
    }
}