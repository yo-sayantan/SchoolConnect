package com.schoolconnect.academicservice.config;

import com.schoolconnect.academicservice.model.*;
import com.schoolconnect.academicservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final SchoolClassRepository classRepository;
    private final SubjectRepository subjectRepository;
    private final SyllabusRepository syllabusRepository;
    private final AttendanceRepository attendanceRepository;
    private final MarksRepository marksRepository;

    @Override
    public void run(String... args) {
        if (classRepository.count() == 0) {
            log.info("Initializing academic demo data...");

            // Create Classes
            SchoolClass class10A = createClass("Class 10-A", "10", "A", 3L); // Teacher 1
            SchoolClass class10B = createClass("Class 10-B", "10", "B", 4L); // Teacher 2
            SchoolClass class9A = createClass("Class 9-A", "9", "A", 5L); // Teacher 3

            // Create Subjects
            Subject math = createSubject("Mathematics", "MATH101", "Advanced Mathematics for Grade 10", 3L);
            Subject science = createSubject("Science", "SCI101",
                    "General Science including Physics, Chemistry, Biology", 4L);
            Subject english = createSubject("English", "ENG101", "English Language and Literature", 5L);
            Subject history = createSubject("History", "HIST101", "World History and Civilization", 3L);
            Subject geography = createSubject("Geography", "GEO101", "Physical and Human Geography", 4L);

            // Create Syllabus
            createSyllabus(math.getId(), class10A.getId(), "Mathematics Syllabus - Term 1",
                    "Chapter 1: Real Numbers\nChapter 2: Polynomials\nChapter 3: Linear Equations\nChapter 4: Quadratic Equations\nChapter 5: Arithmetic Progressions");

            createSyllabus(science.getId(), class10A.getId(), "Science Syllabus - Term 1",
                    "Physics: Light, Electricity, Magnetic Effects\nChemistry: Chemical Reactions, Acids and Bases\nBiology: Life Processes, Control and Coordination");

            createSyllabus(english.getId(), class10A.getId(), "English Syllabus - Term 1",
                    "Literature: The Diary of a Young Girl, Romeo and Juliet\nGrammar: Tenses, Voice, Narration\nWriting: Essay, Letter, Article Writing");

            // Create Attendance Records (for students 9-13, last 5 days)
            createAttendanceRecords(class10A.getId());

            // Create Marks Records
            createMarksRecords(class10A.getId(), math.getId(), science.getId(), english.getId());

            log.info("Academic demo data initialized successfully!");
        }
    }

    private SchoolClass createClass(String name, String grade, String section, Long teacherId) {
        SchoolClass schoolClass = new SchoolClass();
        schoolClass.setName(name);
        schoolClass.setGrade(grade);
        schoolClass.setSection(section);
        schoolClass.setTeacherId(teacherId);
        schoolClass.setActive(true);
        SchoolClass saved = classRepository.save(schoolClass);
        log.info("Created class: {}", name);
        return saved;
    }

    private Subject createSubject(String name, String code, String description, Long teacherId) {
        Subject subject = new Subject();
        subject.setName(name);
        subject.setCode(code);
        subject.setDescription(description);
        subject.setTeacherId(teacherId);
        subject.setActive(true);
        Subject saved = subjectRepository.save(subject);
        log.info("Created subject: {}", name);
        return saved;
    }

    private void createSyllabus(Long subjectId, Long classId, String title, String content) {
        Syllabus syllabus = new Syllabus();
        syllabus.setSubjectId(subjectId);
        syllabus.setClassId(classId);
        syllabus.setTitle(title);
        syllabus.setContent(content);
        syllabus.setActive(true);
        syllabusRepository.save(syllabus);
        log.info("Created syllabus: {}", title);
    }

    private void createAttendanceRecords(Long classId) {
        Long[] studentIds = { 9L, 10L, 11L, 12L, 13L }; // Student IDs from auth service
        LocalDate today = LocalDate.now();

        for (int day = 0; day < 5; day++) {
            LocalDate date = today.minusDays(day);
            for (Long studentId : studentIds) {
                Attendance attendance = new Attendance();
                attendance.setStudentId(studentId);
                attendance.setClassId(classId);
                attendance.setDate(date);

                // Randomly assign attendance status (mostly present)
                if (studentId == 11L && day == 1) {
                    attendance.setStatus(Attendance.AttendanceStatus.ABSENT);
                    attendance.setRemarks("Sick leave");
                } else if (studentId == 12L && day == 3) {
                    attendance.setStatus(Attendance.AttendanceStatus.LATE);
                    attendance.setRemarks("Traffic delay");
                } else {
                    attendance.setStatus(Attendance.AttendanceStatus.PRESENT);
                }

                attendanceRepository.save(attendance);
            }
        }
        log.info("Created attendance records for last 5 days");
    }

    private void createMarksRecords(Long classId, Long mathId, Long scienceId, Long englishId) {
        Long[] studentIds = { 9L, 10L, 11L, 12L, 13L }; // Emma, Liam, Olivia, Noah, Ava
        String[] studentNames = { "Emma Anderson", "Liam Thompson", "Olivia Martinez", "Noah Garcia", "Ava Rodriguez" };

        // Mathematics marks
        int[] mathMarks = { 92, 88, 95, 85, 90 };
        for (int i = 0; i < studentIds.length; i++) {
            createMarks(studentIds[i], classId, mathId, "Mid-Term Exam", mathMarks[i], 100);
        }

        // Science marks
        int[] scienceMarks = { 88, 91, 87, 93, 89 };
        for (int i = 0; i < studentIds.length; i++) {
            createMarks(studentIds[i], classId, scienceId, "Mid-Term Exam", scienceMarks[i], 100);
        }

        // English marks
        int[] englishMarks = { 95, 87, 92, 88, 94 };
        for (int i = 0; i < studentIds.length; i++) {
            createMarks(studentIds[i], classId, englishId, "Mid-Term Exam", englishMarks[i], 100);
        }

        log.info("Created marks records for all students");
    }

    private void createMarks(Long studentId, Long classId, Long subjectId, String examName, int marksObtained,
            int totalMarks) {
        Marks marks = new Marks();
        marks.setStudentId(studentId);
        marks.setClassId(classId);
        marks.setSubjectId(subjectId);
        marks.setExamType(Marks.ExamType.HALF_TERM); // Defaulting to HALF_TERM for demo
        marks.setExamName(examName);
        marks.setMarksObtained((double) marksObtained);
        marks.setTotalMarks((double) totalMarks);
        marksRepository.save(marks);
    }
}
