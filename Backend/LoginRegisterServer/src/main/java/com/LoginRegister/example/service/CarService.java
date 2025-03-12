// CarService.java
package com.LoginRegister.example.service;

import com.LoginRegister.example.entity.Cars;
import com.LoginRegister.example.repository.CarsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    @Autowired
    private CarsRepo carsRepo;

    // Method to add a car to the database
    public Cars addCar(Cars car) {
        return carsRepo.save(car);
    }

    // Method to retrieve all cars
    public List<Cars> getAllCars() {
        return carsRepo.findAll();
    }

    // ✅ Method to update car details
    public Cars updateCar(int id, Cars updatedCar) {
        Optional<Cars> optionalCar = carsRepo.findById(id);

        if (optionalCar.isPresent()) {
            Cars existingCar = optionalCar.get();

            existingCar.setImg(existingCar.getImg());
            existingCar.setName(updatedCar.getName());
            existingCar.setPrice(updatedCar.getPrice());
            existingCar.setMakeYear(updatedCar.getMakeYear());
            existingCar.setRegistrationYear(updatedCar.getRegistrationYear());
            existingCar.setFuelType(updatedCar.getFuelType());
            existingCar.setKmDriven(updatedCar.getKmDriven());
            existingCar.setTransmission(updatedCar.getTransmission());
            existingCar.setOwner(updatedCar.getOwner());
            existingCar.setInsuranceValidity(updatedCar.getInsuranceValidity());
            existingCar.setInsuranceType(updatedCar.getInsuranceType());
            existingCar.setRto(updatedCar.getRto());
            existingCar.setLocation(updatedCar.getLocation());

            return carsRepo.save(existingCar);
        } else {
            throw new RuntimeException("Car with ID " + id + " not found.");
        }
    }
    
 // Delete car by ID
    public String deleteCar(int id) {
        if (carsRepo.existsById(id)) {
            carsRepo.deleteById(id);
            return "Car with ID " + id + " has been deleted.";
        } else {
            return "Car with ID " + id + " not found.";
        }
    }
}
