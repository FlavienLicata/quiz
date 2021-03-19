package com.personal.projects.quiz.services.impl;

import com.personal.projects.quiz.models.Question;
import com.personal.projects.quiz.repository.QuestionRepository;
import com.personal.projects.quiz.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Optional<Question> findById(Integer id) {
        Optional<Question> question = null;
        try {
            question = questionRepository.findById(id);
        } catch (Exception e) {
            throw e;
        }
        return question;
    }

    @Override
    public Integer countAllByQuizId(Integer quizId) {
        return questionRepository.countAllByQuizId(quizId);
    }
}
