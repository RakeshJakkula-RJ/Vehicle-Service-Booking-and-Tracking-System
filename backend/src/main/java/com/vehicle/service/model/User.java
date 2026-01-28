package com.vehicle.service.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Column(unique = true)
    private String email;
    
    private String phone;
    private String address;
    private String passwordHash;
    
    private String role; // ADMIN, CUSTOMER, PROVIDER
    private Long serviceCenterId; // For PROVIDER role
}
