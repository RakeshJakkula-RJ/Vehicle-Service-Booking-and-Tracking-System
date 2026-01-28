package com.vehicle.service.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String make;
    private String model;
    
    @Column(name = "manufacturing_year")
    private Integer year;
    
    private String registrationNumber;
}
