package com.globalTravel.entinty;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class Post {
    @Id
    private UUID id;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date postDate;

    @ManyToOne
    private User author;

    @ManyToOne
    private Location location;

    private String title;
    private String content;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments;

    @OneToMany(mappedBy = "post")
    private List<PostImage> images;

}
