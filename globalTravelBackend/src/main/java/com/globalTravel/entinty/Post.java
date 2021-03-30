package com.globalTravel.entinty;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String title;
    private Data postDate;
    private Integer authorID;
    private Integer ratingID;
    private Integer commentID;
    private Integer locationID;

}
