package com.example.chatservice.service;

//import com.example.chatservice.client.UserClient;
import com.example.chatservice.model.dto.ChatPostDto;
import com.example.chatservice.model.dto.ChatPostDto.ChatPostReq;
import com.example.chatservice.model.dto.ChatRoomDto;
import com.example.chatservice.model.dto.ChatRoomDto.ChatRoomReq;
import com.example.chatservice.model.dto.ChatRoomDto.ChatRoomRes;
import com.example.chatservice.model.dto.MessageDto;
import com.example.chatservice.model.dto.UserChatDto;
import com.example.chatservice.model.entity.ChatPost;
import com.example.chatservice.model.entity.ChatRoom;
import com.example.chatservice.model.entity.User;
import com.example.chatservice.model.entity.UserChat;
import com.example.chatservice.repository.ChatPostRepository;
import com.example.chatservice.repository.ChatRoomRepository;
import com.example.chatservice.repository.UserChatRepository;
import com.example.chatservice.repository.UserRepository;
import com.example.chatservice.util.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

import static com.example.chatservice.util.Message.CHATROOM_FIND_SUCCESS_MESSAGE;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatService {

    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserChatRepository userChatRepository;
    private final ChatPostRepository chatPostRepository;
//    private final UserClient userClient;

    @Transactional
    public Map<String, Object> makeChatRoom(ChatRoomReq request) {

        ChatRoom chatRoom = ChatRoomDto.toEntity(request.getName());
        chatRoomRepository.save(chatRoom);
        ChatRoomRes response = new ChatRoomRes(chatRoom.getId(), chatRoom.getName());

        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>
        // UserRes user : userClient.getUsers(request.getNicknames())
        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<

        List<Optional<User>> users = request.getNicknames().stream()
                .map(nn -> userRepository.findByNickname(nn))
                .collect(Collectors.toList());

        for (Optional<User> user : users) {
            if(!user.isPresent()) new IllegalStateException("존재하지 않는 사용자입니다.");

            // >>>>>>>>>>>>>>>>>>>>>>>>>>>>
            // UserChat userChat = UserChatDto.toEntity(chatRoom, UserDto.toEntity(user));
            // <<<<<<<<<<<<<<<<<<<<<<<<<<<<

            UserChat userChat = UserChatDto.toEntity(chatRoom, user.get());
            userChatRepository.save(userChat);
        }

        Map<String, Object> result = new HashMap<>();

        result.put("message", Message.CHATROOM_SAVE_SUCCESS_MESSAGE);
        result.put("response", response);

        return result;

    }


    public List<MessageDto> findMessages(Integer roomId) {

        ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalStateException("채팅방이 존재하지 않습니다."));

        List<ChatPost> postList = chatPostRepository.findByChatRoom(chatRoom);
        List<MessageDto> response = new ArrayList<>();

        if(postList.size() != 0) {
            response = postList.stream()
                    .map(post -> new MessageDto(roomId, post.getUser().getNickname()
                            , post.getContent(), post.getCreateTime()))
                    .collect(Collectors.toList());
        }

        return response;

    }


    public Map<String, Object> findChatRooms(String userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("유저가 존재하지 않습니다."));

        List<UserChat> roomList = userChatRepository.findByUser(user);
        List<ChatRoomRes> response = new ArrayList<>();

        if(roomList.size() != 0) {
            response = roomList.stream()
                    .map(room -> new ChatRoomRes(room.getChatRoom().getId()
                            , room.getChatRoom().getName()))
                    .collect(Collectors.toList());
        }

        Map<String, Object> result = new HashMap<>();

        result.put("message", CHATROOM_FIND_SUCCESS_MESSAGE);
        result.put("response", response);

        return result;
    }

    @Transactional
    public void saveMessage(ChatPostReq request) {
        User user = userRepository.findByNickname(request.getNickname())
                .orElseThrow(() -> new IllegalStateException("존재하지 않는 사용자입니다."));

        ChatRoom chatRoom = chatRoomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new IllegalStateException("존재하지 않는 채팅방입니다."));

        ChatPost chatPost = ChatPostDto.toEntity(request, user, chatRoom);

        chatPostRepository.save(chatPost);
    }

}
