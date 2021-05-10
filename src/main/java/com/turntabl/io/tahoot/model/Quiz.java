package com.turntabl.io.tahoot.model;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Entity
@Table(name = "quiz")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NONE)
public class Quiz implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "quiz_id")
    @JsonProperty("quiz_id")
    private Long quiz_id;

    @JsonProperty("quiz_name")
    private String quiz_name;

    @JsonProperty("quiz_description")
    private String quiz_description;

    @Column(name = "quiz_pin")
    @JsonProperty("quiz_pin")
    private int quiz_pin = 10000 +new Random().nextInt(90000);

    @CreationTimestamp
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_created")
    private Date timestamp;


    @OneToMany(mappedBy = "quiz",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    private List<Questions>questions;

    @ManyToOne
    @JoinColumn(name = "host_id")
    private Host host;



    public Long getQuiz_id() {
        return quiz_id;
    }

    public void setQuiz_id(Long quiz_id) {
        this.quiz_id = quiz_id;
    }

    public String getQuiz_name() {
        return quiz_name;
    }

    public void setQuiz_name(String quiz_name) {
        this.quiz_name = quiz_name;
    }

    public String getQuiz_description() {
        return quiz_description;
    }

    public void setQuiz_description(String quiz_description) {
        this.quiz_description= quiz_description;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public int getQuiz_pin() {
        return quiz_pin;
    }

    public void setQuiz_pin(int quiz_pin) {
        //Random random=new Random();
        this.quiz_pin = quiz_pin;
    }

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "quiz")
    @JsonManagedReference
    public List<Questions>getQuestions(){
        return questions;
    }

    public void setQuestions (List<Questions>questions){
        this.questions=questions;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "host_id", nullable = false)
    @JsonBackReference
    public Host getHost(){
        return host;
    }

    public void setHost(Host host){
        this.host = host;
    }
}
