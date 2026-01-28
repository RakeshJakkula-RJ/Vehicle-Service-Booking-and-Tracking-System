package com.vehicle.service.model;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
