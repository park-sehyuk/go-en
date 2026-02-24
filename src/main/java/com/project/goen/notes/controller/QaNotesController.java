package com.project.goen.notes.controller;

import com.project.goen.notes.dto.QaNoteAddDto;
import com.project.goen.notes.dto.QaNotesDto;
import com.project.goen.notes.dto.QaNotesUpdateDto;
import com.project.goen.notes.service.QaNotesService;
import jakarta.validation.Valid;
import org.apache.ibatis.javassist.compiler.ast.Variable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class QaNotesController {

    @Autowired
    private QaNotesService qaNotesService;

    @PostMapping("/{appId}")
    public ResponseEntity addNote(@RequestBody @Valid QaNoteAddDto dto,
                                  @PathVariable("appId") Long appId){
        Long noteId = qaNotesService.addNote(dto, appId);

        return ResponseEntity.ok(noteId);
    }

    @PatchMapping("/update/{noteId}")
    public ResponseEntity updateNote(@PathVariable("noteId") Long noteId,
                                     @Valid @RequestParam("qaNotesUpdateDto")QaNotesUpdateDto dto){
        qaNotesService.updateNote(noteId, dto);
        return ResponseEntity.ok(noteId);
    }

    @DeleteMapping("/delete/{noteId}")
    public ResponseEntity deleteNote(@PathVariable("noteId") Long noteId){
        qaNotesService.deleteNote(noteId);
        return ResponseEntity.ok(noteId);
    }

}
