package com.school.backend.config;

import com.school.backend.model.*;
import com.school.backend.repository.*;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.List;

/**
 * DataSeeder — runs on every startup but is fully idempotent.
 * Each user is checked by email, each student by studentId.
 * Transactional data (attendance, homework, behavior) is only inserted
 * once per student, checked individually before each insert.
 */
@Configuration
public class DataSeeder {

    @Bean
    public ApplicationRunner seedDatabase(
            UserRepository userRepo,
            StudentRepository studentRepo,
            AttendanceRepository attendanceRepo,
            HomeworkRepository homeworkRepo,
            HomeworkSubmissionRepository submissionRepo,
            BehaviorRecordRepository behaviorRepo,
            PasswordEncoder encoder) {

        return args -> {

            // ── USERS ──────────────────────────────────────────────────────────
            User admin1   = ensureUser(userRepo, "samuel.mensah@school.com",
                    "Samuel Mensah",   "Admin@1234",  User.Role.admin,   encoder);
            User admin2   = ensureUser(userRepo, "grace.osei@school.com",
                    "Grace Osei",      "Admin@5678",  User.Role.admin,   encoder);
            User teacher1 = ensureUser(userRepo, "kwame.asante@school.com",
                    "Kwame Asante",    "Teach@1234",  User.Role.teacher, encoder);
            User teacher2 = ensureUser(userRepo, "abena.frimpong@school.com",
                    "Abena Frimpong",  "Teach@5678",  User.Role.teacher, encoder);
            User teacher3 = ensureUser(userRepo, "kofi.boateng@school.com",
                    "Kofi Boateng",    "Teach@9012",  User.Role.teacher, encoder);

            // ── STUDENTS ───────────────────────────────────────────────────────
            Student st1 = ensureStudent(studentRepo, "STU001", "Ama Darko",     "Grade 6A", 12, "0241001001");
            Student st2 = ensureStudent(studentRepo, "STU002", "Kweku Nkrumah", "Grade 6A", 11, "0241002002");
            Student st3 = ensureStudent(studentRepo, "STU003", "Efua Quarshie", "Grade 5B", 10, "0241003003");
            Student st4 = ensureStudent(studentRepo, "STU004", "Yaw Poku",      "Grade 5B", 11, "0241004004");
            Student st5 = ensureStudent(studentRepo, "STU005", "Akosua Tetteh", "Grade 7C", 13, "0241005005");

            LocalDate today = LocalDate.now();

            // ── ATTENDANCE — one per student per day, skip if already present ──
            List<Student> allStudents = List.of(st1, st2, st3, st4, st5);
            Attendance.Status[][] statusGrid = {
                // today
                { Attendance.Status.present, Attendance.Status.absent,  Attendance.Status.late,
                  Attendance.Status.present, Attendance.Status.present },
                // yesterday
                { Attendance.Status.present, Attendance.Status.present, Attendance.Status.absent,
                  Attendance.Status.late,    Attendance.Status.present },
                // 2 days ago
                { Attendance.Status.present, Attendance.Status.present, Attendance.Status.present,
                  Attendance.Status.absent,  Attendance.Status.late },
                // 3 days ago
                { Attendance.Status.late,    Attendance.Status.present, Attendance.Status.present,
                  Attendance.Status.present, Attendance.Status.absent },
                // 4 days ago
                { Attendance.Status.present, Attendance.Status.absent,  Attendance.Status.present,
                  Attendance.Status.present, Attendance.Status.present },
                // 5 days ago
                { Attendance.Status.present, Attendance.Status.present, Attendance.Status.present,
                  Attendance.Status.present, Attendance.Status.present },
                // 6 days ago
                { Attendance.Status.absent,  Attendance.Status.present, Attendance.Status.late,
                  Attendance.Status.present, Attendance.Status.present },
                // 7 days ago
                { Attendance.Status.present, Attendance.Status.present, Attendance.Status.present,
                  Attendance.Status.absent,  Attendance.Status.present },
                // 8 days ago
                { Attendance.Status.present, Attendance.Status.late,    Attendance.Status.present,
                  Attendance.Status.present, Attendance.Status.present },
                // 9 days ago
                { Attendance.Status.present, Attendance.Status.present, Attendance.Status.absent,
                  Attendance.Status.present, Attendance.Status.late },
                // 10 days ago
                { Attendance.Status.present, Attendance.Status.present, Attendance.Status.present,
                  Attendance.Status.present, Attendance.Status.present },
                // 11 days ago
                { Attendance.Status.late,    Attendance.Status.absent,  Attendance.Status.present,
                  Attendance.Status.present, Attendance.Status.present },
                // 12 days ago
                { Attendance.Status.present, Attendance.Status.present, Attendance.Status.present,
                  Attendance.Status.absent,  Attendance.Status.present },
                // 13 days ago
                { Attendance.Status.present, Attendance.Status.present, Attendance.Status.late,
                  Attendance.Status.present, Attendance.Status.present }
            };

            for (int dayOffset = 0; dayOffset < statusGrid.length; dayOffset++) {
                LocalDate date = today.minusDays(dayOffset);
                for (int s = 0; s < allStudents.size(); s++) {
                    Student student = allStudents.get(s);
                    boolean exists = attendanceRepo.findByStudentId(student.getId())
                            .stream().anyMatch(a -> a.getDate().equals(date));
                    if (!exists) {
                        attendanceRepo.save(makeAttendance(student, date, statusGrid[dayOffset][s]));
                    }
                }
            }

            // ── HOMEWORK ───────────────────────────────────────────────────────
            Homework hw1 = ensureHomework(homeworkRepo, "Algebra Worksheet",
                    "Mathematics", "Solve exercises 1–20 on page 45.",
                    today.plusDays(3),  teacher1);
            Homework hw2 = ensureHomework(homeworkRepo, "Essay: My Hero",
                    "English", "Write a 300-word essay about your personal hero.",
                    today.plusDays(5),  teacher2);
            Homework hw3 = ensureHomework(homeworkRepo, "Water Cycle Diagram",
                    "Science", "Draw and label the water cycle with at least 6 stages.",
                    today.plusDays(2),  teacher3);
            Homework hw4 = ensureHomework(homeworkRepo, "Map of Africa",
                    "Geography", "Draw and label all 54 African countries.",
                    today.plusDays(7),  teacher1);
            Homework hw5 = ensureHomework(homeworkRepo, "Fractions Practice",
                    "Mathematics", "Complete fractions worksheet pages 12–14.",
                    today.plusDays(4),  teacher2);

            // ── HOMEWORK SUBMISSIONS ───────────────────────────────────────────
            List<Homework> allHW = List.of(hw1, hw2, hw3, hw4, hw5);
            HomeworkSubmission.Status[][] subGrid = {
                //  st1          st2          st3           st4           st5
                { HomeworkSubmission.Status.submitted, HomeworkSubmission.Status.missing,
                  HomeworkSubmission.Status.submitted, HomeworkSubmission.Status.submitted,
                  HomeworkSubmission.Status.missing   },
                { HomeworkSubmission.Status.submitted, HomeworkSubmission.Status.submitted,
                  HomeworkSubmission.Status.missing,   HomeworkSubmission.Status.missing,
                  HomeworkSubmission.Status.submitted  },
                { HomeworkSubmission.Status.submitted, HomeworkSubmission.Status.submitted,
                  HomeworkSubmission.Status.submitted, HomeworkSubmission.Status.missing,
                  HomeworkSubmission.Status.submitted  },
                { HomeworkSubmission.Status.missing,   HomeworkSubmission.Status.submitted,
                  HomeworkSubmission.Status.submitted, HomeworkSubmission.Status.submitted,
                  HomeworkSubmission.Status.submitted  },
                { HomeworkSubmission.Status.submitted, HomeworkSubmission.Status.missing,
                  HomeworkSubmission.Status.missing,   HomeworkSubmission.Status.submitted,
                  HomeworkSubmission.Status.submitted  }
            };

            for (int h = 0; h < allHW.size(); h++) {
                Homework hw = allHW.get(h);
                for (int s = 0; s < allStudents.size(); s++) {
                    Student student = allStudents.get(s);
                    boolean exists = submissionRepo.findByStudentId(student.getId())
                            .stream().anyMatch(sub -> sub.getHomework().getId().equals(hw.getId()));
                    if (!exists) {
                        submissionRepo.save(makeSubmission(hw, student, subGrid[h][s]));
                    }
                }
            }

            // ── BEHAVIOR RECORDS ───────────────────────────────────────────────
            ensureBehavior(behaviorRepo, st1, today,               BehaviorRecord.BehaviorType.excellent,
                    "Top of the class in today's quiz.", teacher1);
            ensureBehavior(behaviorRepo, st2, today,               BehaviorRecord.BehaviorType.warning,
                    "Disrupted class twice during the lesson.", teacher1);
            ensureBehavior(behaviorRepo, st3, today.minusDays(1),  BehaviorRecord.BehaviorType.good,
                    "Helped a classmate with their assignment.", teacher2);
            ensureBehavior(behaviorRepo, st4, today.minusDays(1),  BehaviorRecord.BehaviorType.misconduct,
                    "Found with phone during an exam — confiscated.", teacher2);
            ensureBehavior(behaviorRepo, st5, today.minusDays(2),  BehaviorRecord.BehaviorType.excellent,
                    "Represented the school at the regional science fair.", teacher3);
            ensureBehavior(behaviorRepo, st2, today.minusDays(2),  BehaviorRecord.BehaviorType.good,
                    "Volunteered to clean up the classroom after school.", teacher3);
            ensureBehavior(behaviorRepo, st1, today.minusDays(3),  BehaviorRecord.BehaviorType.good,
                    "Submitted homework early with extra work included.", teacher1);
            ensureBehavior(behaviorRepo, st4, today.minusDays(3),  BehaviorRecord.BehaviorType.warning,
                    "Late to class three times this week without a valid reason.", teacher2);
            ensureBehavior(behaviorRepo, st3, today.minusDays(5),  BehaviorRecord.BehaviorType.excellent,
                    "Perfect score on the surprise maths test.", teacher1);
            ensureBehavior(behaviorRepo, st5, today.minusDays(6),  BehaviorRecord.BehaviorType.warning,
                    "Rude response to a teacher's correction.", teacher3);
            ensureBehavior(behaviorRepo, st1, today.minusDays(7),  BehaviorRecord.BehaviorType.good,
                    "Led the class discussion very effectively.", teacher2);
            ensureBehavior(behaviorRepo, st2, today.minusDays(8),  BehaviorRecord.BehaviorType.misconduct,
                    "Got into a minor physical altercation with a classmate.", teacher1);

            System.out.println("\n╔══════════════════════════════════════════════════╗");
            System.out.println("║           SCHOOL BACKEND — TEST ACCOUNTS          ║");
            System.out.println("╠══════════════════════════════════════════════════╣");
            System.out.println("║ ADMINS                                            ║");
            System.out.println("║  samuel.mensah@school.com   → Admin@1234          ║");
            System.out.println("║  grace.osei@school.com      → Admin@5678          ║");
            System.out.println("║ TEACHERS                                          ║");
            System.out.println("║  kwame.asante@school.com    → Teach@1234          ║");
            System.out.println("║  abena.frimpong@school.com  → Teach@5678          ║");
            System.out.println("║  kofi.boateng@school.com    → Teach@9012          ║");
            System.out.println("╚══════════════════════════════════════════════════╝\n");
        };
    }

