package com.project.goen.user.service;

import com.project.goen.user.dto.UserDto;
import com.project.goen.user.dto.UserJoinDto;
import com.project.goen.user.entity.User;
import com.project.goen.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Long userJoin(UserJoinDto dto) {
        checkUser(dto);
        User user = User.createUser(dto, passwordEncoder);
        userRepository.save(user);

        return user.getId();
    }

    public void checkUser(UserJoinDto dto) {
        if (userRepository.existsByEmail(dto.getEmail()))
            throw new IllegalStateException("이미 사용중인 이메일입니다.");
    }

    @Override
    public String getUserNameByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getName)
                .orElseThrow(() -> new IllegalStateException("사용자 정보를 찾을 수 없습니다."));
    }

}
