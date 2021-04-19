package com.globalTravel.service;

import com.globalTravel.entinty.User;
import com.globalTravel.repository.PostRepository;
import com.globalTravel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PostRepository postRepository;

    public User addNewUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public boolean isEmailInUse(String email){
       User user =  userRepository.findByEmail(email);
        return user == null;
    }
}