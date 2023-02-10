package com.example.chat.repository;

import com.example.chat.model.entity.ChatPost;
import com.example.chat.model.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatPostRepository extends JpaRepository<ChatPost, Integer> {
    List<ChatPost> findByChatRoom(ChatRoom chatRoom);
}
