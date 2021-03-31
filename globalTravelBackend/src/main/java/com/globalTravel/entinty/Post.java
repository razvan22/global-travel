package com.globalTravel.entinty;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date postDate;
    @ManyToOne
    private User author;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "post")
    private List<Comment> comments;
    private String title;
}
