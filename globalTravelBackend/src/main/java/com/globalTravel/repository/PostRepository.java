package com.globalTravel.repository;

import com.globalTravel.entinty.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository  extends JpaRepository<Post, UUID> {
    List<Post> findAllByAuthorId(UUID id);
}
