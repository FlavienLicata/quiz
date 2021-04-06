package com.personal.projects.quiz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@SpringBootApplication
public class QuizOnlineApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuizOnlineApplication.class, args);
    }

}
