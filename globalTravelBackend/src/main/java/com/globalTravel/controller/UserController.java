package com.globalTravel.controller;

import com.globalTravel.entinty.User;
import com.globalTravel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @PostMapping
    public User addPerson(@RequestBody User user){
        return userRepository.save(user);
    }

    @GetMapping
    public List<User> getAll(){
        return userRepository.findAll();
    }
}
