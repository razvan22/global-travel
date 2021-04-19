package com.globalTravel.controller;

import com.globalTravel.entinty.Post;
import com.globalTravel.repository.PostRepository;
import com.globalTravel.service.MediaService;
import com.globalTravel.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("api/post")
public class PostController {
    @Autowired
    PostService postService;
    @Autowired
    PostRepository postRepository;
    @Autowired
    MediaService mediaService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/new")
    public Post newPost(@RequestBody Post post ) {
       return postService.savePost(post);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/author={id}")
    public List<Post> getUserPosts(@PathVariable UUID id) {
        return postRepository.findAllByAuthorId(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/post={id}")
    public Optional<Post> getPostById(@PathVariable UUID id) {
        return postRepository.findById(id);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/uploadImage")
    public List<String> uploadImage(@RequestParam("imageFile") MultipartFile[] imageFile) throws Exception {
       List<String> imagesPaths = new ArrayList<String>();
        try {
            for(MultipartFile file : imageFile){
                imagesPaths.add(mediaService.saveImage(file));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return imagesPaths;
    }

}
