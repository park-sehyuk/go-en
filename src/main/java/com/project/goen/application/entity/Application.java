package com.project.goen.application.entity;

import com.project.goen.application.constent.Status;
import com.project.goen.application.dto.ApplicationAddDto;
import com.project.goen.application.dto.ApplicationCardDto;
import com.project.goen.application.dto.ApplicationStatusUpdateDto;
import com.project.goen.application.dto.ApplicationUpdateDto;
import com.project.goen.user.dto.UserLoginDto;
import com.project.goen.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@Table(name = "application")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Application {

    @Id
    @Column(name = "application_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String companyName;

    private String position;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Long priority;

    private LocalDate deadline;

    private String url;

    private LocalDateTime createdAt;

    public static Application createApp(ApplicationAddDto dto, User user){
        Application app = new Application();
        app.user = user;
        app.companyName = dto.getCompanyName();
        app.position = dto.getPosition();
        app.status = dto.getStatus();
        app.priority = dto.getPriority();
        app.deadline = dto.getDeadline();
        app.url = dto.getUrl();
        app.createdAt = LocalDateTime.now();

        return app;
    }

    public void updateCardStatus(ApplicationStatusUpdateDto dto){
        this.status = dto.getStatus();
    }

    public void updateCard(ApplicationUpdateDto dto){
        this.companyName = dto.getCompanyName();
        this.position = dto.getPosition();
        this.status = dto.getStatus();
        this.priority = dto.getPriority();
        this.deadline = dto.getDeadline();
        this.url = dto.getUrl();
    }

}
