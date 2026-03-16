package com.school.backend.controller;

import com.school.backend.dto.ApiResponse;
import com.school.backend.dto.HomeworkDto;
import com.school.backend.model.Homework;
import com.school.backend.service.HomeworkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/homework")
public class HomeworkController {

    private final HomeworkService homeworkService;

    public HomeworkController(HomeworkService homeworkService) {
        this.homeworkService = homeworkService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Homework>> createHomework(@RequestBody HomeworkDto dto) {
        try {
            return ResponseEntity.ok(ApiResponse.success("Homework created", homeworkService.createHomework(dto)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Homework>>> getAllHomework() {
        return ResponseEntity.ok(ApiResponse.success("Homework retrieved", homeworkService.getAllHomework()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Homework>> updateHomework(@PathVariable Long id, @RequestBody HomeworkDto dto) {
        try {
            return ResponseEntity.ok(ApiResponse.success("Homework updated", homeworkService.updateHomework(id, dto)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteHomework(@PathVariable Long id) {
        try {
            homeworkService.deleteHomework(id);
            return ResponseEntity.ok(ApiResponse.success("Homework deleted"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
