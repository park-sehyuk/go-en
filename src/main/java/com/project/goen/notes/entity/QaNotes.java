package com.project.goen.notes.entity;

import com.project.goen.application.entity.Application;
import com.project.goen.notes.constent.NoteType;
import com.project.goen.notes.dto.QaNoteAddDto;
import com.project.goen.notes.dto.QaNotesDto;
import com.project.goen.notes.dto.QaNotesUpdateDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@Table(name = "qa_notes")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QaNotes {

    @Id
    @Column(name = "qa_notes_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    private Application application;

    private String question;

    @Column(columnDefinition = "TEXT")
    private String answer;

    @Enumerated(EnumType.STRING)
    private NoteType noteType;

    public static QaNotes createQaNote(QaNoteAddDto dto, Application application){
        QaNotes note = new QaNotes();
        note.application = application;
        note.question = dto.getQuestion();
        note.answer = dto.getAnswer();
        note.noteType = dto.getNoteType();

        return note;
    }

    public void updateQaNote(QaNotesUpdateDto dto){
        this.question = dto.getQuestion();
        this.answer = dto.getAnswer();
        this.noteType = dto.getNoteType();
    }

}
