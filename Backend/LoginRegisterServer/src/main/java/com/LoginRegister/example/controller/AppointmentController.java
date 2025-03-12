package com.LoginRegister.example.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.LoginRegister.example.requests.AppointmentRequest;
import com.LoginRegister.example.service.AppointmentService;

@RestController
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/addAppointment/{userType}")
    public Map<String, Object> addAppointment(
            @PathVariable String userType,
            @RequestBody AppointmentRequest appointmentRequest) {
        return appointmentService.addAppointment(userType, appointmentRequest);
    }

    @GetMapping("/getAppointment/{userType}")
    public Map<String, Object> getAppointments(@PathVariable String userType) {
        return appointmentService.getAppointmentsByUserType(userType);
    }
}
