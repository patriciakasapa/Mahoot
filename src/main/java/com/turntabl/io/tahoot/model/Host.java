package com.turntabl.io.tahoot.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "host")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NONE)
public class Host implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long host_id;

    @JsonProperty("host_name")
    private String host_name;

    @CreationTimestamp
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @JsonProperty("date_created")
    @Column(name = "date_created")
    private Date timestamp;

    @OneToMany(mappedBy = "host",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    private List<Quiz>quiz;

    public Host() {
    }

    public Host(Long host_id, String host_name, Date timestamp, List<Quiz> quiz) {
        this.host_id = host_id;
        this.host_name = host_name;
        this.timestamp = timestamp;
        this.quiz = quiz;
    }

    public Long getHost_id() {
        return host_id;
    }

    public void setHost_id(Long host_id) {
        this.host_id = host_id;
    }

    public String getHost_name() {
        return host_name;
    }

    public void setHost_name(String host_name) {
        this.host_name = host_name;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "host")
    @JsonManagedReference
    public List<Quiz>getQuiz(){
        return quiz;
    }

    public void setQuiz(List<Quiz>quiz){
        this.quiz=quiz;
    }
}
