package com.personal.projects.quiz.controllers;

import com.personal.projects.quiz.models.ParticipantAnswer;
import com.personal.projects.quiz.services.ParticipantAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
