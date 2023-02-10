package com.example.chat.repository;

import com.example.chat.model.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {
}
