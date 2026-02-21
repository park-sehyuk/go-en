package com.project.goen.notes.entity;

import com.project.goen.application.entity.Application;
import com.project.goen.notes.constent.NoteType;
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

}
