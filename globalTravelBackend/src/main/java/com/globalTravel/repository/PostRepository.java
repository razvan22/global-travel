package com.globalTravel.repository;

import com.globalTravel.entinty.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository  extends JpaRepository<Post, Integer> {
    List<Post> findAllByAuthorId(int id);
}
