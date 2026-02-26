package com.project.goen.application.dto;

import com.project.goen.application.constent.Status;
import com.project.goen.application.entity.Application;
import com.project.goen.notes.dto.QaNotesDto;
import com.project.goen.selectionSteps.dto.SelectionStepDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class ApplicationDetailDto {
    private Long id;
    private String companyName;
    private String position;
    private Status status;
    private Long priority;
    private LocalDate deadline;
    private String url;
    private List<SelectionStepDto> selectionSteps;
    private List<QaNotesDto> qaNotes;

    public ApplicationDetailDto(Application app){
        this.id = app.getId();
        this.companyName = app.getCompanyName();
        this.position = app.getPosition();
        this.status = app.getStatus();
        this.priority = app.getPriority();
        this.deadline = app.getDeadline();
        this.url = app.getUrl();

        if(app.getSelectionSteps() != null){
            this.selectionSteps = app.getSelectionSteps().stream()
                    .map(step -> new SelectionStepDto(step))
                    .collect(Collectors.toList());
        }

        if (app.getQaNotes() != null){
            this.qaNotes = app.getQaNotes().stream()
                    .map(step -> new QaNotesDto(step))
                    .collect(Collectors.toList());
        }
    }
}
