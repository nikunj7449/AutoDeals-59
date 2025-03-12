package com.LoginRegister.example.requests;

public class CarRequest {

    
    private byte[] img; // Storing image as a BLOB (Binary Large Object)
    private String name;
    private String price;
    private String makeYear;
    private String registrationYear;
    private String fuelType;
    private String kmDriven;
    private String transmission;
    private String owner;
    private String insuranceValidity;
    private String insuranceType;
    private String rto;
    private String location;

    public CarRequest() {
    }

    public CarRequest(byte[] img, String name, String price, String makeYear, String registrationYear,
                      String fuelType, String kmDriven, String transmission, String owner,
                      String insuranceValidity, String insuranceType, String rto, String location) {
        
        this.img = img;
        this.name = name;
        this.price = price;
        this.makeYear = makeYear;
        this.registrationYear = registrationYear;
        this.fuelType = fuelType;
        this.kmDriven = kmDriven;
        this.transmission = transmission;
        this.owner = owner;
        this.insuranceValidity = insuranceValidity;
        this.insuranceType = insuranceType;
        this.rto = rto;
        this.location = location;
    }

    

    public byte[] getImg() {
        return img;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getMakeYear() {
        return makeYear;
    }

    public void setMakeYear(String makeYear) {
        this.makeYear = makeYear;
    }

    public String getRegistrationYear() {
        return registrationYear;
    }

    public void setRegistrationYear(String registrationYear) {
        this.registrationYear = registrationYear;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getKmDriven() {
        return kmDriven;
    }

    public void setKmDriven(String kmDriven) {
        this.kmDriven = kmDriven;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getInsuranceValidity() {
        return insuranceValidity;
    }

    public void setInsuranceValidity(String insuranceValidity) {
        this.insuranceValidity = insuranceValidity;
    }

    public String getInsuranceType() {
        return insuranceType;
    }

    public void setInsuranceType(String insuranceType) {
        this.insuranceType = insuranceType;
    }

    public String getRto() {
        return rto;
    }

    public void setRto(String rto) {
        this.rto = rto;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
