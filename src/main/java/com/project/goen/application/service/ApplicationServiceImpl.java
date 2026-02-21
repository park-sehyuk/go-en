package com.project.goen.application.service;

import com.project.goen.application.dto.ApplicationAddDto;
import com.project.goen.application.dto.ApplicationCardDto;
import com.project.goen.application.dto.ApplicationStatusUpdateDto;
import com.project.goen.application.dto.ApplicationUpdateDto;
import com.project.goen.application.entity.Application;
import com.project.goen.application.repository.ApplicationRepository;
import com.project.goen.user.entity.User;
import com.project.goen.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ApplicationServiceImpl implements ApplicationService{

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public ApplicationRepository applicationRepository;

    @Override
    public Long addCard(ApplicationAddDto addDto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

        Application app = Application.createApp(addDto, user);

        Application appSave = applicationRepository.save(app);

        return appSave.getId();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationCardDto> getCardList(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

        List<Application> appList = applicationRepository.findAllByUserId(user.getId());

        return appList.stream().map(app -> new ApplicationCardDto(app)).collect(Collectors.toList());
    }

    @Override
    public void updateCardStatus(Long applicationId, ApplicationStatusUpdateDto statusUpdateDto, String email) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new EntityNotFoundException("수정할려는 카드 정보를 찾을 수 없습니다."));

        if(!app.getUser().getEmail().equals(email))
            throw new AccessDeniedException("카드를 수정할 권한이 없습니다.");

        app.updateCardStatus(statusUpdateDto);

    }

    @Override
    public void updateCard(Long applicationId, ApplicationUpdateDto dto, String email) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new EntityNotFoundException("수정할려는 카드 정보를 찾을 수 없습니다."));

        if(!app.getUser().getEmail().equals(email))
            throw new AccessDeniedException("카드를 수정할 권한이 없습니다.");

        app.updateCard(dto);

    }

    @Override
    public void deleteCard(Long applicationId, String email) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new EntityNotFoundException("삭제할려는 카드 정보를 찾을 수 없습니다."));

        if(!app.getUser().getEmail().equals(email))
            throw new AccessDeniedException("삭제 권한이 없습니다.");

        applicationRepository.delete(app);
    }
}
