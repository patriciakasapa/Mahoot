package com.turntabl.io.tahoot.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "option")
public class Options implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("option_id")
    private int option_id;

    @Column(name = "option_type")
    @JsonProperty("option_type")
    private String option_type;

    @Column(name = "option_body")
    @JsonProperty("option_body")
    private String option_body;

    @Column(name ="status" ,columnDefinition="boolean default ('0')")
    @JsonProperty("status")
    private boolean status;


    @ManyToOne
    @JoinColumn(name = "question_id")
    private Questions questions;

    public Options(int option_id, String option_type, String option_body, boolean status) {
        this.option_id = option_id;
        this.option_type = option_type;
        this.option_body = option_body;
        this.status = status;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_id", nullable = false)
    @JsonBackReference
    public Questions getQuestions(){
        return questions;
    }
    public void setQuestions(Questions questions){
        this.questions=questions;
    }


    public int getOption_id() {
        return option_id;
    }

    public String getOption_body() {
        return option_body;
    }

    public boolean isStatus() {
        return status;
    }

    @Override
    public String toString() {
        return "Options{" +
                "option_id=" + option_id +
                ", option_type='" + option_type + '\'' +
                ", option_body='" + option_body + '\'' +
                ", status=" + status +
                '}';
    }
}
