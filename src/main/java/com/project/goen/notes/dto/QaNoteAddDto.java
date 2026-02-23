package com.project.goen.notes.dto;

import com.project.goen.application.entity.Application;
import com.project.goen.notes.constent.NoteType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QaNoteAddDto {
    private String question;
    private String answer;
    private NoteType noteType;
}
