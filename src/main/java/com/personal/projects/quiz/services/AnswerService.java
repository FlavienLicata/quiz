package com.personal.projects.quiz.services;

import com.personal.projects.quiz.models.Answer;

import java.util.List;
import java.util.Optional;

public interface AnswerService {

    Optional<Answer> findById(Integer id);
    List<Answer> findByQuizId(Integer id);
}
