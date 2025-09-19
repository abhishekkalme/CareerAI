package com.Controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.Entity.ChatMessage;

import java.time.Instant;

//ChatController.java
@Controller
public class ChatController {
 @MessageMapping("/chat/{room}")
 @SendTo("/topic/{room}")
 public ChatMessage sendMessage(@DestinationVariable String room, @Payload ChatMessage message) {
     if (message.getTimestamp() == null) {
         message.setTimestamp(java.time.Instant.now().toString());
     }
     message.setRoom(room);
     return message;
 }
}


