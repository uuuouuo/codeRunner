package com.example.chat.service.redis;

import com.example.chat.test.TestMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisPublisher {
    private final RedisTemplate<String, Object> redisTemplate;

//    public void publish(ChannelTopic topic, ChatMessageDto message) {
//        redisTemplate.convertAndSend(topic.getTopic(), message);
//    }

    // TEST >>>>>>>>>>>>>>
    public void publish(ChannelTopic topic, TestMessage message) {
        redisTemplate.convertAndSend(topic.getTopic(), message);
    }
    // <<<<<<<<<<<<<<<
}
