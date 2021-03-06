package com.globalTravel.service;

import com.globalTravel.entinty.User;
import com.globalTravel.repository.PostRepository;
import com.globalTravel.repository.UserRepository;
import com.globalTravel.security.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PostRepository postRepository;
    @Autowired
    MyUserDetailsService userDetailsService;

    public ResponseEntity<User> addNewUser(User user) {
        userDetailsService.addUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public boolean isEmailInUse(String email){
       User user =  userRepository.findByEmail(email);
        return user == null;
    }
}