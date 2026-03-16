package com.school.backend.service;

import com.school.backend.dto.AttendanceDto;
import com.school.backend.model.Attendance;
import com.school.backend.model.Student;
import com.school.backend.repository.AttendanceRepository;
import com.school.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;

    public AttendanceService(AttendanceRepository attendanceRepository,
                             StudentRepository studentRepository) {
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
    }

    public Attendance recordAttendance(AttendanceDto dto) {
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + dto.getStudentId()));

        Attendance.Status status;
        try {
            status = Attendance.Status.valueOf(dto.getStatus());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new RuntimeException("Invalid status. Must be 'present', 'absent', or 'late'");
        }

        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setDate(dto.getDate());
        attendance.setStatus(status);
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendanceByStudent(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    public List<Attendance> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByDate(date);
    }
}
