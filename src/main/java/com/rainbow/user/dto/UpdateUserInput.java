package com.rainbow.user.dto;

import com.rainbow.user.entity.RoleType;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class UpdateUserInput {

    private Optional<String> name = Optional.empty();
    private Optional<String> email = Optional.empty();
    private Optional<RoleType> role = Optional.empty();
    private Optional<Long> teamId = Optional.empty();
//    private Optional<Team> team = Optional.empty();
}
