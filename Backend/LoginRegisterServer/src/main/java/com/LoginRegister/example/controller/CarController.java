// CarController.java
package com.LoginRegister.example.controller;

import com.LoginRegister.example.entity.Cars;
import com.LoginRegister.example.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/car") // Base path for endpoints
public class CarController {

    @Autowired
    private CarService carService;

    // API to add a new car
    @PostMapping("/addCar")
    public Cars addCar(@RequestBody Cars car) {
        return carService.addCar(car);
    }

    // API to fetch all cars
    @GetMapping("/allCars")
    public List<Cars> getAllCars() {
        return carService.getAllCars();
    }

    // ✅ API to update car details
    @PutMapping("/updateCar/{id}")
    public Cars updateCar(@PathVariable int id, @RequestBody Cars updatedCar) {
        return carService.updateCar(id, updatedCar);
    }
    
 // Delete car by ID
    @DeleteMapping("/deleteCar/{id}")
    public String deleteCar(@PathVariable int id) {
        return carService.deleteCar(id);
    }

}
