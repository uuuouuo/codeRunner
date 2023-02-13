package com.example.chatservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {

    private int roomId;
    private String nickname;
    private String content;
    private LocalDateTime createTime;

    public static MessageDto toEntity(ChatPostDto.ChatPostReq post) {
        return MessageDto.builder()
                .roomId(post.getRoomId())
                .nickname(post.getNickname())
                .content(post.getContent())
                .createTime(LocalDateTime.now())
                .build();
    }

}
