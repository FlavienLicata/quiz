package com.personal.projects.quiz.services.impl;

import com.personal.projects.quiz.models.Quiz;
import com.personal.projects.quiz.repository.QuizRepository;
import com.personal.projects.quiz.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Optional<Quiz> findById(Integer id) {
        Optional<Quiz> quiz = null;
        try {
            quiz = quizRepository.findById(id);
        } catch (Exception e) {
            throw e;
        }
        return quiz;
    }

    @Override
    public List<Quiz> findByOwnerId(Integer id) {
        List<Quiz> quiz = null;
        try {
            quiz = quizRepository.findByOwnerId(id);
        } catch (Exception e) {
            throw e;
        }
        return quiz;
    }

    @Override
    public List<Quiz> findByNameAndOwnerId(String quizName, Integer ownerId) {
        List<Quiz> quiz = null;
        try {
            quiz = quizRepository.findByNameAndOwnerId(quizName, ownerId);
        } catch (Exception e) {
            throw e;
        }
        return quiz;
    }
}
