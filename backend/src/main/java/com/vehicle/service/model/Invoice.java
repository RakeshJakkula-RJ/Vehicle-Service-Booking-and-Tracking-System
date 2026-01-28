package com.vehicle.service.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Data
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "service_type_id")
    private ServiceType serviceType;

    private BigDecimal totalAmount;
    private String paymentStatus; // PENDING, PAID
}
