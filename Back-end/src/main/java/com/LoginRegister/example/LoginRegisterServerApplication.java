package com.LoginRegister.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.LoginRegister.example.entity")
public class LoginRegisterServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoginRegisterServerApplication.class, args);
	}

}
