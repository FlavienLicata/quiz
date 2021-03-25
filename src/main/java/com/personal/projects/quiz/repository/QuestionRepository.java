package com.personal.projects.quiz.repository;

import com.personal.projects.quiz.models.Question;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends CrudRepository<Question, Integer> {

    Optional<Question> findById(Integer id);
    List<Question> findByQuizId(Integer id);
    Integer countAllByQuizId(Integer quizId);
}
