package com.school.backend.service;

import com.school.backend.dto.BehaviorDto;
import com.school.backend.model.BehaviorRecord;
import com.school.backend.model.Student;
import com.school.backend.model.User;
import com.school.backend.repository.BehaviorRecordRepository;
import com.school.backend.repository.StudentRepository;
import com.school.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BehaviorService {

    private final BehaviorRecordRepository behaviorRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public BehaviorService(BehaviorRecordRepository behaviorRepository,
                           StudentRepository studentRepository,
                           UserRepository userRepository) {
        this.behaviorRepository = behaviorRepository;
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    public BehaviorRecord recordBehavior(BehaviorDto dto) {
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + dto.getStudentId()));

        BehaviorRecord.BehaviorType type;
        try {
            type = BehaviorRecord.BehaviorType.valueOf(dto.getBehaviorType());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new RuntimeException("Invalid behavior type. Must be 'good', 'warning', 'misconduct', or 'excellent'");
        }

        BehaviorRecord record = new BehaviorRecord();
        record.setStudent(student);
        record.setDate(dto.getDate());
        record.setBehaviorType(type);
        record.setNote(dto.getNote());

        if (dto.getRecordedBy() != null) {
            User teacher = userRepository.findById(dto.getRecordedBy())
                    .orElseThrow(() -> new RuntimeException("Teacher not found with id: " + dto.getRecordedBy()));
            record.setRecordedBy(teacher);
        }

        return behaviorRepository.save(record);
    }

    public List<BehaviorRecord> getBehaviorByStudent(Long studentId) {
        return behaviorRepository.findByStudentId(studentId);
    }

    public List<BehaviorRecord> getAllBehaviorRecords() {
        return behaviorRepository.findAll();
    }
}
