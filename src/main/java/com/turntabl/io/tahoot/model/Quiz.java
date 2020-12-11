package com.turntabl.io.tahoot.model;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Entity
@Table(name = "quiz")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NONE)
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "quiz_id")
    @JsonProperty("quiz_id")
    private int quiz_id;

    @JsonProperty("quiz_name")
    private String quiz_name;

    @Column(name = "game_pin")
    @JsonProperty("game_pin")
    private int game_pin = 10000 +new Random().nextInt(90000);

    @CreationTimestamp
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created")
    private Date timestamp;


    @OneToMany(mappedBy = "quiz",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    private List<Questions>questions;

    @ManyToOne
    @JoinColumn(name = "host_id")
    private Host host;

    public int getQuiz_id() {
        return quiz_id;
    }

    public void setQuiz_id(int quiz_id) {
        this.quiz_id = quiz_id;
    }

    public String getQuiz_name() {
        return quiz_name;
    }

    public void setQuiz_name(String quiz_name) {
        this.quiz_name = quiz_name;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public int getGame_pin() {
        return game_pin;
    }

    public void setGame_pin(int game_pin) {
        //Random random=new Random();
        this.game_pin = game_pin;
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
        this.host=host;
    }
}
