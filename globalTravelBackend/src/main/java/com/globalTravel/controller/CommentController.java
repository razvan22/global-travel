package com.globalTravel.controller;

import com.globalTravel.entinty.Comment;
import com.globalTravel.entinty.Post;
import com.globalTravel.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/comment")
public class CommentController {
    @Autowired
    CommentRepository commentRepository;

    @GetMapping
    public List<Comment> getComments(){
        return commentRepository.findAll();
    }

    @PostMapping
    public Comment newComment(@RequestBody Comment comment){
        return commentRepository.save(comment);
    }

    @GetMapping("/postId={id}")
    public List<Comment> getPostComments(@PathVariable int id){
        return commentRepository.findAllByPostId(id);
    }

}
