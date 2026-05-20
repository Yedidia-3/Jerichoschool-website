package com.school.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "attendance")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    public Attendance() {}

    public enum Status { present, absent, late }

    public Long getId()                     { return id; }
    public void setId(Long id)              { this.id = id; }
    public Student getStudent()             { return student; }
    public void setStudent(Student s)       { this.student = s; }
    public LocalDate getDate()              { return date; }
    public void setDate(LocalDate date)     { this.date = date; }
    public Status getStatus()               { return status; }
    public void setStatus(Status status)    { this.status = status; }
}
