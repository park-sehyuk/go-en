package com.project.goen.application.dto;

import com.project.goen.application.constent.Status;
import com.project.goen.application.entity.Application;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Getter
@NoArgsConstructor
public class ApplicationCardDto {
    private Long id;
    private String companyName;
    private String position;
    private Status status;
    private Long deadline;

    public ApplicationCardDto(Application app) {
        this.id = app.getId();
        this.companyName = app.getCompanyName();
        this.position = app.getPosition();
        this.status = app.getStatus();
        this.deadline = ChronoUnit.DAYS.between(LocalDate.now(), app.getDeadline());
    }
}
