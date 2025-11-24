package com.schoolconnect.communicationservice.repository;

import com.schoolconnect.communicationservice.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    List<Answer> findByQuestionIdOrderByCreatedAtAsc(Long questionId);

    List<Answer> findByAnswererIdOrderByCreatedAtDesc(Long answererId);
}
