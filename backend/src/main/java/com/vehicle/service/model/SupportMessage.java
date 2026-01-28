package com.vehicle.service.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class SupportMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;
    
    @Column(length = 2000)
    private String message;
    
    private String userName;
    private String userEmail;
    private Long userId;
    
    private String adminReply;
    private LocalDateTime createdAt;
    
    private boolean isRead = false;
}
