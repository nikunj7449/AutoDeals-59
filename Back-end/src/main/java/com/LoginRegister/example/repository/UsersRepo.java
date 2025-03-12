package com.LoginRegister.example.repository;

import com.LoginRegister.example.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsersRepo extends JpaRepository<Users, Long> {  

    // Custom query method to find a user by email
    Optional<Users> findByEmail(String email);  
}
