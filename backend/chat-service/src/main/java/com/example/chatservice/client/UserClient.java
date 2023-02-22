package com.example.chatservice.client;

import com.example.chatservice.model.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@FeignClient(name = "user-service", url = "http://localhost:8081")
public interface UserClient {

    @RequestMapping(method= RequestMethod.GET, value="/user/list/{nickname1}/{nickname2}")
    List<User> getUsers(@PathVariable("nickname1") String nickname1, @PathVariable("nickname2") String nickname2);

    @RequestMapping(method= RequestMethod.GET, value="/user/{nickname}")
    User getUser(@PathVariable("nickname") String nickname);

}
