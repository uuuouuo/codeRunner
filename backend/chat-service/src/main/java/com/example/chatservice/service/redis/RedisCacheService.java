package com.example.chatservice.service.redis;

import com.example.chatservice.exception.CustomException.NotFoundException;
import com.example.chatservice.exception.ErrorCode;
import com.example.chatservice.model.dto.ChatPostDto.ChatPostReq;
import com.example.chatservice.model.dto.MessageDto;
import com.example.chatservice.model.entity.ChatPost;
import com.example.chatservice.model.entity.ChatRoom;
import com.example.chatservice.repository.ChatPostRepository;
import com.example.chatservice.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RedisCacheService {

    public static final String NEW_CHAT = "NEW_CHAT";
    public static final String TOPIC = "TOPIC";

    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisTemplate<String, MessageDto> chatRedisTemplate;
    private ZSetOperations<String, MessageDto> zSetOperations;

    private final ChatPostRepository chatPostRepository;
    private final ChatRoomRepository chatRoomRepository;


    @PostConstruct
    private void init() {
        zSetOperations = chatRedisTemplate.opsForZSet();
    }

    // chat data cache 삽입
    public void addChat(ChatPostReq message) {
        MessageDto data = MessageDto.toEntity(message);

        redisTemplate.opsForZSet().add(NEW_CHAT, data, changeLocalDateTimeToDouble(data.getCreateTime()));
        redisTemplate.opsForZSet().add(TOPIC + data.getRoomId(), data, changeLocalDateTimeToDouble(data.getCreateTime()));

        System.out.println(redisTemplate.opsForZSet().getOperations().boundZSetOps("NEW_CHAT").size());
    }


    public Double changeLocalDateTimeToDouble(LocalDateTime createdAt) {
        return ((Long) createdAt.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()).doubleValue();
    }


    //chat cache 조회
    public List<MessageDto> getMessagesFromCache(Integer roomId) {

        //Redis 로부터 chat_data 조회
        Set<MessageDto> messageSet = zSetOperations.reverseRange(TOPIC + roomId, 0, 10);

        List<MessageDto> mesageList = new ArrayList<>();

        messageSet.forEach(m -> mesageList.add(m));

        //Chat_data 부족할경우 MYSQL 추가 조회
        if (mesageList.size() != 10) {
            getMessageFromDB(roomId);
        }

        return mesageList;
    }


    private void getMessageFromDB(Integer roomId) {

        ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.CHAT_NOT_FOUND));

        List<ChatPost> posts = chatPostRepository.findByChatRoom(chatRoom);

        if(posts.size() != 0) {
            List<MessageDto> messages = posts.stream()
                    .map(m -> MessageDto.toEntity(m)).collect(Collectors.toList());

            messages.forEach(m -> cachingDBData(m));
        }

    }


    public void cachingDBData(MessageDto message) {
        redisTemplate.opsForZSet()
                .add(TOPIC + message.getRoomId(), message,
                        changeLocalDateTimeToDouble(message.getCreateTime()));
    }

}
