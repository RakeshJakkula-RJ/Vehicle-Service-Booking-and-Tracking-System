package com.vehicle.service.controller;

import com.vehicle.service.model.ServiceCenter;
import com.vehicle.service.model.Mechanic;
import com.vehicle.service.model.ServiceType;
import com.vehicle.service.service.ServiceCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceCenterController {

    @Autowired
    private ServiceCenterService serviceCenterService;

    @PostMapping("/service-centers")
    public ResponseEntity<ServiceCenter> addServiceCenter(@RequestBody ServiceCenter center) {
        return ResponseEntity.ok(serviceCenterService.addServiceCenter(center));
    }

    @GetMapping("/service-centers")
    public ResponseEntity<List<ServiceCenter>> getAllServiceCenters() {
        return ResponseEntity.ok(serviceCenterService.getAllServiceCenters());
    }

    @GetMapping("/service-centers/{id}")
    public ResponseEntity<ServiceCenter> getServiceCenterById(@PathVariable Long id) {
        return ResponseEntity.ok(serviceCenterService.getServiceCenterById(id));
    }

    @PostMapping("/mechanics")
    public ResponseEntity<Mechanic> addMechanic(@RequestBody Mechanic mechanic) {
        return ResponseEntity.ok(serviceCenterService.addMechanic(mechanic));
    }
    
    @GetMapping("/mechanics/center/{centerId}")
    public ResponseEntity<List<Mechanic>> getMechanics(@PathVariable Long centerId) {
        return ResponseEntity.ok(serviceCenterService.getMechanicsByCenter(centerId));
    }

    @PostMapping("/service-types")
    public ResponseEntity<ServiceType> addServiceType(@RequestBody ServiceType type) {
        return ResponseEntity.ok(serviceCenterService.addServiceType(type));
    }

    @GetMapping("/service-types")
    public ResponseEntity<List<ServiceType>> getAllServiceTypes() {
        return ResponseEntity.ok(serviceCenterService.getAllServiceTypes());
    }

    @DeleteMapping("/service-centers/{id}")
    public ResponseEntity<Void> deleteServiceCenter(@PathVariable Long id) {
        serviceCenterService.deleteServiceCenter(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/mechanics/{id}")
    public ResponseEntity<Void> deleteMechanic(@PathVariable Long id) {
        serviceCenterService.deleteMechanic(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/service-centers/remove-duplicates")
    public ResponseEntity<String> removeDuplicates() {
        serviceCenterService.removeDuplicateServiceCenters();
        return ResponseEntity.ok("Duplicate service centers removed successfully");
    }
}
