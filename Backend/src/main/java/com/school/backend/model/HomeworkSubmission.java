package com.school.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "homework_submissions")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class HomeworkSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "homework_id", nullable = false)
    private Homework homework;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    public HomeworkSubmission() {}

    public enum Status { submitted, missing }

    public Long getId()                         { return id; }
    public void setId(Long id)                  { this.id = id; }
    public Homework getHomework()               { return homework; }
    public void setHomework(Homework homework)  { this.homework = homework; }
    public Student getStudent()                 { return student; }
    public void setStudent(Student student)     { this.student = student; }
    public Status getStatus()                   { return status; }
    public void setStatus(Status status)        { this.status = status; }
}
