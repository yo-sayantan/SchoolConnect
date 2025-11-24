package com.schoolconnect.academicservice.repository;

import com.schoolconnect.academicservice.model.SubjectHighScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectHighScoreRepository extends JpaRepository<SubjectHighScore, Long> {

    Optional<SubjectHighScore> findBySubjectId(Long subjectId);

    List<SubjectHighScore> findAllByOrderByPercentageDesc();
}
