package com.rainbow.team.controller;

import com.rainbow.common.dto.ResponseDto;
import com.rainbow.team.dto.CreateTeamInput;
import com.rainbow.team.dto.DeleteTeamInput;
import com.rainbow.team.dto.FilterTeamInput;
import com.rainbow.team.dto.UpdateTeamInput;
import com.rainbow.team.entity.Team;
import com.rainbow.team.service.TeamService;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TeamControllerImpl implements TeamController {

    private final TeamService teamService;

    public TeamControllerImpl(TeamService teamService) {
        this.teamService = teamService;
    }

    @Override
    public ResponseDto<Team> createTeam(@RequestBody CreateTeamInput createTeamInput) {
        return this.teamService.createTeam(createTeamInput);
    }

    @Override
    public ResponseDto<Team> updateTeam(@RequestParam(name = "teamId") Long teamId,
        @RequestBody UpdateTeamInput updateTeamInput) {
        return this.teamService.updateTeam(teamId, updateTeamInput);
    }

    @Override
    public ResponseDto<Team> deleteTeam(@RequestBody DeleteTeamInput deleteTeamInput) {
        return this.teamService.deleteTeam(deleteTeamInput);
    }

    @Override
    public ResponseDto<List<Team>> findTeamByKeyword(@RequestBody FilterTeamInput filterTeamInput) {
        return this.teamService.findTeamByFilter(filterTeamInput);
    }

    @Override
    public ResponseDto<Team> findTeamById(@RequestParam(name = "teamId") Long teamId) {
        return this.teamService.getTeamById(teamId);
    }

    @Override
    public ResponseDto<Team> findTeamByName(@RequestParam(name = "name") String name) {
        return this.teamService.getTeamByName(name);
    }
}
