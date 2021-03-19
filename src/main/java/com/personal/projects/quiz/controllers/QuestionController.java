package com.personal.projects.quiz.controllers;

import com.personal.projects.quiz.models.Question;
import com.personal.projects.quiz.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/question")
public class QuestionController {

    @Autowired
    public QuestionService questionService;

    @GetMapping(value="/{id}")
    public Optional<Question> getQuestion(@PathVariable Integer id) {
        return questionService.findById(id);
    }

    @GetMapping(value="/count/quiz/{id}")
    public Integer countQuestionByQuizId(@PathVariable Integer id) {
        return questionService.countAllByQuizId(id);
    }

}
