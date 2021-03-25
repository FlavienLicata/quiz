package com.personal.projects.quiz.controllers;

import com.personal.projects.quiz.models.Answer;
import com.personal.projects.quiz.services.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/answer")
public class AnswerController {

    @Autowired
    public AnswerService answerService;

    @GetMapping(value="/{id}")
    public Optional<Answer> getQuestion(@PathVariable Integer id) {
        return answerService.findById(id);
    }

    @GetMapping(value="/quiz/{id}")
    public List<Answer> getQuestionsQuiz(@PathVariable Integer id) {
        return answerService.findByQuizId(id);
    }
//
//    @GetMapping(value="/count/quiz/{id}")
//    public Integer countQuestionByQuizId(@PathVariable Integer id) {
//        return questionService.countAllByQuizId(id);
//    }

}
