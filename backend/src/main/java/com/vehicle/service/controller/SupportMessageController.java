package com.vehicle.service.controller;

import com.vehicle.service.model.SupportMessage;
import com.vehicle.service.repository.SupportMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "*")
public class SupportMessageController {

    @Autowired
    private SupportMessageRepository repository;

    @Autowired
    private com.vehicle.service.repository.NotificationRepository notificationRepository;

    @Autowired
    private com.vehicle.service.repository.UserRepository userRepository;

    @PostMapping
    public SupportMessage sendMessage(@RequestBody SupportMessage message) {
        message.setCreatedAt(LocalDateTime.now());
        return repository.save(message);
    }

    @GetMapping
    public List<SupportMessage> getAllMessages() {
        return repository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<SupportMessage> getMessagesByUser(@PathVariable Long userId) {
        return repository.findByUserId(userId);
    }

    @PutMapping("/{id}/reply")
    public SupportMessage replyToMessage(@PathVariable Long id, @RequestBody java.util.Map<String, String> payload) {
        SupportMessage message = repository.findById(id).orElseThrow(() -> new RuntimeException("Message not found"));
        message.setAdminReply(payload.get("reply"));
        SupportMessage savedMessage = repository.save(message);

        // Notify user about admin reply
        if (savedMessage.getUserId() != null) {
            userRepository.findById(savedMessage.getUserId()).ifPresent(user -> {
                com.vehicle.service.model.Notification notification = new com.vehicle.service.model.Notification();
                notification.setUser(user);
                notification.setTitle("Support Response");
                notification.setMessage("Admin has replied to your query: " + savedMessage.getSubject());
                notification.setType("info");
                notification.setCreatedAt(LocalDateTime.now());
                notificationRepository.save(notification);
            });
        }

        return savedMessage;
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id) {
        SupportMessage message = repository.findById(id).orElseThrow();
        message.setRead(true);
        repository.save(message);
    }
}
