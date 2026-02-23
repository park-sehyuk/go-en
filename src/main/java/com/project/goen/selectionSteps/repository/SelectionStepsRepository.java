package com.project.goen.selectionSteps.repository;

import com.project.goen.selectionSteps.entity.SelectionSteps;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SelectionStepsRepository extends JpaRepository<SelectionSteps, Long> {

    List<SelectionSteps> findAllByApplicationId(Long applicationId);

}
