package com.example.chatservice.model.dto;

import com.example.chatservice.model.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


public class ChatRoomDto {

    public static ChatRoom toEntity(String name) {
        return ChatRoom.builder().name(name).build();
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChatRoomReq {
        String name;
        String[] nicknames;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChatRoomRes {
        Integer roomId;
        String name;
    }

}
