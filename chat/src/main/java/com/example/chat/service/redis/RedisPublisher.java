package com.example.chat.service.redis;

import com.example.chat.model.dto.ChatPostDto.ChatPostReq;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisPublisher {
    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(ChannelTopic topic, ChatPostReq message) {
        redisTemplate.convertAndSend(topic.getTopic(), message);
    }

}
