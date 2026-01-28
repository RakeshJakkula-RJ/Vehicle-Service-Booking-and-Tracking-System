package com.vehicle.service.controller;

import com.vehicle.service.model.Booking;
import com.vehicle.service.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.createBooking(booking));
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateStatus(
            @PathVariable Long id, 
            @RequestParam String status,
            @RequestParam(required = false) String expectedCompletionDate) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, status, expectedCompletionDate));
    }

    @GetMapping("/service-center/{serviceCenterId}")
    public ResponseEntity<List<Booking>> getBookingsByServiceCenter(@PathVariable Long serviceCenterId) {
        return ResponseEntity.ok(bookingService.getBookingsByServiceCenter(serviceCenterId));
    }
}
