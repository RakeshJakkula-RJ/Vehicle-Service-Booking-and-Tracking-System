package com.vehicle.service.controller;

import com.vehicle.service.model.Invoice;
import com.vehicle.service.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        return ResponseEntity.ok(invoiceService.createInvoice(invoice));
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<Invoice> getInvoiceByBooking(@PathVariable Long bookingId) {
        Invoice invoice = invoiceService.getInvoiceByBooking(bookingId);
        if (invoice != null) {
            return ResponseEntity.ok(invoice);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
