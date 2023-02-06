package com.example.chat.service;

import com.example.chat.Message;
import com.example.chat.model.dto.ChatRoomDto;
import com.example.chat.model.entity.ChatRoom;
import com.example.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService {

    private ChatRoomRepository chatRoomRepository;

    public Map<String, Object> makeChatRoom(String name) {
        ChatRoom chatRoom = ChatRoomDto.toEntity(name);
        chatRoomRepository.save(chatRoom);

        Map<String, Object> result = new HashMap<>();
        result.put("message", Message.CHATROOM_SAVE_SUCCESS_MESSAGE);

        return result;
    }

    // 채팅 내역 가져오기 -> 채팅방 id 통해 기록 가져오기
}
