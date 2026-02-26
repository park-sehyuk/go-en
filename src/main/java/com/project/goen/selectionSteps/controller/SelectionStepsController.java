package com.project.goen.selectionSteps.controller;

import com.project.goen.selectionSteps.dto.SelectionStepDto;
import com.project.goen.selectionSteps.dto.StepAddDto;
import com.project.goen.selectionSteps.dto.StepIsCompletedUpdateDto;
import com.project.goen.selectionSteps.dto.StepUpdateDto;
import com.project.goen.selectionSteps.service.SelectionStepsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/selection")
public class SelectionStepsController {

    @Autowired
    private SelectionStepsService selectionStepsService;

    @PostMapping("/{applicationId}")
    public ResponseEntity addStep(@RequestBody @Valid StepAddDto dto,
                                  @PathVariable("applicationId") Long appId){
        Long stepId = selectionStepsService.addStep(dto, appId);

        return ResponseEntity.ok(stepId);
    }

    @PatchMapping("/isCompleted/{stepId}")
    public ResponseEntity updateIsCompleted(@PathVariable("stepId") Long stepId,
                                            @RequestBody StepIsCompletedUpdateDto dto){
        selectionStepsService.updateIsCompleted(stepId, dto);

        return ResponseEntity.ok(stepId);
    }

    @PatchMapping("/update/{stepId}")
    public ResponseEntity updateStep(@PathVariable("stepId") Long stepId,
                                     @Valid @RequestBody StepUpdateDto dto){
        selectionStepsService.updateStep(stepId, dto);

        return ResponseEntity.ok(stepId);
    }

    @DeleteMapping("/delete/{stepId}")
    public ResponseEntity deleteStep(@PathVariable("stepId") Long stepId){
        selectionStepsService.deleteStep(stepId);

        return ResponseEntity.ok(stepId);
    }


}
