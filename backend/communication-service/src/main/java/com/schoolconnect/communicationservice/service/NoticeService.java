package com.schoolconnect.communicationservice.service;

import com.schoolconnect.communicationservice.model.Notice;
import com.schoolconnect.communicationservice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    public List<Notice> getActiveNotices() {
        return noticeRepository.findByActiveTrue();
    }

    public Optional<Notice> getNoticeById(Long id) {
        return noticeRepository.findById(id);
    }

    public List<Notice> getNoticesByAuthor(Long authorId) {
        return noticeRepository.findByAuthorId(authorId);
    }

    public List<Notice> getNoticesByTargetAudience(Notice.TargetAudience audience) {
        return noticeRepository.findByTargetAudience(audience);
    }

    public Notice createNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    public Notice updateNotice(Long id, Notice notice) {
        notice.setId(id);
        return noticeRepository.save(notice);
    }

    public void deleteNotice(Long id) {
        noticeRepository.deleteById(id);
    }

    public void deactivateNotice(Long id) {
        Optional<Notice> notice = noticeRepository.findById(id);
        notice.ifPresent(n -> {
            n.setActive(false);
            noticeRepository.save(n);
        });
    }
}
