package com.project.goen.selectionSteps.entity;

import com.project.goen.application.entity.Application;
import com.project.goen.selectionSteps.dto.StepAddDto;
import com.project.goen.selectionSteps.dto.StepUpdateDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@Table(name = "selection_steps")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SelectionSteps {

    @Id
    @Column(name = "selection_steps_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    private Application application;

    private String stepName;

    private LocalDateTime stepDate;

    private String location;

    private Boolean isCompleted;

    public static SelectionSteps createStep(StepAddDto dto, Application application){
        SelectionSteps steps = new SelectionSteps();
        steps.application = application;
        steps.stepName = dto.getStepName();
        steps.stepDate = dto.getStepDate();
        steps.location = dto.getLocation();
        steps.isCompleted = dto.getIsCompleted();

        return steps;
    }

    public void updateStep(StepUpdateDto dto){
        this.stepName = dto.getStepName();
        this.stepDate = dto.getStepDate();
        this.location = dto.getLocation();
        this.isCompleted = dto.getIsCompleted();
    }

}
