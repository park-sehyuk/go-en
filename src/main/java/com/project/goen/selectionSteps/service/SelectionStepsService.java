package com.project.goen.selectionSteps.service;

import com.project.goen.selectionSteps.dto.SelectionStepDto;
import com.project.goen.selectionSteps.dto.StepAddDto;
import com.project.goen.selectionSteps.dto.StepIsCompletedUpdateDto;
import com.project.goen.selectionSteps.dto.StepUpdateDto;

import java.util.List;

public interface SelectionStepsService {

    Long addStep(StepAddDto addDto, Long appId);

    void updateIsCompleted(Long stepId, StepIsCompletedUpdateDto dto);

    void updateStep(Long stepId, StepUpdateDto dto);

    void deleteStep(Long stepId);

}
