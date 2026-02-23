package com.project.goen.notes.service;

import com.project.goen.application.entity.Application;
import com.project.goen.application.repository.ApplicationRepository;
import com.project.goen.notes.dto.QaNoteAddDto;
import com.project.goen.notes.dto.QaNotesDto;
import com.project.goen.notes.dto.QaNotesUpdateDto;
import com.project.goen.notes.entity.QaNotes;
import com.project.goen.notes.repository.QaNotesRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class QaNotesServiceImpl implements QaNotesService{

    @Autowired
    private QaNotesRepository qaNotesRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public Long addNote(QaNoteAddDto dto, Long appId) {
        Application app = applicationRepository.findById(appId)
                .orElseThrow(() -> new EntityNotFoundException("해당 기업 정보를 찾을 수 없습니다."));

        QaNotes note = QaNotes.createQaNote(dto, app);
        QaNotes neteSave = qaNotesRepository.save(note);

        return neteSave.getId();
    }

    @Override
    @Transactional(readOnly = true)
    public List<QaNotesDto> getNoteList(Long appId) {
        Application app = applicationRepository.findById(appId)
                .orElseThrow(() -> new EntityNotFoundException("해당 기업의 정보를 찾을 수 없습니다."));

        List<QaNotes> noteList = qaNotesRepository.findAllByApplicationId(appId);

        return noteList.stream().map(note -> new QaNotesDto(note)).collect(Collectors.toList());
    }

    @Override
    public void updateNote(Long qaNoteId, QaNotesUpdateDto dto) {
        QaNotes note = qaNotesRepository.findById(qaNoteId)
                .orElseThrow(() -> new EntityNotFoundException("지리응답 내용을 찾을 수 없습니다"));

        note.updateQaNote(dto);
    }

    @Override
    public void deleteNote(Long qaNoteId) {
        QaNotes note = qaNotesRepository.findById(qaNoteId)
                .orElseThrow(() -> new EntityNotFoundException("지리응답 내용을 찾을 수 없습니다."));

        qaNotesRepository.delete(note);
    }
}
