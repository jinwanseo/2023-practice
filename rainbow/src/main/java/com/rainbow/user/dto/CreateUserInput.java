package com.rainbow.user.dto;

import com.rainbow.user.entity.RoleType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserInput {

    private String name;
    private String email;

    private String loginId;
    private String loginPw;

    private RoleType role;

    private Optional<Long> teamId = Optional.empty();
}
