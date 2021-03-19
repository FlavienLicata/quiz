package com.personal.projects.quiz.services.impl;

import com.personal.projects.quiz.models.User;
import com.personal.projects.quiz.repository.UserRepository;
import com.personal.projects.quiz.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByEmail(String email) {
        User user = null;
        try {
            user = userRepository.findByEmail(email);
        } catch (Exception e) {
            throw e;
        }
        return user;
    }
}
