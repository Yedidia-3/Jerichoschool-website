package com.school.backend.service;

import com.school.backend.dto.StudentDto;
import com.school.backend.model.Student;
import com.school.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student createStudent(StudentDto dto) {
        if (studentRepository.existsByStudentId(dto.getStudentId())) {
            throw new RuntimeException("Student ID already exists: " + dto.getStudentId());
        }
        Student student = new Student();
        student.setStudentId(dto.getStudentId());
        student.setName(dto.getName());
        student.setClassName(dto.getClassName());
        student.setAge(dto.getAge());
        student.setParentContact(dto.getParentContact());
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    public Student updateStudent(Long id, StudentDto dto) {
        Student student = getStudentById(id);
        student.setName(dto.getName());
        student.setClassName(dto.getClassName());
        student.setAge(dto.getAge());
        student.setParentContact(dto.getParentContact());
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }
}
