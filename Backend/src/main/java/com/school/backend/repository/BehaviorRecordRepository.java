package com.school.backend.repository;

import com.school.backend.model.BehaviorRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BehaviorRecordRepository extends JpaRepository<BehaviorRecord, Long> {
    List<BehaviorRecord> findByStudentId(Long studentId);
}
