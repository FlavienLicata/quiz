package com.personal.projects.quiz.services;

import com.personal.projects.quiz.models.User;
import org.springframework.stereotype.Service;

public interface UserService {

    User findByEmail(String email);
}
