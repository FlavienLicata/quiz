package com.personal.projects.quiz.services.impl;

import com.personal.projects.quiz.models.ParticipantAnswer;
import com.personal.projects.quiz.repository.ParticipantAnswerRepository;
import com.personal.projects.quiz.services.ParticipantAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParticipantAnswerServiceImpl implements ParticipantAnswerService {

    @Autowired
    private ParticipantAnswerRepository participantAnswerRepository;

    @Override
    public ParticipantAnswer save(ParticipantAnswer participantAnswer) {
        participantAnswerRepository.save(participantAnswer);
        return participantAnswer;
    }
}
