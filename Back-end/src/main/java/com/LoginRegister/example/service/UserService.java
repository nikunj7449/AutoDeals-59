package com.LoginRegister.example.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LoginRegister.example.dto.UserDTO;
import com.LoginRegister.example.dto.UserRegistrationDTO;
import com.LoginRegister.example.entity.Users;
import com.LoginRegister.example.repository.UsersRepo;
import com.LoginRegister.example.requests.LoginRequest;
import com.LoginRegister.example.requests.ForgotPasswordRequest;

@Service
public class UserService {

    @Autowired
    UsersRepo usersrepo;

    public UserDTO addUser(UserRegistrationDTO userRegistrationDTO) {
        Users user = new Users(
        		userRegistrationDTO.getEmail(),
        		userRegistrationDTO.getFirstName(),
        		userRegistrationDTO.getLastName(),
        		userRegistrationDTO.getPassword(),
        		userRegistrationDTO.getNumber()
        );

        Users savedUser = usersrepo.save(user);

        return new UserDTO(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getNumber()
        );
    }

    public Map<String, Object> loginUser(LoginRequest loginRequest) {
        Optional<Users> user = usersrepo.findByEmail(loginRequest.getEmail());
        Map<String, Object> response = new HashMap<>();

        if (!user.isPresent()) {
            response.put("success", false);
            response.put("message", "Invalid User ID");
            return response;
        }

        Users user1 = user.get();

        if (!user1.getPassword().equals(loginRequest.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid Password");
            return response;
        }

        response.put("success", true);
        response.put("id", user1.getId());
        response.put("firstName", user1.getFirstName());

        return response;
    }

    public Map<String, Object> forgotPassword(ForgotPasswordRequest forgotPasswordRequest) {
        Map<String, Object> response = new HashMap<>();

        Optional<Users> userOptional = usersrepo.findByEmail(forgotPasswordRequest.getEmail());

        if (!userOptional.isPresent()) {
            response.put("success", false);
            response.put("message", "Email not found.");
            return response;
        }

        Users user = userOptional.get();
        user.setPassword(forgotPasswordRequest.getPassword()); // Update password
        usersrepo.save(user); // Save updated user

        response.put("success", true);
        response.put("message", "Password updated successfully.");
        return response;
    }
}
