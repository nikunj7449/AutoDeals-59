package com.LoginRegister.example.repository;

import com.LoginRegister.example.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointment, Long> {

    // Find appointments by user ID
    List<Appointment> findByUserId(Long userId);

    // Find appointments by car ID
    List<Appointment> findByCarId(Long carId);

    // Find appointments by status (e.g., "Pending", "Confirmed", "Cancelled")
    List<Appointment> findByStatus(String status);

    // Find appointments by user type (e.g., "buyer", "seller")
    List<Appointment> findByUserType(String userType);

    // Find a single appointment by user ID and user type (to check existing appointments for a user)
    Optional<Appointment> findByUserIdAndUserType(Long userId, String userType);
}
