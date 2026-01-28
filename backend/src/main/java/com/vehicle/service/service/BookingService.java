package com.vehicle.service.service;

import com.vehicle.service.model.Booking;
import com.vehicle.service.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private com.vehicle.service.repository.UserRepository userRepository;
    @Autowired
    private com.vehicle.service.repository.VehicleRepository vehicleRepository;
    @Autowired
    private com.vehicle.service.repository.ServiceCenterRepository serviceCenterRepository;
    @Autowired
    private com.vehicle.service.repository.ServiceTypeRepository serviceTypeRepository;
    @Autowired
    private com.vehicle.service.repository.InvoiceRepository invoiceRepository;
    @Autowired
    private com.vehicle.service.repository.NotificationRepository notificationRepository;

    public Booking createBooking(Booking booking) {
        if (booking.getUser() != null && booking.getUser().getId() != null) {
            booking.setUser(userRepository.findById(booking.getUser().getId()).orElse(null));
        }
        if (booking.getVehicle() != null && booking.getVehicle().getId() != null) {
            booking.setVehicle(vehicleRepository.findById(booking.getVehicle().getId()).orElse(null));
        }
        if (booking.getServiceCenter() != null && booking.getServiceCenter().getId() != null) {
            booking.setServiceCenter(serviceCenterRepository.findById(booking.getServiceCenter().getId()).orElse(null));
        }
        if (booking.getServiceType() != null && booking.getServiceType().getId() != null) {
            booking.setServiceType(serviceTypeRepository.findById(booking.getServiceType().getId()).orElse(null));
        }
        booking.setStatus("PENDING");
        Booking savedBooking = bookingRepository.save(booking);

        // Notify user about booking creation
        createNotification(savedBooking.getUser(), "Booking Created", 
            "Your booking #" + savedBooking.getId() + " is currently PENDING.", "info");

        return savedBooking;
    }

    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    public Booking updateBookingStatus(Long id, String status, String expectedCompletionDateStr) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus(status);
        
        // Parse and set expected completion date if provided
        if (expectedCompletionDateStr != null && !expectedCompletionDateStr.isEmpty()) {
            try {
                booking.setExpectedCompletionDate(java.time.LocalDate.parse(expectedCompletionDateStr));
            } catch (Exception e) {
                // Log error but continue
                System.err.println("Error parsing expected completion date: " + e.getMessage());
            }
        }
        
        booking = bookingRepository.save(booking);

        // Notify user about status change
        String title = "Booking " + (status.equalsIgnoreCase("CONFIRMED") ? "Confirmed" : 
                                   status.equalsIgnoreCase("COMPLETED") ? "Completed" : 
                                   status.equalsIgnoreCase("CANCELLED") ? "Cancelled" : "Updated");
        String message = "Your booking #" + id + " has been updated to " + status + ".";
        if (booking.getExpectedCompletionDate() != null) {
            message += " Expected completion: " + booking.getExpectedCompletionDate();
        }
        String type = status.equalsIgnoreCase("COMPLETED") ? "success" : 
                     status.equalsIgnoreCase("CANCELLED") ? "warning" : "info";
        
        createNotification(booking.getUser(), title, message, type);

        if ("COMPLETED".equalsIgnoreCase(status)) {
            // Check if invoice already exists
            if (invoiceRepository.findByBookingId(id).isEmpty()) {
                com.vehicle.service.model.Invoice invoice = new com.vehicle.service.model.Invoice();
                invoice.setBooking(booking);
                invoice.setServiceType(booking.getServiceType());
                invoice.setTotalAmount(booking.getServiceType() != null ? booking.getServiceType().getPrice() : java.math.BigDecimal.ZERO);
                invoice.setPaymentStatus("PENDING");
                invoiceRepository.save(invoice);

                // Additional notification for invoice
                createNotification(booking.getUser(), "Invoice Generated", 
                    "Invoice for booking #" + id + " is now available.", "success");
            }
        }
        return booking;
    }

    public List<Booking> getBookingsByServiceCenter(Long serviceCenterId) {
        return bookingRepository.findByServiceCenterId(serviceCenterId);
    }

    private void createNotification(com.vehicle.service.model.User user, String title, String message, String type) {
        if (user != null) {
            com.vehicle.service.model.Notification notification = new com.vehicle.service.model.Notification();
            notification.setUser(user);
            notification.setTitle(title);
            notification.setMessage(message);
            notification.setType(type);
            notification.setCreatedAt(java.time.LocalDateTime.now());
            notificationRepository.save(notification);
        }
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }
}
