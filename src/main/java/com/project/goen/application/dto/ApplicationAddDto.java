package com.project.goen.application.dto;

import com.project.goen.application.constent.Status;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ApplicationAddDto {
    @NotBlank(message = "회사명은 필수입니다.")
    private String companyName;
    @NotBlank(message = "직무 입력은 필수입니다.")
    private String position;
    private Status status;
    private Long priority;
    private LocalDate deadline;
    private String url;
}
