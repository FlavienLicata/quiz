package com.personal.projects.quiz.controllers;

import com.personal.projects.quiz.models.Quiz;
import com.personal.projects.quiz.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/quiz")
public class QuizController {

    @Autowired
    public QuizService quizService;

    @GetMapping(value="/{id}")
    public Optional<Quiz> getQuiz(@PathVariable Integer id) {
        return quizService.findById(id);
    }

    @GetMapping(value="/owner/{id}")
    public List<Quiz> getQuizByOwner(@PathVariable Integer id) {
        return quizService.findByOwnerId(id);
    }

    @GetMapping(value="/owner/{id}/search/{name}")
    public List<Quiz> searchQuizByOwner(@PathVariable Integer id, @PathVariable String name) {
        return quizService.findByNameAndOwnerId(name,id);
    }
}
