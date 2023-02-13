package com.example.chatservice.model.dto;

import com.example.chatservice.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class UserDto {

    public static User toEntity(UserRes user) {
        return User.builder().id(user.userId)
                .nickname(user.nickname).password(user.password).build();
    }

    @Getter
    @AllArgsConstructor
    public static class UserRes {
        String userId;
        String nickname;
        String password;
    }

}
