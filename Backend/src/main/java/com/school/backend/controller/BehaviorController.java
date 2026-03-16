package com.school.backend.controller;

import com.school.backend.dto.ApiResponse;
import com.school.backend.dto.BehaviorDto;
import com.school.backend.model.BehaviorRecord;
import com.school.backend.service.BehaviorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/behavior")
public class BehaviorController {

    private final BehaviorService behaviorService;

    public BehaviorController(BehaviorService behaviorService) {
        this.behaviorService = behaviorService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BehaviorRecord>> recordBehavior(@RequestBody BehaviorDto dto) {
        try {
            return ResponseEntity.ok(ApiResponse.success("Behavior recorded", behaviorService.recordBehavior(dto)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BehaviorRecord>>> getAllRecords() {
        return ResponseEntity.ok(ApiResponse.success("Behavior records retrieved", behaviorService.getAllBehaviorRecords()));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<List<BehaviorRecord>>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(ApiResponse.success("Behavior records retrieved", behaviorService.getBehaviorByStudent(studentId)));
    }
}
