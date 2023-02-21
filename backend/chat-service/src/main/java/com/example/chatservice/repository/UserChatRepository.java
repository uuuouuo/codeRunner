package com.example.chatservice.repository;

import com.example.chatservice.model.entity.User;
import com.example.chatservice.model.entity.UserChat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserChatRepository extends JpaRepository<UserChat, Integer> {
    List<UserChat> findByUser(User user);
}
