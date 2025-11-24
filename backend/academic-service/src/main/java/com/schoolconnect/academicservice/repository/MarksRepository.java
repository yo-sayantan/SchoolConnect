package com.schoolconnect.academicservice.repository;

import com.schoolconnect.academicservice.model.Marks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarksRepository extends JpaRepository<Marks, Long> {
    List<Marks> findByStudentId(Long studentId);

    List<Marks> findByClassId(Long classId);

    List<Marks> findBySubjectId(Long subjectId);

    List<Marks> findByStudentIdAndSubjectId(Long studentId, Long subjectId);
}
