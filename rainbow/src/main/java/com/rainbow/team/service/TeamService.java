package com.rainbow.team.service;

import com.rainbow.common.dto.ResponseDto;
import com.rainbow.team.dto.CreateTeamInput;
import com.rainbow.team.dto.DeleteTeamInput;
import com.rainbow.team.dto.FilterTeamInput;
import com.rainbow.team.dto.UpdateTeamInput;
import com.rainbow.team.entity.Team;
import java.util.List;

public interface TeamService {

    ResponseDto<Team> createTeam(CreateTeamInput createTeamInput);

    ResponseDto<Team> updateTeam(Long id, UpdateTeamInput updateTeamInput);

    ResponseDto<List<Team>> findTeamByFilter(FilterTeamInput filterTeamInput);

    ResponseDto<Team> deleteTeam(DeleteTeamInput deleteTeamInput);

    ResponseDto<Team> getTeamById(Long teamId);

    ResponseDto<Team> getTeamByName(String name);

}
