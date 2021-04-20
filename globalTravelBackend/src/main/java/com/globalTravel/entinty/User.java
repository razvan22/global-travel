package com.globalTravel.entinty;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "user",
       uniqueConstraints = { @UniqueConstraint(name ="unique_email",columnNames = "email")}
)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Integer id;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    private String password;

    @NotNull
    private String name;

    @Column(name="email", nullable = false ,unique=true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "author")
    private List<Post> posts;

    public User(){}
    public User(String password, String name, String email) {
        this.password = password;
        this.name = name;
        this.email = email;
    }
}
