import random
import datetime
from datetime import timedelta

# Configuration
NUM_STUDENTS = 50
NUM_TEACHERS = 5
CLASSES = ["10-A", "10-B", "11-A", "11-B", "12-A"]
SUBJECTS = [
    (1, "Mathematics", "MATH101"),
    (2, "Science", "SCI101"),
    (3, "English", "ENG101"),
    (4, "History", "HIST101"),
    (5, "Computer Science", "CS101")
]
START_DATE = datetime.date(2024, 1, 1)
END_DATE = datetime.date(2024, 11, 28)

def generate_sql():
    sql = []
    
    sql.append("-- SchoolConnect Comprehensive SQL Dump")
    sql.append(f"-- Generated on {datetime.datetime.now()}")
    sql.append("SET FOREIGN_KEY_CHECKS = 0;")
    sql.append("")

    # ==========================================
    # DATABASE: schoolconnect_auth
    # ==========================================
    sql.append("-- ==========================================")
    sql.append("-- DATABASE: schoolconnect_auth")
    sql.append("-- ==========================================")
    sql.append("CREATE DATABASE IF NOT EXISTS schoolconnect_auth;")
    sql.append("USE schoolconnect_auth;")
    
    # Table: users
    sql.append("DROP TABLE IF EXISTS users;")
    sql.append("""CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    id_card_front_url VARCHAR(255),
    id_card_back_url VARCHAR(255),
    linked_student_ids TEXT,
    address VARCHAR(255),
    date_of_birth VARCHAR(255),
    guardian_name VARCHAR(255),
    emergency_contact VARCHAR(255),
    approved_by BIGINT,
    approved_at DATETIME,
    created_at DATETIME,
    updated_at DATETIME
);""")

    # Table: otps
    sql.append("DROP TABLE IF EXISTS otps;")
    sql.append("""CREATE TABLE otps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL,
    otp_code VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME
);""")

    # Table: registration_requests
    sql.append("DROP TABLE IF EXISTS registration_requests;")
    sql.append("""CREATE TABLE registration_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_card_front_url VARCHAR(255),
    id_card_back_url VARCHAR(255),
    linked_student_ids TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    reviewed_by BIGINT,
    reviewed_at DATETIME,
    review_notes VARCHAR(255),
    address VARCHAR(255),
    date_of_birth VARCHAR(255),
    guardian_name VARCHAR(255),
    emergency_contact VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
);""")

    # ==========================================
    # DATABASE: schoolconnect_academic
    # ==========================================
    sql.append("")
    sql.append("-- ==========================================")
    sql.append("-- DATABASE: schoolconnect_academic")
    sql.append("-- ==========================================")
    sql.append("CREATE DATABASE IF NOT EXISTS schoolconnect_academic;")
    sql.append("USE schoolconnect_academic;")

    # Table: classes
    sql.append("DROP TABLE IF EXISTS classes;")
    sql.append("""CREATE TABLE classes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    grade VARCHAR(50) NOT NULL,
    section VARCHAR(50),
    teacher_id BIGINT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME,
    updated_at DATETIME
);""")

    # Table: subjects
    sql.append("DROP TABLE IF EXISTS subjects;")
    sql.append("""CREATE TABLE subjects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    teacher_id BIGINT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME,
    updated_at DATETIME
);""")

    # Table: marks
    sql.append("DROP TABLE IF EXISTS marks;")
    sql.append("""CREATE TABLE marks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    class_id BIGINT NOT NULL,
    exam_type VARCHAR(50) NOT NULL,
    term VARCHAR(50),
    exam_name VARCHAR(255),
    marks_obtained DOUBLE NOT NULL,
    total_marks DOUBLE NOT NULL,
    percentage DOUBLE,
    grade VARCHAR(10),
    remarks VARCHAR(255),
    exam_date DATE,
    created_at DATETIME,
    updated_at DATETIME
);""")

    # Table: attendance
    sql.append("DROP TABLE IF EXISTS attendance;")
    sql.append("""CREATE TABLE attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT,
    class_id BIGINT,
    date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    remarks VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
);""")

    # Table: syllabus
    sql.append("DROP TABLE IF EXISTS syllabus;")
    sql.append("""CREATE TABLE syllabus (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject_id BIGINT,
    class_id BIGINT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    file_url VARCHAR(255),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME,
    updated_at DATETIME
);""")

    # Table: subject_high_scores
    sql.append("DROP TABLE IF EXISTS subject_high_scores;")
    sql.append("""CREATE TABLE subject_high_scores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject_id BIGINT NOT NULL UNIQUE,
    student_id BIGINT NOT NULL,
    student_name VARCHAR(255),
    highest_marks DOUBLE NOT NULL,
    total_marks DOUBLE NOT NULL,
    percentage DOUBLE NOT NULL,
    exam_type VARCHAR(50),
    term VARCHAR(50),
    exam_name VARCHAR(255),
    achieved_date DATE,
    created_at DATETIME,
    updated_at DATETIME
);""")

    # Table: student_rankings
    sql.append("DROP TABLE IF EXISTS student_rankings;")
    sql.append("""CREATE TABLE student_rankings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    class_id BIGINT NOT NULL,
    exam_type VARCHAR(50) NOT NULL,
    term VARCHAR(50),
    exam_name VARCHAR(255),
    total_marks_obtained DOUBLE NOT NULL,
    total_possible_marks DOUBLE NOT NULL,
    percentage DOUBLE NOT NULL,
    rank INT NOT NULL,
    subject_breakdown TEXT,
    generated_at DATETIME
);""")

    # ==========================================
    # DATABASE: schoolconnect_communication
    # ==========================================
    sql.append("")
    sql.append("-- ==========================================")
    sql.append("-- DATABASE: schoolconnect_communication")
    sql.append("-- ==========================================")
    sql.append("CREATE DATABASE IF NOT EXISTS schoolconnect_communication;")
    sql.append("USE schoolconnect_communication;")

    # Table: notices
    sql.append("DROP TABLE IF EXISTS notices;")
    sql.append("""CREATE TABLE notices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id BIGINT,
    target_audience VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    remarks VARCHAR(255),
    archive_date DATE,
    created_at DATETIME,
    updated_at DATETIME
);""")

    # Table: notifications
    sql.append("DROP TABLE IF EXISTS notifications;")
    sql.append("""CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    email_sent BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME
);""")

    # Table: questions
    sql.append("DROP TABLE IF EXISTS questions;")
    sql.append("""CREATE TABLE questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    asker_id BIGINT NOT NULL,
    asker_role VARCHAR(50) NOT NULL,
    asker_name VARCHAR(255),
    recipient_id BIGINT,
    recipient_role VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    question_text TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    priority VARCHAR(50) DEFAULT 'MEDIUM',
    created_at DATETIME,
    updated_at DATETIME
);""")

    # Table: answers
    sql.append("DROP TABLE IF EXISTS answers;")
    sql.append("""CREATE TABLE answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_id BIGINT NOT NULL,
    answerer_id BIGINT NOT NULL,
    answerer_name VARCHAR(255) NOT NULL,
    answerer_role VARCHAR(50) NOT NULL,
    answer_text TEXT NOT NULL,
    created_at DATETIME
);""")

    # ==========================================
    # DATABASE: schoolconnect_calendar
    # ==========================================
    sql.append("")
    sql.append("-- ==========================================")
    sql.append("-- DATABASE: schoolconnect_calendar")
    sql.append("-- ==========================================")
    sql.append("CREATE DATABASE IF NOT EXISTS schoolconnect_calendar;")
    sql.append("USE schoolconnect_calendar;")

    # Table: events
    sql.append("DROP TABLE IF EXISTS events;")
    sql.append("""CREATE TABLE events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    location VARCHAR(255),
    meeting_link VARCHAR(255),
    target_audience VARCHAR(50),
    class_id BIGINT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME,
    updated_at DATETIME
);""")

    sql.append("SET FOREIGN_KEY_CHECKS = 1;")
    sql.append("")

    # ==========================================
    # SEED DATA
    # ==========================================
    
    # --- Auth Data ---
    sql.append("USE schoolconnect_auth;")
    users = []
    # Admin
    users.append("(1, 'Admin User', 'admin@school.com', '$2a$10$wPHxwfsfTnOJAdgYcerBt.utdAvC2431/9.e.z.q.w.t.y.u.i.o.p', '1234567890', 'ADMIN', 1, 1, NULL, NULL, NULL, '123 Admin St', '1980-01-01', NULL, NULL, NULL, NOW(), NOW(), NOW())")
    # Headmaster
    users.append("(2, 'Headmaster', 'headmaster@school.com', '$2a$10$wPHxwfsfTnOJAdgYcerBt.utdAvC2431/9.e.z.q.w.t.y.u.i.o.p', '1234567891', 'ADMIN_ASSISTANT', 1, 1, NULL, NULL, NULL, '456 School Ln', '1975-05-15', NULL, NULL, NULL, NOW(), NOW(), NOW())")
    
    # Teachers (IDs 3-7)
    for i in range(1, NUM_TEACHERS + 1):
        users.append(f"({2 + i}, 'Teacher {i}', 'teacher{i}@school.com', '$2a$10$wPHxwfsfTnOJAdgYcerBt.utdAvC2431/9.e.z.q.w.t.y.u.i.o.p', '98765432{i:02d}', 'TEACHER', 1, 1, NULL, NULL, NULL, 'Teacher Addr {i}', '1985-01-01', NULL, NULL, 1, NOW(), NOW(), NOW())")
    
    # Students (IDs 11-60) & Parents (IDs 101-150)
    student_ids = []
    for i in range(1, NUM_STUDENTS + 1):
        s_id = 10 + i
        p_id = 100 + i
        student_ids.append(s_id)
        
        # Student
        users.append(f"({s_id}, 'Student {i}', 'student{i}@school.com', '$2a$10$wPHxwfsfTnOJAdgYcerBt.utdAvC2431/9.e.z.q.w.t.y.u.i.o.p', '90000000{i:02d}', 'STUDENT', 1, 1, NULL, NULL, NULL, 'Student Addr {i}', '2008-01-01', 'Parent {i}', '80000000{i:02d}', 1, NOW(), NOW(), NOW())")
        # Parent
        users.append(f"({p_id}, 'Parent {i}', 'parent{i}@school.com', '$2a$10$wPHxwfsfTnOJAdgYcerBt.utdAvC2431/9.e.z.q.w.t.y.u.i.o.p', '80000000{i:02d}', 'PARENT', 1, 1, NULL, NULL, '{s_id}', 'Student Addr {i}', '1980-01-01', NULL, NULL, 1, NOW(), NOW(), NOW())")

    sql.append("INSERT INTO users (id, name, email, password, phone_number, role, active, verified, id_card_front_url, id_card_back_url, linked_student_ids, address, date_of_birth, guardian_name, emergency_contact, approved_by, approved_at, created_at, updated_at) VALUES")
    sql.append(",\n".join(users) + ";")
    sql.append("")

    # --- Academic Data ---
    sql.append("USE schoolconnect_academic;")
    
    # Classes
    class_values = []
    for i, cls_name in enumerate(CLASSES):
        grade = cls_name.split("-")[0]
        section = cls_name.split("-")[1]
        teacher_id = 3 + (i % NUM_TEACHERS) # Assign teachers cyclically
        class_values.append(f"({i+1}, '{cls_name}', '{grade}', '{section}', {teacher_id}, 1, NOW(), NOW())")
    sql.append("INSERT INTO classes (id, name, grade, section, teacher_id, active, created_at, updated_at) VALUES")
    sql.append(",\n".join(class_values) + ";")
    sql.append("")

    # Subjects
    subject_values = []
    for i, (sub_id, sub_name, sub_code) in enumerate(SUBJECTS):
        teacher_id = 3 + (i % NUM_TEACHERS)
        subject_values.append(f"({sub_id}, '{sub_name}', '{sub_code}', 'Description for {sub_name}', {teacher_id}, 1, NOW(), NOW())")
    sql.append("INSERT INTO subjects (id, name, code, description, teacher_id, active, created_at, updated_at) VALUES")
    sql.append(",\n".join(subject_values) + ";")
    sql.append("")

    # Marks
    marks_entries = []
    exam_types = ["HALF_TERM", "FULL_TERM"]
    terms = ["TERM_1", "TERM_2"]
    
    for s_id in student_ids:
        class_id = random.randint(1, len(CLASSES))
        for term in terms:
            for exam in exam_types:
                for sub_id, sub_name, sub_code in SUBJECTS:
                    score = random.uniform(40, 100)
                    exam_date = START_DATE + timedelta(days=random.randint(50, 200))
                    marks_entries.append(f"(NULL, {s_id}, {sub_id}, {class_id}, '{exam}', '{term}', '{exam} {term}', {score:.2f}, 100, {score:.2f}, '{'A' if score > 90 else 'B'}', '{'Excellent' if score > 90 else 'Good'}', '{exam_date}', NOW(), NOW())")

    sql.append("INSERT INTO marks (id, student_id, subject_id, class_id, exam_type, term, exam_name, marks_obtained, total_marks, percentage, grade, remarks, exam_date, created_at, updated_at) VALUES")
    chunk_size = 1000
    for i in range(0, len(marks_entries), chunk_size):
        chunk = marks_entries[i:i + chunk_size]
    sql.append("-- Assignments")
    assignment_entries = []
    # Assuming Class IDs 1, 2, 3 exist (Grade 10-A, 10-B, 9-A)
    # Subjects: 1=Math, 2=Science, 3=English, 4=History
    assignments_data = [
        ("Algebra Quiz 1", 1, "2025-11-30", "PENDING", "HIGH"),
        ("Physics Lab Report", 2, "2025-12-05", "PENDING", "NORMAL"),
        ("Essay on Shakespeare", 3, "2025-11-28", "COMPLETED", "NORMAL"),
        ("History Project", 4, "2025-12-10", "IN_PROGRESS", "HIGH"),
    ]
    for i, (title, subject_id, due_date, status, priority) in enumerate(assignments_data, 1):
        assignment_entries.append(f"(NULL, '{title}', {subject_id}, {random.randint(1, len(CLASSES))}, '{due_date}', '{status}', '{priority}', NOW(), NOW())")
    sql.append("INSERT INTO assignments (id, title, subject_id, class_id, due_date, status, priority, created_at, updated_at) VALUES")
    sql.append(",\n".join(assignment_entries) + ";")
    sql.append("")

    # Attendance
    attendance_entries = []
    current = START_DATE
    while current <= END_DATE:
        if current.weekday() < 5: # Weekdays only
            for s_id in student_ids:
                status = "PRESENT"
                roll = random.random()
                if roll > 0.95: status = "ABSENT"
                elif roll > 0.90: status = "LATE"
                
                attendance_entries.append(f"(NULL, {s_id}, {random.randint(1, len(CLASSES))}, '{current}', '{status}', '', NOW(), NOW())")
        current += timedelta(days=1)

    for i in range(0, len(attendance_entries), chunk_size):
        sql.append("INSERT INTO attendance (id, student_id, class_id, date, status, remarks, created_at, updated_at) VALUES")
        chunk = attendance_entries[i:i + chunk_size]
        sql.append(",\n".join(chunk) + ";")
    sql.append("")

    # Syllabus
    syllabus_entries = []
    for i, (sub_id, sub_name, sub_code) in enumerate(SUBJECTS):
        for cls_id in range(1, len(CLASSES) + 1):
            syllabus_entries.append(f"(NULL, {sub_id}, {cls_id}, '{sub_name} Syllabus for Class {cls_id}', 'Topics: Chapter 1, Chapter 2...', 'http://example.com/syllabus.pdf', 1, NOW(), NOW())")
    sql.append("INSERT INTO syllabus (id, subject_id, class_id, title, content, file_url, active, created_at, updated_at) VALUES")
    sql.append(",\n".join(syllabus_entries) + ";")
    sql.append("")

    # --- Communication Data ---
    sql.append("USE schoolconnect_communication;")
    
    # Notices
    notices = []
    titles = ["Annual Sports Day", "Parent Teacher Meeting", "Exam Schedule Released", "Holiday Announcement", "Science Fair Registration"]
    audiences = ["ALL", "PARENTS", "STUDENTS", "ALL", "STUDENTS"]
    
    for i in range(5):
        date = START_DATE + timedelta(days=random.randint(0, 300))
        notices.append(f"(NULL, '{titles[i]}', 'This is a detailed description for {titles[i]}. Please attend.', 2, '{audiences[i]}', 1, 'General Remarks', '{date + timedelta(days=30)}', '{date} 10:00:00', '{date} 10:00:00')")
    
    sql.append("INSERT INTO notices (id, title, content, author_id, target_audience, active, remarks, archive_date, created_at, updated_at) VALUES")
    sql.append(",\n".join(notices) + ";")
    sql.append("")

    # Questions
    questions = []
    for i in range(10):
        s_id = 10 + random.randint(1, NUM_STUDENTS)
        questions.append(f"(NULL, {s_id}, 'STUDENT', 'Student {s_id-10}', NULL, 'TEACHER', 'Mathematics', 'I have a doubt in Algebra.', 'PENDING', 'MEDIUM', NOW(), NOW())")
    sql.append("INSERT INTO questions (id, asker_id, asker_role, asker_name, recipient_id, recipient_role, subject, question_text, status, priority, created_at, updated_at) VALUES")
    sql.append(",\n".join(questions) + ";")
    sql.append("")

    # --- Calendar Data ---
    sql.append("USE schoolconnect_calendar;")
    
    # Events
    events = []
    event_titles = ["Math Exam", "Science Fair", "Football Match", "Music Concert", "PTM"]
    event_types = ["EXAM", "CULTURAL", "SPORTS", "CULTURAL", "PARENT_TEACHER_MEETING"]
    
    for i in range(5):
        start = START_DATE + timedelta(days=random.randint(10, 300))
        end = start + timedelta(hours=2)
        events.append(f"(NULL, '{event_titles[i]}', 'Description for {event_titles[i]}', '{event_types[i]}', '{start} 09:00:00', '{end} 11:00:00', 'School Hall', NULL, 'ALL', NULL, 1, NOW(), NOW())")
    
    sql.append("INSERT INTO events (id, title, description, type, start_time, end_time, location, meeting_link, target_audience, class_id, active, created_at, updated_at) VALUES")
    sql.append(",\n".join(events) + ";")
    sql.append("")

    return "\n".join(sql)

if __name__ == "__main__":
    with open("seed.sql", "w") as f:
        f.write(generate_sql())
    print("seed.sql generated successfully!")
