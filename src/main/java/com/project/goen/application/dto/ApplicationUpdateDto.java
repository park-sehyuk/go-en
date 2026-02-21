package com.project.goen.application.dto;

import com.project.goen.application.constent.Status;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ApplicationUpdateDto {
    private String companyName;
    private String position;
    private Status status;
    private LocalDate deadline;
}
