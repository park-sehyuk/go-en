package com.project.goen.application.service;

import com.project.goen.application.dto.*;

import java.util.List;

public interface ApplicationService {

    Long addCard(ApplicationAddDto addDto, String email);

    List<ApplicationCardDto> getCardList(String email);

    ApplicationDetailDto getApplicationDetail(Long appId, String email);

    void updateCardStatus(Long applicationId, ApplicationStatusUpdateDto statusUpdateDto, String email);

    void updateCard(Long applicationId, ApplicationUpdateDto dto, String email);

    void deleteCard(Long applicationId, String email);

}
