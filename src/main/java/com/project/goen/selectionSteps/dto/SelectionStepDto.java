package com.project.goen.selectionSteps.dto;

import com.project.goen.selectionSteps.entity.SelectionSteps;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SelectionStepDto{
    private Long id;
    private String stepName;
    private LocalDateTime stepDate;
    private String location;
    private boolean isCompleted;

    public SelectionStepDto(SelectionSteps step){
        this.id = step.getId();
        this.stepName = step.getStepName();
        this.stepDate = step.getStepDate();
        this.location = step.getLocation();
        this.isCompleted = step.getIsCompleted();
    }
}
