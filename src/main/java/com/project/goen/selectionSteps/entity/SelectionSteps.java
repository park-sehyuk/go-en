package com.project.goen.selectionSteps.entity;

import com.project.goen.application.entity.Application;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@Table(name = "selection_steps")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SelectionSteps {

    @Id
    @Column(name = "selection_steps_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    private Application application;

    private String stepName;

    private LocalDateTime stopDate;

    private String location;

    private Boolean isCompleted;

}
