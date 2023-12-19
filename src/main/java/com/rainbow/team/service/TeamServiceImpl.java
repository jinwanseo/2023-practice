package com.rainbow.team.service;

import com.rainbow.common.dto.ResponseDto;
import com.rainbow.common.dto.ResponseFailBody;
import com.rainbow.common.dto.ResponseSuccessBody;
import com.rainbow.team.dto.CreateTeamInput;
import com.rainbow.team.dto.DeleteTeamInput;
import com.rainbow.team.dto.FilterTeamInput;
import com.rainbow.team.dto.UpdateTeamInput;
import com.rainbow.team.entity.Team;
import com.rainbow.team.repository.TeamRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import java.util.List;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

@Service
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;

    public TeamServiceImpl(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public ResponseDto<Team> createTeam(CreateTeamInput createTeamInput) {
        try {
            Team team = this.teamRepository.create(createTeamInput);
            return new ResponseDto<>(
                new ResponseSuccessBody<>(
                    true, team
                ),
                HttpStatusCode.valueOf(200)
            );

        } catch (EntityNotFoundException e) {
            return new ResponseDto<>(
                new ResponseFailBody(
                    false, e.getMessage()
                ),
                HttpStatusCode.valueOf(404)
            );
        } catch (PersistenceException e) {
            return new ResponseDto<>(
                new ResponseFailBody(
                    false, e.getMessage()
                ),
                HttpStatusCode.valueOf(400)
            );

        }
    }

    @Override
    public ResponseDto<Team> updateTeam(Long id, UpdateTeamInput updateTeamInput) {
        try {
            Team update = this.teamRepository.update(id, updateTeamInput);
            return new ResponseDto<>(
                new ResponseSuccessBody<>(true, update),
                HttpStatusCode.valueOf(200)
            );
        } catch (EntityNotFoundException e) {
            return new ResponseDto<>(
                new ResponseFailBody(false, e.getMessage()),
                HttpStatusCode.valueOf(404)
            );
        } catch (PersistenceException e) {
            return new ResponseDto<>(
                new ResponseFailBody(false, e.getMessage()),
                HttpStatusCode.valueOf(400)
            );
        }
    }

    @Override
    public ResponseDto<List<Team>> findTeamByFilter(FilterTeamInput filterTeamInput) {
        List<Team> teams = this.teamRepository.findTeamsByFilter(filterTeamInput);
        return new ResponseDto<>(
            new ResponseSuccessBody<>(
                true, teams
            ),
            HttpStatusCode.valueOf(200)
        );
    }

    @Override
    public ResponseDto<Team> deleteTeam(DeleteTeamInput deleteTeamInput) {
        try {
            Team team = this.teamRepository.delete(deleteTeamInput.getTeamId());
            return new ResponseDto<>(
                new ResponseSuccessBody<>(true, team),
                HttpStatusCode.valueOf(200)
            );
        } catch (EntityNotFoundException e) {
            return new ResponseDto<>(
                new ResponseFailBody(false, e.getMessage()),
                HttpStatusCode.valueOf(404)
            );
        }
    }

    @Override
    public ResponseDto<Team> getTeamById(Long teamId) {
        return this.teamRepository.findById(teamId).map(t -> new ResponseDto<>(
            new ResponseSuccessBody<>(true, t),
            HttpStatusCode.valueOf(200)
        )).orElseGet(() -> new ResponseDto<>(
            new ResponseFailBody(false, "부서를 찾지 못했어요"),
            HttpStatusCode.valueOf(404)
        ));
    }

    @Override
    public ResponseDto<Team> getTeamByName(String name) {
        return this.teamRepository.findByName(name).map(t -> new ResponseDto<>(
            new ResponseSuccessBody<>(true, t),
            HttpStatusCode.valueOf(200)
        )).orElseGet(() -> new ResponseDto<>(
            new ResponseFailBody(false, "부서를 찾지 못했어요"),
            HttpStatusCode.valueOf(404)
        ));
    }
}
