package com.project.goen.application.entity;

import com.project.goen.application.constent.Status;
import com.project.goen.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

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

    @Enumerated
    private Status status;

    private Long priority;

    private Date deadline;

    private String url;

    private LocalDateTime createdAt;

}
