package com.school.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "students")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id", unique = true, nullable = false)
    private String studentId;

    @Column(nullable = false)
    private String name;

    @Column(name = "class_name")
    private String className;

    private Integer age;

    @Column(name = "parent_contact")
    private String parentContact;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public Student() {}

    public Long getId()                         { return id; }
    public void setId(Long id)                  { this.id = id; }
    public String getStudentId()                { return studentId; }
    public void setStudentId(String studentId)  { this.studentId = studentId; }
    public String getName()                     { return name; }
    public void setName(String name)            { this.name = name; }
    public String getClassName()                { return className; }
    public void setClassName(String className)  { this.className = className; }
    public Integer getAge()                     { return age; }
    public void setAge(Integer age)             { this.age = age; }
    public String getParentContact()            { return parentContact; }
    public void setParentContact(String pc)     { this.parentContact = pc; }
    public LocalDateTime getCreatedAt()         { return createdAt; }
    public void setCreatedAt(LocalDateTime t)   { this.createdAt = t; }
}
