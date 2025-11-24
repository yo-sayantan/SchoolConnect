package com.schoolconnect.academicservice.repository;

import com.schoolconnect.academicservice.model.Syllabus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SyllabusRepository extends JpaRepository<Syllabus, Long> {
    List<Syllabus> findBySubjectId(Long subjectId);

    List<Syllabus> findByClassId(Long classId);

    List<Syllabus> findByActive(Boolean active);
}
