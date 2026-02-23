package com.project.goen.notes.repository;

import com.project.goen.notes.constent.NoteType;
import com.project.goen.notes.entity.QaNotes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QaNotesRepository extends JpaRepository<QaNotes, Long> {

    List<QaNotes> findAllByApplicationId(Long appId);

    List<QaNotes> findAllByApplicationIdAndNoteType(Long appId, NoteType noteType);

}
