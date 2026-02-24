package com.project.goen.notes.service;

import com.project.goen.notes.dto.QaNoteAddDto;
import com.project.goen.notes.dto.QaNotesDto;
import com.project.goen.notes.dto.QaNotesUpdateDto;

import java.util.List;

public interface QaNotesService {

    Long addNote(QaNoteAddDto dto, Long appId);

    void updateNote(Long qaNoteId, QaNotesUpdateDto dto);

    void deleteNote(Long qaNoteId);
}
