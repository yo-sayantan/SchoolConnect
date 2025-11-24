package com.schoolconnect.communicationservice.repository;

import com.schoolconnect.communicationservice.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByAskerIdOrderByCreatedAtDesc(Long askerId);

    List<Question> findByRecipientIdOrderByCreatedAtDesc(Long recipientId);

    List<Question> findByRecipientRoleOrderByCreatedAtDesc(String recipientRole);

    List<Question> findByRecipientRoleAndStatusOrderByCreatedAtDesc(String recipientRole,
            Question.QuestionStatus status);

    List<Question> findByAskerIdAndStatusOrderByCreatedAtDesc(Long askerId, Question.QuestionStatus status);

    List<Question> findByStatusOrderByPriorityDescCreatedAtDesc(Question.QuestionStatus status);
}
