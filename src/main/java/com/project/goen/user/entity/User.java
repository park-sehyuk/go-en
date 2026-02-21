package com.project.goen.user.entity;

import com.project.goen.user.dto.UserJoinDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.crypto.password.PasswordEncoder;

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

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String name;


    public static User createUser(UserJoinDto dto, PasswordEncoder passwordEncoder){
        User user = new User();
        user.email = dto.getEmail();
        user.password = passwordEncoder.encode(dto.getPassword());
        user.name = dto.getName();

        return user;
    }

}
