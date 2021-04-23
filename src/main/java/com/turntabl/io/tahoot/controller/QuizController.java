package com.turntabl.io.tahoot.controller;

//import com.turntabl.io.tahoot.model.Questions;
import com.turntabl.io.tahoot.model.Questions;
import com.turntabl.io.tahoot.model.Quiz;
import com.turntabl.io.tahoot.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    @CrossOrigin
    @GetMapping("/quiz/getquiz")
    public List<Quiz> findAll() {
        return quizRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/quiz/{quiz_id}")
    public ResponseEntity<?> findId(@PathVariable("quiz_id") Long quiz_id){

        Optional<Quiz> quiz =null;
        Map<String,Object> response = new HashMap<>();

        try{
            quiz = quizRepository.findById(quiz_id);
        }catch(DataAccessException e){
            response.put("error", e.getMessage().concat(": "+e.getMostSpecificCause().toString()));
            new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

//        System.out.println("Patient with id: "+question_id+" / "+question.get().getHost_id());

        return ResponseEntity.ok(quiz);
    }

    @CrossOrigin
    @PutMapping("/quiz/{quiz_id}")
    public ResponseEntity<Quiz> updateQuestion(@PathVariable("quiz_id") Long quiz_id, @RequestBody Quiz quiz){
//        public ResponseEntity<Quiz> updateQuestion(@PathVariable("quiz_id") Long quiz_id, @RequestParam(value = "file", required = false) MultipartFile file, @RequestBody string quiz){

            Optional<Quiz> quizData =quizRepository.findById(quiz_id);

        if (quizData.isPresent()){
            Quiz quizzes = quizData.get();
            quizzes.setQuiz_name(quiz.getQuiz_name());
            quizzes.setQuestions(quiz.getQuestions());
            return new ResponseEntity<>(quizRepository.save(quizzes), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @DeleteMapping("/quiz/{quiz_id}")
    public ResponseEntity <HttpStatus>deleteQuiz (@PathVariable ("quiz_id") Long question_id, Quiz quiz){
        try {
            quizRepository.delete(quiz);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
