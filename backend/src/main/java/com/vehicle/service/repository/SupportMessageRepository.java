package com.vehicle.service.repository;

import com.vehicle.service.model.SupportMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupportMessageRepository extends JpaRepository<SupportMessage, Long> {
    java.util.List<SupportMessage> findByUserId(Long userId);
}
