package com.project.goen.user.controller;

import com.project.goen.user.dto.UserJoinDto;
import com.project.goen.user.dto.UserLoginDto;
import com.project.goen.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/join")
    public ResponseEntity<Long> join(@RequestBody @Valid UserJoinDto dto){
        Long userId = userService.userJoin(dto);

        return ResponseEntity.ok(userId);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto dto, HttpServletRequest httpServletRequest){
        try{
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
            Authentication authentication = authenticationManager.authenticate(authToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            HttpSession session = httpServletRequest.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT",SecurityContextHolder.getContext());

            return ResponseEntity.ok().body(Map.of(
                    "message","로그인 성공",
                    "email",authentication.getName()
            ));
        }catch (Exception e){
            return ResponseEntity.status(401).body(Map.of(
                    "message", "아이디 또는 비밀번호가 틀렸습니다."
            ));
        }
    }

}
