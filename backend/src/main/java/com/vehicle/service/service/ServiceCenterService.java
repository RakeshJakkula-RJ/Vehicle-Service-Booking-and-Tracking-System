package com.vehicle.service.service;

import com.vehicle.service.model.ServiceCenter;
import com.vehicle.service.model.Mechanic;
import com.vehicle.service.model.ServiceType;
import com.vehicle.service.repository.ServiceCenterRepository;
import com.vehicle.service.repository.MechanicRepository;
import com.vehicle.service.repository.ServiceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServiceCenterService {
    @Autowired
    private ServiceCenterRepository serviceCenterRepository;
    @Autowired
    private MechanicRepository mechanicRepository;
    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    public ServiceCenter addServiceCenter(ServiceCenter center) {
        return serviceCenterRepository.save(center);
    }

    public List<ServiceCenter> getAllServiceCenters() {
        return serviceCenterRepository.findAll();
    }

    public ServiceCenter getServiceCenterById(Long id) {
        return serviceCenterRepository.findById(id).orElse(null);
    }

    public Mechanic addMechanic(Mechanic mechanic) {
        return mechanicRepository.save(mechanic);
    }
    
    public List<Mechanic> getMechanicsByCenter(Long centerId) {
        return mechanicRepository.findByServiceCenterId(centerId);
    }
    
    public ServiceType addServiceType(ServiceType type) {
        return serviceTypeRepository.save(type);
    }
    
    public List<ServiceType> getAllServiceTypes() {
        return serviceTypeRepository.findAll();
    }

    public void deleteServiceCenter(Long id) {
        serviceCenterRepository.deleteById(id);
    }

    public void deleteMechanic(Long id) {
        mechanicRepository.deleteById(id);
    }

    public void removeDuplicateServiceCenters() {
        List<ServiceCenter> allCenters = serviceCenterRepository.findAll();
        java.util.Map<String, ServiceCenter> uniqueCenters = new java.util.HashMap<>();
        
        for (ServiceCenter center : allCenters) {
            String key = center.getName() + "|" + center.getLocation();
            if (!uniqueCenters.containsKey(key)) {
                uniqueCenters.put(key, center);
            } else {
                // Delete duplicate
                serviceCenterRepository.deleteById(center.getId());
            }
        }
    }
}
