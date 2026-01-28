package com.vehicle.service.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "service_center_id")
    private ServiceCenter serviceCenter;

    @ManyToOne
    @JoinColumn(name = "service_type_id")
    private ServiceType serviceType;

    private LocalDate date;
    private String timeSlot;
    
    // PENDING, CONFIRMED, COMPLETED, CANCELLED
    private String status;
    private LocalDate expectedCompletionDate;
}
