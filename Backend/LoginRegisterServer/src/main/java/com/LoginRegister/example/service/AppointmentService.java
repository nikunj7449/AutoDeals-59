package com.LoginRegister.example.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LoginRegister.example.entity.Appointment;
import com.LoginRegister.example.repository.AppointmentRepo;
import com.LoginRegister.example.requests.AppointmentRequest;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepo appointmentRepo;

    
    public Map<String, Object> addAppointment(String userType, AppointmentRequest appointmentRequest) {
        Map<String, Object> response = new HashMap<>();

        // Check for existing appointment with the same userId and userType
        Optional<Appointment> existingAppointment = appointmentRepo.findByUserIdAndUserType(
                appointmentRequest.getUserId(), userType);

        if (existingAppointment.isPresent()) {
            response.put("success", false);
            response.put("message", "You have already booked one appointment for " + userType + ".");
            return response;
        }

        Appointment appointment = new Appointment();
        appointment.setUserId(appointmentRequest.getUserId());
        appointment.setUserType(userType);
        appointment.setStatus(appointmentRequest.getStatus());

        if ("seller".equalsIgnoreCase(userType)) {
            appointment.setBrand(appointmentRequest.getBrand());
            appointment.setRtoLocation(appointmentRequest.getRtoLocation());
            appointment.setYear(appointmentRequest.getYear());
            appointment.setModel(appointmentRequest.getModel());
            appointment.setVariant(appointmentRequest.getVariant());
            appointment.setOwner(appointmentRequest.getOwner());
            appointment.setKmDriven(appointmentRequest.getKmDriven());
            appointment.setCarId(null);
        } else if ("buyer".equalsIgnoreCase(userType)) {
            appointment.setCarId(appointmentRequest.getCarId());
            appointment.setBrand(null);
            appointment.setRtoLocation(null);
            appointment.setYear(null);
            appointment.setModel(null);
            appointment.setVariant(null);
            appointment.setOwner(null);
            appointment.setKmDriven(null);
        } else {
            response.put("success", false);
            response.put("message", "Invalid userType. Please specify 'buyer' or 'seller'.");
            return response;
        }

        appointmentRepo.save(appointment);
        response.put("success", true);
        response.put("message", "Appointment booked successfully for " + userType + ".");
        return response;
    }

    
    public Map<String, Object> getAppointmentsByUserType(String userType) {
        Map<String, Object> response = new HashMap<>();
        List<Appointment> appointments = appointmentRepo.findByUserType(userType);

        if (appointments.isEmpty()) {
            response.put("success", false);
            response.put("message", "No appointments found for user type: " + userType + ".");
            return response;
        }

        List<Map<String, Object>> appointmentList = new ArrayList<>();
        for (Appointment appointment : appointments) {
            Map<String, Object> appointmentData = new HashMap<>();
            appointmentData.put("userType", appointment.getUserType());
            appointmentData.put("userId", appointment.getUserId());
            appointmentData.put("status", appointment.getStatus());

            if ("seller".equalsIgnoreCase(userType)) {
                appointmentData.put("brand", appointment.getBrand());
                appointmentData.put("rtoLocation", appointment.getRtoLocation());
                appointmentData.put("year", appointment.getYear());
                appointmentData.put("model", appointment.getModel());
                appointmentData.put("variant", appointment.getVariant());
                appointmentData.put("owner", appointment.getOwner());
                appointmentData.put("kmDriven", appointment.getKmDriven());
            } else if ("buyer".equalsIgnoreCase(userType)) {
                appointmentData.put("carId", appointment.getCarId());
            }

            appointmentList.add(appointmentData);
        }

        response.put("success", true);
        response.put("appointments", appointmentList);
        return response;
    }
}
