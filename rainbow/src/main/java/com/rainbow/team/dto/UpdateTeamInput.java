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
public class UpdateTeamInput {

    private Optional<String> name = Optional.empty();

    private Optional<Integer> order = Optional.empty();

    private Optional<TeamLevel> level = Optional.empty();

    private Optional<Long> parentId = Optional.empty();
}
