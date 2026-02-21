package com.project.goen.user.entity;

import com.project.goen.user.dto.UserJoinDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@Table(name = "user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String name;


    public static User createUser(UserJoinDto dto){
        User user = new User();
        user.email = dto.getEmail();
        user.password = dto.getPassword();
        user.name = dto.getName();

        return user;
    }

}
