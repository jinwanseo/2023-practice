package com.rainbow.team.controller;

import com.rainbow.common.dto.ResponseDto;
import com.rainbow.team.dto.CreateTeamInput;
import com.rainbow.team.entity.Team;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "부서 관리", description = "부서 관리 API")
@RequestMapping("/api/teams")
public interface TeamController {

    @Operation(
        summary = "부서 등록",
        description = "부서 등록 요청 API"
    )
    @PostMapping("/create")
    ResponseDto<Team> createTeam(CreateTeamInput createTeamInput);

}