    // ── Idempotent helpers ────────────────────────────────────────────────────

    private User ensureUser(UserRepository repo, String email, String name,
                             String rawPassword, User.Role role, PasswordEncoder encoder) {
        return repo.findByEmail(email).orElseGet(() -> {
            User u = new User();
            u.setEmail(email);
            u.setName(name);
            u.setPassword(encoder.encode(rawPassword));
            u.setRole(role);
            return repo.save(u);
        });
    }

    private Student ensureStudent(StudentRepository repo, String studentId, String name,
                                   String className, int age, String contact) {
        return repo.findByStudentId(studentId).orElseGet(() -> {
            Student s = new Student();
            s.setStudentId(studentId);
            s.setName(name);
            s.setClassName(className);
            s.setAge(age);
            s.setParentContact(contact);
            return repo.save(s);
        });
    }

    private Homework ensureHomework(HomeworkRepository repo, String title, String subject,
                                     String desc, LocalDate due, User teacher) {
        return repo.findAll().stream()
                .filter(h -> h.getTitle().equals(title))
                .findFirst()
                .orElseGet(() -> {
                    Homework h = new Homework();
                    h.setTitle(title);
                    h.setSubject(subject);
                    h.setDescription(desc);
                    h.setDueDate(due);
                    h.setCreatedBy(teacher);
                    return repo.save(h);
                });
    }

    private void ensureBehavior(BehaviorRecordRepository repo, Student student, LocalDate date,
                                  BehaviorRecord.BehaviorType type, String note, User teacher) {
        boolean exists = repo.findByStudentId(student.getId())
                .stream().anyMatch(b -> b.getDate().equals(date) && b.getBehaviorType() == type);
        if (!exists) {
            BehaviorRecord r = new BehaviorRecord();
            r.setStudent(student);
            r.setDate(date);
            r.setBehaviorType(type);
            r.setNote(note);
            r.setRecordedBy(teacher);
            repo.save(r);
        }
    }

    private Attendance makeAttendance(Student student, LocalDate date, Attendance.Status status) {
        Attendance a = new Attendance();
        a.setStudent(student);
        a.setDate(date);
        a.setStatus(status);
        return a;
    }

    private HomeworkSubmission makeSubmission(Homework hw, Student st,
                                               HomeworkSubmission.Status status) {
        HomeworkSubmission sub = new HomeworkSubmission();
        sub.setHomework(hw);
        sub.setStudent(st);
        sub.setStatus(status);
        return sub;
    }
}
