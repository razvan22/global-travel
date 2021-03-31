package com.globalTravel.controller;

import com.globalTravel.entinty.User;
import com.globalTravel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping
    public User registerNewUser(@RequestBody User user){
        return userService.addNewUser(user);
    }

    @GetMapping
    public List<User> getAll(){
        return userService.getAll();
    }
}
