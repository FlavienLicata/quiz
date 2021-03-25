package com.personal.projects.quiz.services.impl;

import com.personal.projects.quiz.models.Answer;
import com.personal.projects.quiz.repository.AnswerRepository;
import com.personal.projects.quiz.services.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Override
    public Optional<Answer> findById(Integer id) {
        Optional<Answer> answer = null;
        try {
            answer = answerRepository.findById(id);
        } catch (Exception e) {
            throw e;
        }
        return answer;
    }

    @Override
    public List<Answer> findByQuizId(Integer id) {
        List<Answer> questions = null;
        try {
            questions = answerRepository.findByQuizId(id);
        } catch (Exception e) {
            throw e;
        }
        return questions;
    }
}
