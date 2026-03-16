package com.school.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "behavior_records")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BehaviorRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "behavior_type", nullable = false)
    private BehaviorType behaviorType;

    @Column(columnDefinition = "TEXT")
    private String note;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recorded_by")
    private User recordedBy;

    public BehaviorRecord() {}

    public enum BehaviorType { good, warning, misconduct, excellent }

    public Long getId()                             { return id; }
    public void setId(Long id)                      { this.id = id; }
    public Student getStudent()                     { return student; }
    public void setStudent(Student student)         { this.student = student; }
    public LocalDate getDate()                      { return date; }
    public void setDate(LocalDate date)             { this.date = date; }
    public BehaviorType getBehaviorType()           { return behaviorType; }
    public void setBehaviorType(BehaviorType bt)    { this.behaviorType = bt; }
    public String getNote()                         { return note; }
    public void setNote(String note)                { this.note = note; }
    public User getRecordedBy()                     { return recordedBy; }
    public void setRecordedBy(User recordedBy)      { this.recordedBy = recordedBy; }
}
