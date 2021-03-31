package com.globalTravel.controller;

import com.globalTravel.entinty.Post;
import com.globalTravel.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/post")
public class PostController {
    @Autowired
    PostRepository postRepository;

    @PostMapping
    public Post makeNewPost(@RequestBody Post post){
       return postRepository.save(post);
    }

    @GetMapping
    public List<Post> getPosts(){
        return postRepository.findAll();
    }

    @GetMapping("/author={id}")
    public List<Post> getUserPosts(@PathVariable int id){
        return postRepository.findAllByAuthorId(id);
    }

}
