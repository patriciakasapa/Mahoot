package com.turntabl.io.tahoot.repository;

import com.turntabl.io.tahoot.model.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionsRepository extends JpaRepository<Questions,Long> {
//    List<Questions> findBy(int question_id);
//    List<Questions>findAll();
}
