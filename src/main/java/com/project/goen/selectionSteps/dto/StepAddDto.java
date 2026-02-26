package com.project.goen.selectionSteps.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StepAddDto {
    @NotBlank(message = "단계명을 입력해주세요.")
    private String stepName;
    private LocalDateTime stepDate;
    private String location;
    private Boolean isCompleted;
}
