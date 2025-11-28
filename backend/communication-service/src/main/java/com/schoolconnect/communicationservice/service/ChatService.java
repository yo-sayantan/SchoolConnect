package com.schoolconnect.communicationservice.service;

import com.schoolconnect.communicationservice.model.Chat;
import com.schoolconnect.communicationservice.model.Message;
import com.schoolconnect.communicationservice.repository.ChatRepository;
import com.schoolconnect.communicationservice.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MessageRepository messageRepository;

    public Chat createChat(List<String> participantIds) {
        // Check if chat already exists
        // Simplified logic: just create new for now or check exact match
        // For MVP, we'll create a new one if not found, but ideally we check if a chat
        // with these exact participants exists
        Chat chat = new Chat();
        chat.setParticipantIds(participantIds);
        chat.setLastMessageTime(LocalDateTime.now());
        return chatRepository.save(chat);
    }

    public List<Chat> getUserChats(String userId) {
        return chatRepository.findByParticipantIdsContaining(userId);
    }

    public Chat getChat(Long chatId) {
        return chatRepository.findById(chatId).orElse(null);
    }

    public Message sendMessage(Long chatId, String senderId, String content) {
        Optional<Chat> chatOpt = chatRepository.findById(chatId);
        if (chatOpt.isPresent()) {
            Chat chat = chatOpt.get();
            Message message = new Message();
            message.setChat(chat);
            message.setSenderId(senderId);
            message.setContent(content);
            message.setTimestamp(LocalDateTime.now());

            chat.setLastMessage(content);
            chat.setLastMessageTime(LocalDateTime.now());
            chatRepository.save(chat);

            return messageRepository.save(message);
        }
        return null;
    }

    public List<Message> getChatMessages(Long chatId) {
        return messageRepository.findByChatId(chatId);
    }
}
