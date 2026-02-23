package com.project.goen.notes.dto;

import com.project.goen.notes.constent.NoteType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QaNotesUpdateDto {
    private String question;
    private String answer;
    private NoteType noteType;
}
