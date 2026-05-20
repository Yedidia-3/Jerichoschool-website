package com.school.backend.dto;

import java.time.LocalDate;

public class AttendanceDto {
    private Long studentId;
    private LocalDate date;
    private String status;

    public Long getStudentId()              { return studentId; }
    public void setStudentId(Long id)       { this.studentId = id; }
    public LocalDate getDate()              { return date; }
    public void setDate(LocalDate date)     { this.date = date; }
    public String getStatus()               { return status; }
    public void setStatus(String status)    { this.status = status; }
}
