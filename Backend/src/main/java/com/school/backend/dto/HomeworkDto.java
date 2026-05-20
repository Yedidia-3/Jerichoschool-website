package com.school.backend.dto;

import java.time.LocalDate;

public class HomeworkDto {
    private String title;
    private String subject;
    private String description;
    private LocalDate dueDate;
    private Long createdBy;

    public String getTitle()                    { return title; }
    public void setTitle(String title)          { this.title = title; }
    public String getSubject()                  { return subject; }
    public void setSubject(String subject)      { this.subject = subject; }
    public String getDescription()              { return description; }
    public void setDescription(String desc)     { this.description = desc; }
    public LocalDate getDueDate()               { return dueDate; }
    public void setDueDate(LocalDate dueDate)   { this.dueDate = dueDate; }
    public Long getCreatedBy()                  { return createdBy; }
    public void setCreatedBy(Long createdBy)    { this.createdBy = createdBy; }
}
