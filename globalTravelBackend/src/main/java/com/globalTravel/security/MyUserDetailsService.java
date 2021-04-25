package com.globalTravel.security;

import com.globalTravel.entinty.User;
import com.globalTravel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public BCryptPasswordEncoder getEncoder(){return encoder;}

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null){
            throw new UsernameNotFoundException("User with email :"+email+" was not found.");
        }
        return toUserDetails(user);
    }

    public User addUser(User user){
        User newUser = new User( encoder.encode(user.getPassword()) ,user.getName(),user.getEmail());
        try{
            userRepository.save(newUser);
        }catch (Exception e){
            e.printStackTrace();
        } return newUser;
    }

    private UserDetails toUserDetails(User user){
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles("USER").build();
    }


}
