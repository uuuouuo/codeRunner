package com.example.userservice;

import com.example.userservice.exception.CustomException.NotFoundException;
import com.example.userservice.exception.ErrorCode;
import com.example.userservice.model.User;
import com.example.userservice.model.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.example.userservice.util.Message.USER_FIND_SUCCESS_MESSAGE;
import static com.example.userservice.util.Message.USER_SAVE_SUCCESS_MESSAGE;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Map<String, Object> saveUser(String nickname) {
        Map<String, Object> result = new HashMap<>();

        userRepository.save(UserDto.toEntity(nickname));

        result.put("message", USER_SAVE_SUCCESS_MESSAGE);

        return result;
    }

    public List<User> findUsers(String nickname1, String nickname2) {

        Optional<User> user1 = userRepository.findByNickname(nickname1);
        Optional<User> user2 = userRepository.findByNickname(nickname2);

        if (!user1.isPresent() || !user2.isPresent()) {
            throw new NotFoundException(ErrorCode.USER_ID_NOT_FOUND);
        }
        List<User> result = new ArrayList<>();
        result.add(user1.get());
        result.add(user2.get());

        return result;
    }

    public Map<String, Object> findAllUsers() {

        List<User> users = userRepository.findAll();

        List<String> list = new ArrayList<>();

        for (User user : users) {
            list.add(user.getNickname());
        }

        Map<String, Object> result = new HashMap<>();

        result.put("response", list);
        result.put("message", USER_FIND_SUCCESS_MESSAGE);

        return result;
    }

    public User findUser(String nickname) {
        User user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_ID_NOT_FOUND));

        return user;
    }
}
