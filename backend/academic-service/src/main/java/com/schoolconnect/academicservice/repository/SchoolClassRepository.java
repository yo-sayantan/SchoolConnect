package com.schoolconnect.academicservice.repository;

import com.schoolconnect.academicservice.model.SchoolClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {
    List<SchoolClass> findByGrade(String grade);

    List<SchoolClass> findByTeacherId(Long teacherId);

    List<SchoolClass> findByActive(Boolean active);
}
