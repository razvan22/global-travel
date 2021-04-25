package com.globalTravel.controller;

import com.globalTravel.entinty.User;
import com.globalTravel.security.MyUserDetailsService;
import com.globalTravel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    MyUserDetailsService myUserDetailsService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<User> registerNewUser(@RequestBody User user){
        return userService.addNewUser(user);
    }

    @GetMapping("/whoami")
    public  User whoAmI(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(email);
        return null;
    }

    @GetMapping
    public List<User> getAll(){
        return userService.getAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/check={email}")
    public boolean isEmailInUse(@PathVariable String email){
        return userService.isEmailInUse(email);
    }

}
