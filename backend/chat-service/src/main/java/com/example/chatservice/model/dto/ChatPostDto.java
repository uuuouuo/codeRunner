package com.example.chatservice.model.dto;

import com.example.chatservice.model.entity.ChatPost;
import com.example.chatservice.model.entity.ChatRoom;
import com.example.chatservice.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


public class ChatPostDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChatPostReq {

        private int roomId;
        private String nickname;
        private String content;

    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChatPostRes {

        private String nickname;
        private String content;
        private LocalDateTime createTime;

    }

    public static ChatPost toEntity(MessageDto message, User user, ChatRoom chatRoom) {
        return ChatPost.builder()
                .chatRoom(chatRoom)
                .user(user)
                .content(message.getContent())
                .createTime(message.getCreateTime())
                .build();
    }

    public static ChatPost toEntity(ChatPostReq message, User user, ChatRoom chatRoom) {
        return ChatPost.builder()
                .chatRoom(chatRoom)
                .user(user)
                .content(message.getContent())
                .createTime(LocalDateTime.now())
                .build();
    }

}
