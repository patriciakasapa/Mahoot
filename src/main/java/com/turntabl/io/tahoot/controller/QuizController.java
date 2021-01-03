package com.turntabl.io.tahoot.controller;

import com.turntabl.io.tahoot.model.Quiz;
import com.turntabl.io.tahoot.repository.QuestionsRepository;
import com.turntabl.io.tahoot.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QuizController {



    @Autowired
    QuizRepository quizRepository;

    @CrossOrigin
    @PostMapping("/createquiz")
    public String quiz(@RequestBody Quiz quiz){
        quizRepository.save(quiz);
    return "Quiz created";
    }
}
