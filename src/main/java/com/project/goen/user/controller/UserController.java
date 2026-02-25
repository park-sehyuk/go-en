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
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<?> join(@RequestBody @Valid UserJoinDto dto){
        try {
            Long userId = userService.userJoin(dto);
            return ResponseEntity.ok(userId);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(Map.of(
                    "message", e.getMessage()
            ));
        }
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
            String userName = userService.getUserNameByEmail(authentication.getName());

            return ResponseEntity.ok().body(Map.of(
                    "message","로그인 성공",
                    "email",authentication.getName(),
                    "name", userName
            ));
        }catch (Exception e){
            return ResponseEntity.status(401).body(Map.of(
                    "message", "아이디 또는 비밀번호가 틀렸습니다."
            ));
        }
    }

    @GetMapping("/name")
    public ResponseEntity<?> getName(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(401).body(Map.of(
                    "message", "로그인이 필요합니다."
            ));
        }

        String email = authentication.getName();
        String userName = userService.getUserNameByEmail(email);

        return ResponseEntity.ok(userName);
    }

}
