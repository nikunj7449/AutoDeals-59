package com.LoginRegister.example.dto;


public class UserDTO {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String number;

    // Default Constructor
    public UserDTO() {
    }

    // Parameterized Constructor
    public UserDTO(Long id, String email, String firstName, String lastName, String number) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.number = number;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
