package com.personal.projects.quiz.services;

import com.personal.projects.quiz.models.ParticipantAnswer;

import java.util.List;
import java.util.Optional;

public interface ParticipantAnswerService {

    ParticipantAnswer save(ParticipantAnswer participantAnswer);
    List<ParticipantAnswer> findByQuizIdAndParticipantId(Integer quizId, Integer participantId);
}
