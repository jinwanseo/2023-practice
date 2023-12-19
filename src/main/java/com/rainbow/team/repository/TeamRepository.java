package com.rainbow.team.repository;

import com.rainbow.team.dto.CreateTeamInput;
import com.rainbow.team.dto.FilterTeamInput;
import com.rainbow.team.dto.UpdateTeamInput;
import com.rainbow.team.entity.Team;

import java.util.List;
import java.util.Optional;

public interface TeamRepository {

    Team create(CreateTeamInput createTeamInput);

    Team update(Long id, UpdateTeamInput updateTeamInput);

    Optional<Team> findById(Long id);

    Optional<Team> findByName(String name);

    Team delete(Long id);

    List<Team> findTeamsByFilter(FilterTeamInput filterTeamInput);
}
