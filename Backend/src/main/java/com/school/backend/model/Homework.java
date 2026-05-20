package com.school.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "homework")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Homework {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String subject;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by")
    private User createdBy;

    public Homework() {}

    public Long getId()                         { return id; }
    public void setId(Long id)                  { this.id = id; }
    public String getTitle()                    { return title; }
    public void setTitle(String title)          { this.title = title; }
    public String getSubject()                  { return subject; }
    public void setSubject(String subject)      { this.subject = subject; }
    public String getDescription()              { return description; }
    public void setDescription(String desc)     { this.description = desc; }
    public LocalDate getDueDate()               { return dueDate; }
    public void setDueDate(LocalDate dueDate)   { this.dueDate = dueDate; }
    public User getCreatedBy()                  { return createdBy; }
    public void setCreatedBy(User createdBy)    { this.createdBy = createdBy; }
}
