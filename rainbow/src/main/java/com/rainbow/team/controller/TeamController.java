package com.rainbow.team.controller;

import com.rainbow.common.dto.ResponseDto;
import com.rainbow.team.dto.CreateTeamInput;
import com.rainbow.team.dto.DeleteTeamInput;
import com.rainbow.team.dto.FilterTeamInput;
import com.rainbow.team.dto.UpdateTeamInput;
import com.rainbow.team.entity.Team;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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

    @Operation(
        summary = "부서 수정",
        description = "부서 수정 요청 API"
    )
    @PatchMapping("/update")
    ResponseDto<Team> updateTeam(Long teamId, UpdateTeamInput updateTeamInput);

    @Operation(
        summary = "부서 삭제",
        description = "부서 삭제 요청 API"
    )
    @DeleteMapping("/delete")
    ResponseDto<Team> deleteTeam(DeleteTeamInput deleteTeamInput);

    @Operation(
        summary = "부서 리스트",
        description = "부서 리스트 요청 API"
    )
    @PostMapping("/list")
    ResponseDto<List<Team>> findTeamByKeyword(FilterTeamInput filterTeamInput);

    @Operation(
        summary = "부서 조회 (Id)",
        description = "부서 조회 요청 API (Id)"
    )
    @GetMapping("/detail/id")
    ResponseDto<Team> findTeamById(Long teamId);

    @Operation(
        summary = "부서 조회 (Name)",
        description = "부서 조회 요청 API (Name)"
    )
    @GetMapping("/detail/name")
    ResponseDto<Team> findTeamByName(String name);
}
