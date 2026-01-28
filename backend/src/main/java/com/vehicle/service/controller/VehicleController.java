package com.vehicle.service.controller;

import com.vehicle.service.model.Vehicle;
import com.vehicle.service.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:5173")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<Vehicle> addVehicle(@RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(vehicleService.addVehicle(vehicle));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Vehicle>> getVehiclesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(vehicleService.getVehiclesByUserId(userId));
    }
}
