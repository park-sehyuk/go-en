package com.project.goen.notes.dto;

import com.project.goen.notes.constent.NoteType;
import com.project.goen.notes.entity.QaNotes;

public class QaNotesDto {
    private Long id;
    private String question;
    private String answer;
    private NoteType type;

    public QaNotesDto(QaNotes note){
        this.id = note.getId();
        this.question = note.getQuestion();
        this.answer = note.getAnswer();
        this.type = note.getNoteType();
    }

}
