package com.project.goen.application.controller;

import com.project.goen.application.dto.ApplicationAddDto;
import com.project.goen.application.dto.ApplicationCardDto;
import com.project.goen.application.dto.ApplicationStatusUpdateDto;
import com.project.goen.application.dto.ApplicationUpdateDto;
import com.project.goen.application.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/application")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public ResponseEntity addAppCard(@RequestBody @Valid ApplicationAddDto dto,
                                     Principal principal){
        Long appId = applicationService.addCard(dto, principal.getName());

        return ResponseEntity.ok(appId);
    }

    @GetMapping
    public ResponseEntity getAppCardList(Principal principal){
        List<ApplicationCardDto> appCardList = applicationService.getCardList(principal.getName());

        return ResponseEntity.ok(appCardList);
    }

    @PatchMapping("/cardStatus/{applicationId}")
    public ResponseEntity updateAppStatus(@PathVariable("applicationId") Long applicationId,
                                          @RequestParam("status") ApplicationStatusUpdateDto status,
                                          Principal principal){
        applicationService.updateCardStatus(applicationId, status, principal.getName());

        return ResponseEntity.ok(applicationId);
    }

    @PatchMapping("/{applicationId}")
    public ResponseEntity updateAppCard(@PathVariable("applicationId") Long applicationId,
                                        @Valid @RequestParam("applicationUpdateDto")ApplicationUpdateDto applicationUpdateDto,
                                        Principal principal){
        applicationService.updateCard(applicationId, applicationUpdateDto, principal.getName());

        return ResponseEntity.ok(applicationId);
    }

    @DeleteMapping("/{applicationId}")
    public ResponseEntity deleteAppCard(@PathVariable("applicatdionId") Long applicationId,
                                        Principal principal){
        applicationService.deleteCard(applicationId, principal.getName());

        return ResponseEntity.ok(applicationId);
    }
}
