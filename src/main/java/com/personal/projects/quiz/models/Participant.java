package com.personal.projects.quiz.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Data
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String email;
    private Integer quizId;
    private String token;
    private LocalDate invitationDate;
    private LocalDate relanceDate;
    private LocalDate participationDate;
    private Integer timer;
    private Double completionRate;
    private Double successRate;
}
