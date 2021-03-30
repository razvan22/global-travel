package com.globalTravel.repository;

import com.globalTravel.entinty.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
        User findById(int id);
        User findByEmail(String email);
}
