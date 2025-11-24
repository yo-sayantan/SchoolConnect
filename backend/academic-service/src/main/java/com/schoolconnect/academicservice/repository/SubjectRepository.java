package com.schoolconnect.academicservice.repository;

import com.schoolconnect.academicservice.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findByTeacherId(Long teacherId);

    List<Subject> findByActive(Boolean active);
}
