package com.vehicle.service.repository;

import com.vehicle.service.model.Mechanic;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MechanicRepository extends JpaRepository<Mechanic, Long> {
    List<Mechanic> findByServiceCenterId(Long serviceCenterId);
}
