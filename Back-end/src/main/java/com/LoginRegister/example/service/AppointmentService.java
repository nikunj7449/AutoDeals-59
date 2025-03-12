package com.LoginRegister.example.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LoginRegister.example.entity.Appointment;
import com.LoginRegister.example.entity.Cars;
import com.LoginRegister.example.entity.Users;
import com.LoginRegister.example.repository.AppointmentRepo;
import com.LoginRegister.example.repository.CarsRepo;
import com.LoginRegister.example.repository.UsersRepo;
import com.LoginRegister.example.requests.AppointmentRequest;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepo appointmentRepo;

    @Autowired
    private UsersRepo usersrepo;
    
    @Autowired
    private CarsRepo carsRepo;

    
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
        appointment.setTime(appointmentRequest.getTime());
        appointment.setDate(appointmentRequest.getDate());

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
            
            // Set appointment ID based on user type
            String appointmentIdPrefix = "seller".equalsIgnoreCase(userType) ? "SAPT" : "BAPT";
            appointmentData.put("id", appointmentIdPrefix + appointment.getId()); // Assuming `getId()` exists in Appointment entity
            
            // Fetch user details from UsersRepo
            Optional<Users> userOptional = usersrepo.findById(appointment.getUserId());
            if (userOptional.isPresent()) {
                Users user = userOptional.get();
                appointmentData.put("name", user.getFirstName() + " " + user.getLastName());
                appointmentData.put("email", user.getEmail());
                appointmentData.put("phone", user.getNumber());
            } else {
                appointmentData.put("name", "Unknown User");
                appointmentData.put("email", "N/A");
                appointmentData.put("phone", "N/A");
            }

            appointmentData.put("date", appointment.getDate()); // Static for now; replace with dynamic data if needed
            appointmentData.put("time", appointment.getTime()); // Static for now

            if ("seller".equalsIgnoreCase(userType)) {
                // Construct car details in "Brand Model (Year)" format
                String carDetails = appointment.getBrand() + " " + appointment.getModel() + " (" + appointment.getYear() + ")";
                appointmentData.put("carDetails", carDetails);
               // appointmentData.put("price", "$18,500"); // Static for now; replace with actual price field if available
                appointmentData.put("status", appointment.getStatus()); // Static for now

                // Additional seller-specific details
                appointmentData.put("rtoLocation", appointment.getRtoLocation());
                appointmentData.put("variant", appointment.getVariant());
                appointmentData.put("owner", appointment.getOwner());
                appointmentData.put("kmDriven", appointment.getKmDriven());
            } else if ("buyer".equalsIgnoreCase(userType)) {
            	Optional<Cars> optionalCar = carsRepo.findById( Math.toIntExact(appointment.getCarId()));
            	if (optionalCar.isPresent()) {
            		Cars car = optionalCar.get();
            		 String carDetails = car.getName() + " (" + car.getMakeYear() + ")";
                     appointmentData.put("carDetails", carDetails);
                } else {
                    appointmentData.put("carDetails", "Unknown Car");
                    
                }
                appointmentData.put("carId", appointment.getCarId());
                appointmentData.put("status", appointment.getStatus()); // Static for now

            }

            appointmentList.add(appointmentData);
        }

        response.put("success", true);
        response.put("appointments", appointmentList);
        return response;
    }
    
    public Map<String, Object> updateStatusById(Long appointmentId, String status) {
        Map<String, Object> response = new HashMap<>();

        Optional<Appointment> optionalAppointment = appointmentRepo.findById(appointmentId);
        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            appointment.setStatus(status);
            appointmentRepo.save(appointment);

            response.put("success", true);
            response.put("message", "Appointment status updated successfully.");
        } else {
            response.put("success", false);
            response.put("message", "Appointment not found.");
        }
        return response;
    }


}
