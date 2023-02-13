package com.example.chatservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserChat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_CHAT_ID")
    private Integer id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="USER_ID", nullable = false)
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="CHAT_ROOM_ID", nullable = false)
    private ChatRoom chatRoom;

}
