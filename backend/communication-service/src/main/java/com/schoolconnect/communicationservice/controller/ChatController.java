package com.schoolconnect.communicationservice.controller;

import com.schoolconnect.communicationservice.model.Chat;
import com.schoolconnect.communicationservice.model.Message;
import com.schoolconnect.communicationservice.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/communication/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<Chat> createChat(@RequestBody List<String> participantIds) {
        return ResponseEntity.ok(chatService.createChat(participantIds));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Chat>> getUserChats(@PathVariable String userId) {
        return ResponseEntity.ok(chatService.getUserChats(userId));
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<Chat> getChat(@PathVariable Long chatId) {
        return ResponseEntity.ok(chatService.getChat(chatId));
    }

    @PostMapping("/{chatId}/messages")
    public ResponseEntity<Message> sendMessage(@PathVariable Long chatId, @RequestBody Map<String, String> payload) {
        String senderId = payload.get("senderId");
        String content = payload.get("content");
        return ResponseEntity.ok(chatService.sendMessage(chatId, senderId, content));
    }

    @GetMapping("/{chatId}/messages")
    public ResponseEntity<List<Message>> getChatMessages(@PathVariable Long chatId) {
        return ResponseEntity.ok(chatService.getChatMessages(chatId));
    }
}
