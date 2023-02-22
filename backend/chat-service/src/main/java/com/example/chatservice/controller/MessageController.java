package com.example.chatservice.controller;

import com.example.chatservice.model.dto.ChatPostDto.ChatPostReq;
import com.example.chatservice.service.ChatService;
import com.example.chatservice.service.redis.RedisCacheService;
import com.example.chatservice.service.redis.RedisPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final RedisPublisher redisPublisher;
    private final ChannelTopic channelTopic;
    private final ChatService chatService;
    private final RedisCacheService redisCacheService;

    @MessageMapping("/chat/message")
    public void message(ChatPostReq message) {
        redisPublisher.publish(channelTopic, message);
        chatService.saveMessage(message);
        redisCacheService.addChat(message);
    }

}
