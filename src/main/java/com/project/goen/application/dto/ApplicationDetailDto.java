package com.project.goen.application.dto;

import com.project.goen.application.constent.Status;
import com.project.goen.notes.entity.QaNotes;
import com.project.goen.selectionSteps.entity.SelectionSteps;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ApplicationDetailDto {
    private Long id;
    private String companyName;
    private String position;
    private Status status;
    private List<SelectionSteps> selectionSteps;
    private List<QaNotes> qaNotes;
}
