package com.personal.projects.quiz.controllers;

import com.personal.projects.quiz.models.ParticipantAnswer;
import com.personal.projects.quiz.services.ParticipantAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/participant-answer")
public class ParticipantAnswerController {

    @Autowired
    public ParticipantAnswerService participantAnswerService;

    @PostMapping(value="/save")
    public ParticipantAnswer save(@RequestBody ParticipantAnswer participantAnswer) {
        return participantAnswerService.save(participantAnswer);
    }

    @GetMapping(value="/quiz/{id}/participant/{pid}")
    public List<ParticipantAnswer> getQuiz(@PathVariable Integer id, @PathVariable Integer pid) {
        return participantAnswerService.findByQuizIdAndParticipantId(id, pid);
    }
}
