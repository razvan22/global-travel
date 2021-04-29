package com.globalTravel.controller;

import com.globalTravel.entinty.User;
import com.globalTravel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user-login")
public class LoginController {
    @Autowired
    UserService userService;

    @PostMapping
    public ResponseEntity<User> login( @RequestBody User user){
         return  userService.login(user);
    }
}


