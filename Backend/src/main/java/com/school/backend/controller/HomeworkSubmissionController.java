package com.school.backend.controller;

import com.school.backend.dto.ApiResponse;
import com.school.backend.dto.HomeworkSubmissionDto;
import com.school.backend.model.HomeworkSubmission;
import com.school.backend.service.HomeworkSubmissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/homework-submissions")
public class HomeworkSubmissionController {

    private final HomeworkSubmissionService submissionService;

    public HomeworkSubmissionController(HomeworkSubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<HomeworkSubmission>> recordSubmission(@RequestBody HomeworkSubmissionDto dto) {
        try {
            return ResponseEntity.ok(ApiResponse.success("Submission recorded", submissionService.recordSubmission(dto)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<List<HomeworkSubmission>>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(ApiResponse.success("Submissions retrieved", submissionService.getSubmissionsByStudent(studentId)));
    }
}
