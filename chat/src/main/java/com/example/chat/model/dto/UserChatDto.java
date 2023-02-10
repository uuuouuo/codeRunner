package com.example.chat.model.dto;

import com.example.chat.model.entity.ChatRoom;
import com.example.chat.model.entity.User;
import com.example.chat.model.entity.UserChat;

public class UserChatDto {

    public static UserChat toEntity(ChatRoom chatRoom, User user) {
        return UserChat.builder().chatRoom(chatRoom).user(user).build();
    }
}
