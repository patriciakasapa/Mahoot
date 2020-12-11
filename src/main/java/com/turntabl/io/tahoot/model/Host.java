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
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "host")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NONE)
public class Host {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int host_id;

    @JsonProperty("host_name")
    private String host_name;

    @CreationTimestamp
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @JsonProperty("created")
    @Column(name = "created")
    private Date timestamp;

    @OneToMany(mappedBy = "host",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    private List<Quiz>quiz;

    public int getHost_id() {
        return host_id;
    }

    public void setHost_id(int host_id) {
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
