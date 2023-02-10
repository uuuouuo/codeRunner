package com.example.chat.repository;

import com.example.chat.model.entity.User;
import com.example.chat.model.entity.UserChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface UserChatRepository extends JpaRepository<UserChat, Integer> {
    List<UserChat> findByUser(User user);
}
