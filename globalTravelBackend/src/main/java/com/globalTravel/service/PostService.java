package com.globalTravel.service;

import com.globalTravel.entinty.Location;
import com.globalTravel.entinty.Post;
import com.globalTravel.entinty.PostImage;
import com.globalTravel.repository.LocationRepository;
import com.globalTravel.repository.PostImageRepository;
import com.globalTravel.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    PostImageRepository postImageRepository;



    public Post savePost(Post post) {
        UUID postID = UUID.randomUUID();
        post.setId(postID);
        Location location = post.getLocation();
        post.setLocation(locationRepository.save(location));

        List<PostImage> images = post.getImages();
        Post response = postRepository.save(post);



        for(PostImage image : images){
            image.setPost(response);
            postImageRepository.save(image);
        }

        return response;

    }
}