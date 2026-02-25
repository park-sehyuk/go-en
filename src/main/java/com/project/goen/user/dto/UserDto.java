package com.project.goen.user.dto;

import com.project.goen.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    private String email;
    private String name;

    public UserDto(User user){
        this.email = user.getEmail();
        this.name = user.getName();
    }

}
