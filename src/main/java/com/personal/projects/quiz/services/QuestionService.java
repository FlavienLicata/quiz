package com.personal.projects.quiz.services;

import com.personal.projects.quiz.models.Question;

import java.util.Optional;

public interface QuestionService {

    Optional<Question> findById(Integer id);
    Integer countAllByQuizId(Integer quizId);
}
