package com.globalTravel.entinty;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    @NotNull
    private String authorName;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date commentDate;
    @NotNull
    private String comment;
    @ManyToOne
    private Post post;
}
