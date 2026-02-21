package com.project.goen.application.repository;

import com.project.goen.application.constent.Status;
import com.project.goen.application.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findAllByUserId(Long userId);

    List<Application> findAllByUserIdAndStatus(Long userId, Status status);
}
