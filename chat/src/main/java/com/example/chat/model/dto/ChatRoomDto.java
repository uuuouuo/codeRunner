package com.example.chat.model.dto;

import com.example.chat.model.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;


public class ChatRoomDto {

    public static ChatRoom toEntity(String name) {
        return ChatRoom.builder().name(name).build();
    }

    @Getter
    @AllArgsConstructor
    public static class ChatRoomReq {
        String name;
        List<String> nicknames;
    }

    @Getter
    @AllArgsConstructor
    public static class ChatRoomRes {
        Integer roomId;
        String name;
    }

}
