package com.personal.projects.quiz.repository;

import com.personal.projects.quiz.models.ParticipantAnswer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantAnswerRepository extends CrudRepository<ParticipantAnswer, Integer> {

    ParticipantAnswer save(ParticipantAnswer participantAnswer);
    List<ParticipantAnswer> findByQuizIdAndParticipantId(Integer quizId, Integer participantId);
}
