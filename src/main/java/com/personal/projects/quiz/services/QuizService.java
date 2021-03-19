package com.personal.projects.quiz.services;

import com.personal.projects.quiz.models.Quiz;

import java.util.List;
import java.util.Optional;

public interface QuizService {

    Optional<Quiz> findById(Integer id);
    List<Quiz> findByOwnerId(Integer id);
    List<Quiz> findByNameAndOwnerId(String quizName, Integer ownerId);
}
