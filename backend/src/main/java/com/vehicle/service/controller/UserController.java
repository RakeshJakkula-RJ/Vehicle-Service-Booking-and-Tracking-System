package com.vehicle.service.controller;

import com.vehicle.service.model.User;
import com.vehicle.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private com.vehicle.service.service.OtpService otpService;

    @PostMapping("/generate-otp")
    public ResponseEntity<String> generateOtp(@RequestParam String email) {
        String otp = otpService.generateOtp(email);
        // In production, don't return OTP in response. This is for demo so user can see it in Network tab or Console if backend logs aren't visible.
        // But better to just log it on server and say "Sent".
        System.out.println("OTP for " + email + " is " + otp);
        return ResponseEntity.ok("OTP sent to email (simulated check server console)");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody com.vehicle.service.model.RegisterRequest request) {
        if (!otpService.validateOtp(request.getEmail(), request.getOtp())) {
            return ResponseEntity.badRequest().body("Invalid or expired OTP");
        }
        
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setPasswordHash(request.getPasswordHash());
        user.setRole(request.getRole());
        user.setServiceCenterId(request.getServiceCenterId());
        
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @GetMapping
    public ResponseEntity<Iterable<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody com.vehicle.service.model.LoginRequest loginRequest) {
        User user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).build();
        }
    }
}
