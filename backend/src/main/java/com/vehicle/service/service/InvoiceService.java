package com.vehicle.service.service;

import com.vehicle.service.model.Invoice;
import com.vehicle.service.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private com.vehicle.service.repository.BookingRepository bookingRepository;

    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public Invoice getInvoiceByBooking(Long bookingId) {
        System.out.println("Fetching invoice for booking ID: " + bookingId);
        return invoiceRepository.findByBookingId(bookingId).orElseGet(() -> {
            System.out.println("No invoice found, checking fallback for booking ID: " + bookingId);
            com.vehicle.service.model.Booking booking = bookingRepository.findById(bookingId).orElse(null);
            if (booking != null) {
                System.out.println("Booking found. Status: " + booking.getStatus());
                if ("COMPLETED".equalsIgnoreCase(booking.getStatus())) {
                    System.out.println("Booking is COMPLETED, creating invoice...");
                    Invoice invoice = new Invoice();
                    invoice.setBooking(booking);
                    invoice.setServiceType(booking.getServiceType());
                    invoice.setTotalAmount(booking.getServiceType() != null ? booking.getServiceType().getPrice() : java.math.BigDecimal.ZERO);
                    invoice.setPaymentStatus("PENDING");
                    Invoice saved = invoiceRepository.save(invoice);
                    System.out.println("Invoice saved with ID: " + saved.getId());
                    return saved;
                }
            } else {
                System.out.println("Booking not found for ID: " + bookingId);
            }
            return null;
        });
    }
}
