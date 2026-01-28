package com.vehicle.service.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Mechanic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "service_center_id")
    private ServiceCenter serviceCenter;

    private String name;
    private String expertise;
}
