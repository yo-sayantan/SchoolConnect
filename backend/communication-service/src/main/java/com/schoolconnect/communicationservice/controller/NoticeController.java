package com.schoolconnect.communicationservice.controller;

import com.schoolconnect.communicationservice.model.Notice;
import com.schoolconnect.communicationservice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notices")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NoticeController {

    private final NoticeRepository noticeRepository;

    @GetMapping
    public ResponseEntity<List<Notice>> getAllNotices() {
        return ResponseEntity.ok(noticeRepository.findByActive(true));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNoticeById(@PathVariable Long id) {
        return noticeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/audience/{audience}")
    public ResponseEntity<List<Notice>> getNoticesByAudience(@PathVariable Notice.TargetAudience audience) {
        return ResponseEntity.ok(noticeRepository.findByTargetAudience(audience));
    }

    @PostMapping
    public ResponseEntity<Notice> createNotice(@RequestBody Notice notice) {
        return ResponseEntity.ok(noticeRepository.save(notice));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNotice(@PathVariable Long id, @RequestBody Notice notice) {
        return noticeRepository.findById(id)
                .map(existing -> {
                    notice.setId(id);
                    return ResponseEntity.ok(noticeRepository.save(notice));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        noticeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
