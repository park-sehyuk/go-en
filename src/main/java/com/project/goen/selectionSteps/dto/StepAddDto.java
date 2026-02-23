package com.project.goen.selectionSteps.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StepAddDto {
    private String stepName;
    private LocalDateTime stepDate;
    private String location;
    private Boolean isCompleted;
}
