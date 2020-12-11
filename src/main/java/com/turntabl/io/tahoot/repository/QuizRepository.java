package com.turntabl.io.tahoot.repository;

import com.turntabl.io.tahoot.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz,Long> {
}
