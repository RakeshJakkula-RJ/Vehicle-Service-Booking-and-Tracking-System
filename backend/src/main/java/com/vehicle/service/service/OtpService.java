package com.vehicle.service.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    @Autowired
    private JavaMailSender mailSender;

    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();

    public String generateOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStorage.put(email, otp);
        
        sendEmail(email, otp);
        
        return otp;
    }

    private void sendEmail(String toEmail, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            // Try to set From address, though SMTP often overrides it.
            // Using a standard display name format might help.
            message.setFrom("Vehicle Service <noreply@vehicleservice.com>"); 
            message.setTo(toEmail);
            message.setSubject("Vehicle Service - Your OTP Code");
            message.setText("Welcome to Vehicle Service!\n\nYour OTP for registration is: " + otp + "\n\nThis code is valid for a short time only.\n\nIf you did not request this, please ignore this email.");
            
            mailSender.send(message);
            System.out.println("Email successfully sent to " + toEmail);
        } catch (Exception e) {
            System.err.println("FATAL ERROR: Failed to send email to " + toEmail + ". Check application.properties credentials and network connection.");
            e.printStackTrace();
        }
    }

    public boolean validateOtp(String email, String otp) {
        if (email == null || otp == null) return false;
        String storedOtp = otpStorage.get(email);
        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(email); // One-time use
            return true;
        }
        return false;
    }
}
