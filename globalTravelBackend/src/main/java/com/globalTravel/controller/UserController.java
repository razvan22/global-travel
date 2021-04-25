package com.globalTravel.controller;

import com.globalTravel.entinty.User;
import com.globalTravel.repository.UserRepository;
import com.globalTravel.security.MyUserDetailsService;
import com.globalTravel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    MyUserDetailsService myUserDetailsService;
    @Autowired
    UserRepository userRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<User> registerNewUser(@RequestBody User user){
        return userService.addNewUser(user);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/whoami")
    public  User whoAmI(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(email);
        return null;
    }

    @GetMapping("/all")
    public List<User> getAll(){
        return userService.getAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/check={email}")
    public boolean isEmailInUse(@PathVariable String email){
        return userService.isEmailInUse(email);
    }

    @GetMapping("/login/name")
    public User user(Principal principal) {
        User u = userRepository.findByEmail(principal.getName());
        System.out.println(u);
        return u;
    }

}
