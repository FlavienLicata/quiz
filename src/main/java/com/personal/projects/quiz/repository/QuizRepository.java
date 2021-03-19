package com.personal.projects.quiz.repository;

import com.personal.projects.quiz.models.Quiz;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends CrudRepository<Quiz, Integer> {

    Optional<Quiz> findById(Integer id);
    List<Quiz> findByOwnerId(Integer id);
    List<Quiz> findByNameAndOwnerId(String quizName, Integer ownerId);
}
