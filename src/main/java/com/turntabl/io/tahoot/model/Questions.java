package com.turntabl.io.tahoot.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "question")
public class Questions implements Serializable {
    private static final long serialVersionUID = -2343243243242432341L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("question_id")
    private Long question_id;

    @Column(name = "question_type")
    @JsonProperty("question_type")
    private String question_type;

    @Column(name = "question_body")
    @JsonProperty("question_body")
    private String question_body;

    @Column(name = "image_url")
    @JsonProperty("image_url")
    private String image_url;

    @JsonProperty("points")
    @Column(name = "points")
    private int points;

    @JsonProperty("timer")
    @Column(name = "timer")
    private int timer;

//    @Column(name = "file_name")
//    @JsonProperty("file_name")
//    private String file_name;
//
//    @Column(name = "file_type")
//    @JsonProperty("file_type")
//    private String file_type;




    @CreationTimestamp
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created")
    private Date timestamp;

    @OneToMany(cascade={CascadeType.ALL})
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name="question_id", referencedColumnName="question_id")
    private List<Options> options;

//    {"timestamp":"2021-01-22T12:40:19.070+00:00","answer":[{"answer_id":5,"answer_body":"Tiger",
//    "is_correct":true},{"answer_id":6,"answer_body":"Edinam","is_correct":false}],"question_id":4,
//    "question_body":"Which of the following is an Animal?",
//    "points":100,"timer":30,"image":"image.jpg","file_name":"image","file_type":"string"}
    public Questions() {
    }

    public Questions(String question_type, String question_body, String image_url, int points, int timer, Date timestamp) {
        this.question_type = question_type;
        this.question_body = question_body;
        this.image_url = image_url;
        this.points = points;
        this.timer = timer;
        this.timestamp = timestamp;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Long question_id) {
        this.question_id = question_id;
    }

    public String getQuestion_type() {
        return question_type;
    }

    public void setQuestion_type(String question_type) {
        this.question_type = question_type;
    }

    public String getQuestion_body() {
        return question_body;
    }

    public void setQuestion_body(String question_body) {
        this.question_body = question_body;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getTimer() {
        return timer;
    }

    public void setTimer(int timer) {
        this.timer = timer;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public List<Options> getOptions() {
        return options;
    }

    public void setOptions(List<Options> options) {
        this.options= options;
    }

    @Override
    public String toString() {
        return "Questions{" +
                "question_id=" + question_id +
                ", question_type='" + question_type + '\'' +
                ", question_body='" + question_body + '\'' +
                ", image_url='" + image_url + '\'' +
                ", points=" + points +
                ", timer=" + timer +
                ", timestamp=" + timestamp +
                ", options=" + options +
                ", quiz=" + quiz +
                '}';
    }
//    public String toString() {
//        return "Questions{" +
//                "question_id=" + question_id +
//                ", question_body='" + question_body + '\'' +
//                ", timestamp=" + timestamp +
//                '}';
//    }


    @OneToMany(fetch = FetchType.EAGER, mappedBy = "question")
    @JsonManagedReference
    public List<Options> getOption() {
        return options;
    }

    public void setOption(List<Options> option) {
        this.options = option;
    }


    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quiz_id", nullable = false)
    @JsonBackReference
    public Quiz getQuiz(){
        return quiz;
    }

    public void setQuiz(Quiz quiz){
        this.quiz=quiz;
    }
}
