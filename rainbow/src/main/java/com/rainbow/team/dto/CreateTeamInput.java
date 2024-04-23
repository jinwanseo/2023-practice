package com.rainbow.team.dto;

import com.rainbow.team.entity.TeamLevel;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateTeamInput {

    private String name;
    private Integer order;
    private TeamLevel level;
    private Optional<Long> parentId = Optional.empty();
}
