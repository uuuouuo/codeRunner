package com.example.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class UserDto {

    public static User toEntity(String nickname) {
        return User.builder().nickname(nickname).build();
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserRes {
        Integer userId;
        String nickname;
    }
}
