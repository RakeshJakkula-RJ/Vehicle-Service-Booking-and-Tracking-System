package com.vehicle.service.controller;

import com.vehicle.service.model.Notification;
import com.vehicle.service.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationRepository repository;

    @GetMapping("/user/{userId}")
    public List<Notification> getNotificationsByUser(@PathVariable Long userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id) {
        Notification notification = repository.findById(id).orElseThrow();
        notification.setRead(true);
        repository.save(notification);
    }
}
