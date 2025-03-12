package com.LoginRegister.example.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented ID
    private Long id;

    private String brand;
    private String rtoLocation;
    private String year;
    private String model;
    private String variant;
    private String owner;
    private String kmDriven;
    private String userType;
    private String status;
    private Long userId;
    private Long carId;
    private String date;
    private String time;

    public Appointment() {
    }

    public Appointment(String brand, String rtoLocation, String year, String model, String variant, String owner, String kmDriven, String userType, String status, Long userId, Long carId, String date, String time) {
        this.brand = brand;
        this.rtoLocation = rtoLocation;
        this.year = year;
        this.model = model;
        this.variant = variant;
        this.owner = owner;
        this.kmDriven = kmDriven;
        this.userType = userType;
        this.status = status;
        this.userId = userId;
        this.carId = carId;
        this.date = date;
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getRtoLocation() {
        return rtoLocation;
    }

    public void setRtoLocation(String rtoLocation) {
        this.rtoLocation = rtoLocation;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getVariant() {
        return variant;
    }

    public void setVariant(String variant) {
        this.variant = variant;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getKmDriven() {
        return kmDriven;
    }

    public void setKmDriven(String kmDriven) {
        this.kmDriven = kmDriven;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCarId() {
        return carId;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
