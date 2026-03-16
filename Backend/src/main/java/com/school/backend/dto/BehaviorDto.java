package com.school.backend.dto;

import java.time.LocalDate;

public class BehaviorDto {
    private Long studentId;
    private LocalDate date;
    private String behaviorType;
    private String note;
    private Long recordedBy;

    public Long getStudentId()                      { return studentId; }
    public void setStudentId(Long studentId)        { this.studentId = studentId; }
    public LocalDate getDate()                      { return date; }
    public void setDate(LocalDate date)             { this.date = date; }
    public String getBehaviorType()                 { return behaviorType; }
    public void setBehaviorType(String bt)          { this.behaviorType = bt; }
    public String getNote()                         { return note; }
    public void setNote(String note)                { this.note = note; }
    public Long getRecordedBy()                     { return recordedBy; }
    public void setRecordedBy(Long recordedBy)      { this.recordedBy = recordedBy; }
}
