package com.example.chatservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(name = "USER_ID", length = 45)
    private String id;

    @Column(nullable = false, length = 10)
    private String nickname;

    @Column(nullable = false, length = 45)
    private String password;
}
