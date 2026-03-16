-- =============================================
-- Student Behavior & Progress Management System
-- Database Schema
-- =============================================

CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL,
    email       VARCHAR(150)  NOT NULL UNIQUE,
    password    VARCHAR(255)  NOT NULL,
    role        ENUM('admin','teacher') NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. STUDENTS
CREATE TABLE IF NOT EXISTS students (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id      VARCHAR(50)  NOT NULL UNIQUE,
    name            VARCHAR(100) NOT NULL,
    class_name      VARCHAR(50),
    age             INT,
    parent_contact  VARCHAR(20),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. ATTENDANCE
CREATE TABLE IF NOT EXISTS attendance (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id  BIGINT NOT NULL,
    date        DATE   NOT NULL,
    status      ENUM('present','absent','late') NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 4. HOMEWORK
CREATE TABLE IF NOT EXISTS homework (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    subject     VARCHAR(100),
    description TEXT,
    due_date    DATE,
    created_by  BIGINT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 5. HOMEWORK SUBMISSIONS
CREATE TABLE IF NOT EXISTS homework_submissions (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    homework_id BIGINT NOT NULL,
    student_id  BIGINT NOT NULL,
    status      ENUM('submitted','missing') NOT NULL DEFAULT 'missing',
    FOREIGN KEY (homework_id) REFERENCES homework(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id)  REFERENCES students(id) ON DELETE CASCADE
);

-- 6. BEHAVIOR RECORDS
CREATE TABLE IF NOT EXISTS behavior_records (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id     BIGINT NOT NULL,
    date           DATE   NOT NULL,
    behavior_type  ENUM('good','warning','misconduct','excellent') NOT NULL,
    note           TEXT,
    recorded_by    BIGINT,
    FOREIGN KEY (student_id)  REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by) REFERENCES users(id)    ON DELETE SET NULL
);
