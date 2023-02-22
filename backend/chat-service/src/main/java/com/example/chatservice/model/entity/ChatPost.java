package com.example.chatservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatPost {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CHAT_POST_ID")
    private Integer id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="USER_ID")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="CHAT_ROOM_ID")
    private ChatRoom chatRoom;

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(nullable = false)
    private LocalDateTime createTime;
}
