package com.personal.projects.quiz.services;

import com.personal.projects.quiz.models.Participant;
import org.springframework.data.repository.query.Param;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ParticipantService {

    Optional<Participant> findById(Integer id);
    Participant findByTokenAndAndParticipationDateIsNull(String token);
    List<Participant> findByQuizIdAndParticipationDateIsNotNull(Integer quizId);
    List<Participant> findByQuizIdAndParticipationDateIsNull(Integer quizId);
    List<?> findParticipationDateCount(Integer quizId);
    Integer averageTimeByQuizId(Integer quizId);
    Double averageCompletionByQuizId(Integer quizId);
    Double averageSuccessByQuizId(Integer quizId);
    Participant save(Participant participant, HttpServletRequest request);
    Participant saveParticipation(Participant participant);
    Participant resendInvitation(Participant participant);
    Integer delete(Integer participantId);
}
