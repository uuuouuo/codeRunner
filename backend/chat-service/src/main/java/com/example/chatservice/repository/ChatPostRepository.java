package com.example.chatservice.repository;

import com.example.chatservice.model.entity.ChatPost;
import com.example.chatservice.model.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatPostRepository extends JpaRepository<ChatPost, Integer> {
    List<ChatPost> findByChatRoom(ChatRoom chatRoom);
}
