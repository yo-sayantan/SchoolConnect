package com.schoolconnect.communicationservice.repository;

import com.schoolconnect.communicationservice.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findByTargetAudience(Notice.TargetAudience targetAudience);

    List<Notice> findByActive(Boolean active);

    List<Notice> findByActiveTrue();

    List<Notice> findByAuthorId(Long authorId);
}
