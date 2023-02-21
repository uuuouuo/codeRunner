package com.example.userservice;

import com.example.userservice.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/{nickname}")
    public ResponseEntity<Map<String, Object>> postUser(@PathVariable String nickname) {
        return ResponseEntity.ok().body(userService.saveUser(nickname));
    }

    @GetMapping("/list/{nickname1}/{nickname2}")
    public List<User> getUsers(@PathVariable("nickname1") String nn1, @PathVariable("nickname2") String nn2) {
        return userService.findUsers(nn1, nn2);
    }

    @GetMapping("/{nickname}")
    public User getUser(@PathVariable("nickname") String nn) {
        return userService.findUser(nn);
    }

    @GetMapping("/total/list")
    public ResponseEntity<Map<String, Object>> getAllUsers() {
        return ResponseEntity.ok().body(userService.findAllUsers());
    }
}
