package com.school.backend.dto;

public class StudentDto {
    private String studentId;
    private String name;
    private String className;
    private Integer age;
    private String parentContact;

    public String getStudentId()                  { return studentId; }
    public void setStudentId(String studentId)    { this.studentId = studentId; }
    public String getName()                       { return name; }
    public void setName(String name)              { this.name = name; }
    public String getClassName()                  { return className; }
    public void setClassName(String className)    { this.className = className; }
    public Integer getAge()                       { return age; }
    public void setAge(Integer age)               { this.age = age; }
    public String getParentContact()              { return parentContact; }
    public void setParentContact(String pc)       { this.parentContact = pc; }
}
