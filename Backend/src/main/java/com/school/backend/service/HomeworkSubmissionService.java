package com.school.backend.service;

import com.school.backend.dto.HomeworkSubmissionDto;
import com.school.backend.model.Homework;
import com.school.backend.model.HomeworkSubmission;
import com.school.backend.model.Student;
import com.school.backend.repository.HomeworkRepository;
import com.school.backend.repository.HomeworkSubmissionRepository;
import com.school.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeworkSubmissionService {

    private final HomeworkSubmissionRepository submissionRepository;
    private final HomeworkRepository homeworkRepository;
    private final StudentRepository studentRepository;

    public HomeworkSubmissionService(HomeworkSubmissionRepository submissionRepository,
                                     HomeworkRepository homeworkRepository,
                                     StudentRepository studentRepository) {
        this.submissionRepository = submissionRepository;
        this.homeworkRepository = homeworkRepository;
        this.studentRepository = studentRepository;
    }

    public HomeworkSubmission recordSubmission(HomeworkSubmissionDto dto) {
        Homework homework = homeworkRepository.findById(dto.getHomeworkId())
                .orElseThrow(() -> new RuntimeException("Homework not found with id: " + dto.getHomeworkId()));
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + dto.getStudentId()));

        HomeworkSubmission.Status status;
        try {
            status = HomeworkSubmission.Status.valueOf(dto.getStatus());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new RuntimeException("Invalid status. Must be 'submitted' or 'missing'");
        }

        HomeworkSubmission submission = new HomeworkSubmission();
        submission.setHomework(homework);
        submission.setStudent(student);
        submission.setStatus(status);
        return submissionRepository.save(submission);
    }

    public List<HomeworkSubmission> getSubmissionsByStudent(Long studentId) {
        return submissionRepository.findByStudentId(studentId);
    }
}
