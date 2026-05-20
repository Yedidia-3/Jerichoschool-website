package com.school.backend.dto;

public class HomeworkSubmissionDto {
    private Long homeworkId;
    private Long studentId;
    private String status;

    public Long getHomeworkId()                 { return homeworkId; }
    public void setHomeworkId(Long homeworkId)  { this.homeworkId = homeworkId; }
    public Long getStudentId()                  { return studentId; }
    public void setStudentId(Long studentId)    { this.studentId = studentId; }
    public String getStatus()                   { return status; }
    public void setStatus(String status)        { this.status = status; }
}
