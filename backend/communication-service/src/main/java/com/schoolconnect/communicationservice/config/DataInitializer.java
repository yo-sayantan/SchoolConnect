package com.schoolconnect.communicationservice.config;

import com.schoolconnect.communicationservice.model.Notice;
import com.schoolconnect.communicationservice.model.Notification;
import com.schoolconnect.communicationservice.repository.NoticeRepository;
import com.schoolconnect.communicationservice.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final NoticeRepository noticeRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public void run(String... args) {
        if (noticeRepository.count() == 0) {
            log.info("Initializing communication demo data...");

            // Create Notices
            createNotice(
                    "Welcome to New Academic Year 2024-25",
                    "Dear Students and Parents,\n\nWe are delighted to welcome you to the new academic year 2024-25. " +
                            "We look forward to an exciting year filled with learning, growth, and achievements.\n\n" +
                            "Important dates:\n- First day of school: January 15, 2025\n- Parent-Teacher meeting: January 25, 2025\n\n"
                            +
                            "Best regards,\nSchool Administration",
                    1L, // Principal
                    Notice.TargetAudience.ALL);

            createNotice(
                    "Mid-Term Examination Schedule",
                    "The mid-term examinations will be conducted from February 10-20, 2025.\n\n" +
                            "Examination Schedule:\n" +
                            "- Mathematics: Feb 10, 9:00 AM - 12:00 PM\n" +
                            "- Science: Feb 12, 9:00 AM - 12:00 PM\n" +
                            "- English: Feb 14, 9:00 AM - 12:00 PM\n" +
                            "- History: Feb 16, 9:00 AM - 12:00 PM\n" +
                            "- Geography: Feb 18, 9:00 AM - 12:00 PM\n\n" +
                            "Students are advised to prepare well. Best of luck!",
                    2L, // Admin Assistant
                    Notice.TargetAudience.STUDENTS);

            createNotice(
                    "Parent-Teacher Meeting - January 2025",
                    "Dear Parents,\n\nWe cordially invite you to the Parent-Teacher meeting scheduled for " +
                            "January 25, 2025, from 10:00 AM to 2:00 PM.\n\n" +
                            "This is an excellent opportunity to discuss your child's academic progress and development.\n\n"
                            +
                            "Please confirm your attendance with the class teacher.\n\n" +
                            "Regards,\nSchool Administration",
                    1L, // Principal
                    Notice.TargetAudience.PARENTS);

            createNotice(
                    "Staff Meeting - Curriculum Planning",
                    "All teaching staff are requested to attend the curriculum planning meeting on " +
                            "January 20, 2025, at 3:00 PM in the staff room.\n\n" +
                            "Agenda:\n" +
                            "- Review of current curriculum\n" +
                            "- Integration of new teaching methodologies\n" +
                            "- Student performance analysis\n\n" +
                            "Your presence is mandatory.\n\n" +
                            "Best regards,\nPrincipal",
                    1L, // Principal
                    Notice.TargetAudience.TEACHERS);

            createNotice(
                    "Annual Sports Day - February 28, 2025",
                    "We are excited to announce our Annual Sports Day on February 28, 2025!\n\n" +
                            "Events include:\n" +
                            "- Track and Field\n" +
                            "- Basketball Tournament\n" +
                            "- Cricket Match\n" +
                            "- Relay Races\n\n" +
                            "All students are encouraged to participate. Registration forms are available with the sports teacher.\n\n"
                            +
                            "Let's make it a memorable event!",
                    2L, // Admin Assistant
                    Notice.TargetAudience.ALL);

            // Create Notifications for students
            createNotification(9L, "New Marks Published",
                    "Your mid-term exam marks for Mathematics have been published.",
                    Notification.NotificationType.MARKS);
            createNotification(10L, "New Marks Published",
                    "Your mid-term exam marks for Mathematics have been published.",
                    Notification.NotificationType.MARKS);
            createNotification(11L, "Attendance Alert", "You were marked absent on January 15, 2025.",
                    Notification.NotificationType.ATTENDANCE);
            createNotification(12L, "Upcoming Event", "Annual Sports Day is scheduled for February 28, 2025.",
                    Notification.NotificationType.EVENT);
            createNotification(13L, "New Notice", "Mid-term examination schedule has been published.",
                    Notification.NotificationType.NOTICE);

            // Create Notifications for parents
            createNotification(7L, "Parent-Teacher Meeting",
                    "You are invited to the Parent-Teacher meeting on January 25, 2025.",
                    Notification.NotificationType.EVENT);
            createNotification(8L, "Student Marks Update", "Your child's mid-term exam results are now available.",
                    Notification.NotificationType.MARKS);
            createNotification(9L, "Attendance Alert", "Your child was marked absent on January 15, 2025.",
                    Notification.NotificationType.ATTENDANCE);

            log.info("Communication demo data initialized successfully!");
        }
    }

    private void createNotice(String title, String content, Long authorId, Notice.TargetAudience audience) {
        Notice notice = new Notice();
        notice.setTitle(title);
        notice.setContent(content);
        notice.setAuthorId(authorId);
        notice.setTargetAudience(audience);
        notice.setActive(true);
        noticeRepository.save(notice);
        log.info("Created notice: {}", title);
    }

    private void createNotification(Long userId, String title, String message, Notification.NotificationType type) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRead(false);
        notification.setEmailSent(false);
        notificationRepository.save(notification);
    }
}
