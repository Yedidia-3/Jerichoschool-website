package com.school.backend.service;

import com.school.backend.dto.HomeworkDto;
import com.school.backend.model.Homework;
import com.school.backend.model.User;
import com.school.backend.repository.HomeworkRepository;
import com.school.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeworkService {

    private final HomeworkRepository homeworkRepository;
    private final UserRepository userRepository;

    public HomeworkService(HomeworkRepository homeworkRepository, UserRepository userRepository) {
        this.homeworkRepository = homeworkRepository;
        this.userRepository = userRepository;
    }

    public Homework createHomework(HomeworkDto dto) {
        Homework homework = buildHomework(new Homework(), dto);
        return homeworkRepository.save(homework);
    }

    public List<Homework> getAllHomework() {
        return homeworkRepository.findAll();
    }

    public Homework updateHomework(Long id, HomeworkDto dto) {
        Homework homework = homeworkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Homework not found with id: " + id));
        return homeworkRepository.save(buildHomework(homework, dto));
    }

    public void deleteHomework(Long id) {
        if (!homeworkRepository.existsById(id)) {
            throw new RuntimeException("Homework not found with id: " + id);
        }
        homeworkRepository.deleteById(id);
    }

    private Homework buildHomework(Homework hw, HomeworkDto dto) {
        hw.setTitle(dto.getTitle());
        hw.setSubject(dto.getSubject());
        hw.setDescription(dto.getDescription());
        hw.setDueDate(dto.getDueDate());
        if (dto.getCreatedBy() != null) {
            User teacher = userRepository.findById(dto.getCreatedBy())
                    .orElseThrow(() -> new RuntimeException("Teacher not found with id: " + dto.getCreatedBy()));
            hw.setCreatedBy(teacher);
        }
        return hw;
    }
}
