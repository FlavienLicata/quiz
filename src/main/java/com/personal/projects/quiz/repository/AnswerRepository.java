package com.personal.projects.quiz.repository;

import com.personal.projects.quiz.models.Answer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnswerRepository extends CrudRepository<Answer, Integer> {

    Optional<Answer> findById(Integer id);
    List<Answer> findByQuizId(Integer id);
//    Integer countAllByQuizId(Integer quizId);
}
