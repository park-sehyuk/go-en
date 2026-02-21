package com.project.goen.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class UserJoinDto {

    @Email(message = "이메일 형식이 아닙니다.")
    @NotBlank(message = "이메일을 작성해주세요.")
    private String email;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Length(min = 1)
    private String password;

    @NotBlank(message = "이름을 입력해주세요.")
    private String name;
}
