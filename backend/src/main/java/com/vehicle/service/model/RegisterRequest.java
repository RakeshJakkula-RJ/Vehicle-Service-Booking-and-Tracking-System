package com.vehicle.service.model;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String phone;
    private String address;
    private String passwordHash;
    private String otp;
    private String role;
    private Long serviceCenterId;
}
