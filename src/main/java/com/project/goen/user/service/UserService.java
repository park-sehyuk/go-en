package com.project.goen.user.service;

import com.project.goen.user.dto.UserDto;
import com.project.goen.user.dto.UserJoinDto;

public interface UserService {
    Long userJoin(UserJoinDto dto);
    String getUserNameByEmail(String email);
}
