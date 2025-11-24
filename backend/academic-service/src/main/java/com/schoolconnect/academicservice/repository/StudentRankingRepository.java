package com.schoolconnect.academicservice.repository;

import com.schoolconnect.academicservice.model.StudentRanking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRankingRepository extends JpaRepository<StudentRanking, Long> {

    List<StudentRanking> findByClassIdAndExamTypeAndTermOrderByRankAsc(
            Long classId,
            com.schoolconnect.academicservice.model.Marks.ExamType examType,
            com.schoolconnect.academicservice.model.Marks.Term term);

    Optional<StudentRanking> findByStudentIdAndClassIdAndExamTypeAndTerm(
            Long studentId,
            Long classId,
            com.schoolconnect.academicservice.model.Marks.ExamType examType,
            com.schoolconnect.academicservice.model.Marks.Term term);

    List<StudentRanking> findByStudentIdOrderByGeneratedAtDesc(Long studentId);

    List<StudentRanking> findByClassIdOrderByGeneratedAtDesc(Long classId);
}
