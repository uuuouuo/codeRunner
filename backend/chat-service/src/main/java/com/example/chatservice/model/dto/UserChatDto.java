package com.example.chatservice.model.dto;

import com.example.chatservice.model.entity.ChatRoom;
import com.example.chatservice.model.entity.User;
import com.example.chatservice.model.entity.UserChat;

public class UserChatDto {

    public static UserChat toEntity(ChatRoom chatRoom, User user) {
        return UserChat.builder().chatRoom(chatRoom).user(user).build();
    }
}
