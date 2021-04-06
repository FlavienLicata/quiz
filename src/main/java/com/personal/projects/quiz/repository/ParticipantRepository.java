package com.personal.projects.quiz.repository;

import com.personal.projects.quiz.models.Participant;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.mail.Part;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipantRepository extends CrudRepository<Participant, Integer> {

    Optional<Participant> findById(Integer id);
    Participant findByTokenAndAndParticipationDateIsNull(String token);
    List<Participant> findByQuizIdAndParticipationDateIsNotNull(Integer quizId);
    List<Participant> findByQuizIdAndParticipationDateIsNull(Integer quizId);

    @Query("SELECT p.participationDate, count(p) FROM Participant p WHERE p.quizId = :quizId AND p.participationDate IS NOT NULL GROUP BY p.participationDate ORDER BY p.participationDate")
    List<?> findParticipationDateCount(@Param("quizId") Integer quizId);

    @Query("SELECT (SUM (p.timer) / count(p)) FROM Participant p WHERE p.quizId = :quizId AND p.participationDate IS NOT NULL AND p.timer IS NOT NULL")
    Integer averageTimeByQuizId(@Param("quizId") Integer quizId);

    @Query("SELECT (SUM (p.completionRate) / count(p)) FROM Participant p WHERE p.quizId = :quizId AND p.participationDate IS NOT NULL AND p.completionRate IS NOT NULL")
    Double averageCompletionByQuizId(@Param("quizId") Integer quizId);

    @Query("SELECT (SUM (p.successRate) / count(p)) FROM Participant p WHERE p.quizId = :quizId AND p.participationDate IS NOT NULL AND p.successRate IS NOT NULL")
    Double averageSuccessByQuizId(@Param("quizId") Integer quizId);

    Participant save(Participant participant);
}
