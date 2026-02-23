package com.project.goen.selectionSteps.service;

import com.project.goen.application.entity.Application;
import com.project.goen.application.repository.ApplicationRepository;
import com.project.goen.selectionSteps.dto.SelectionStepDto;
import com.project.goen.selectionSteps.dto.StepAddDto;
import com.project.goen.selectionSteps.dto.StepUpdateDto;
import com.project.goen.selectionSteps.entity.SelectionSteps;
import com.project.goen.selectionSteps.repository.SelectionStepsRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class SelectionStepsServiceImpl implements SelectionStepsService{

    @Autowired
    private SelectionStepsRepository selectionStepsRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public Long addStep(StepAddDto addDto, Long appId) {
        Application app = applicationRepository.findById(appId)
                .orElseThrow(() -> new EntityNotFoundException("지원 기업 정보를 찾을 수 없습니다."));

        SelectionSteps step = SelectionSteps.createStep(addDto, app);
        SelectionSteps stepSave = selectionStepsRepository.save(step);

        return stepSave.getId();
    }

    @Override
    public List<SelectionStepDto> getStepList(Long appId) {
        Application app = applicationRepository.findById(appId)
                .orElseThrow(() -> new EntityNotFoundException("지원 기업 정보를 찾을 수 없습니다."));

        List<SelectionSteps> stepList = selectionStepsRepository.findAllByApplicationId(app.getId());

        return stepList.stream().map(step -> new SelectionStepDto(step)).collect(Collectors.toList());
    }

    @Override
    public void updateStep(Long stepId, StepUpdateDto dto) {
        SelectionSteps step = selectionStepsRepository.findById(stepId)
                .orElseThrow(() -> new EntityNotFoundException("단계별 일정 정보를 찾을 수 없습니다."));

        step.updateStep(dto);
    }

    @Override
    public void deleteStep(Long stepId) {
        SelectionSteps step = selectionStepsRepository.findById(stepId)
                .orElseThrow(() -> new EntityNotFoundException("단계별 일정 정보를 찾을 수 없습니다."));

        selectionStepsRepository.delete(step);
    }
}
