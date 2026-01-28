package com.vehicle.service.repository;

import com.vehicle.service.model.ServiceCenter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceCenterRepository extends JpaRepository<ServiceCenter, Long> {
}
