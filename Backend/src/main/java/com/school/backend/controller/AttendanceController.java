package com.school.backend.controller;

import com.school.backend.dto.ApiResponse;
import com.school.backend.dto.AttendanceDto;
import com.school.backend.model.Attendance;
import com.school.backend.service.AttendanceService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Attendance>> recordAttendance(@RequestBody AttendanceDto dto) {
        try {
            return ResponseEntity.ok(ApiResponse.success("Attendance recorded", attendanceService.recordAttendance(dto)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<List<Attendance>>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(ApiResponse.success("Attendance retrieved", attendanceService.getAttendanceByStudent(studentId)));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<ApiResponse<List<Attendance>>> getByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(ApiResponse.success("Attendance retrieved", attendanceService.getAttendanceByDate(date)));
    }
}
