package com.rainbow.team.repository;

import com.rainbow.team.dto.CreateTeamInput;
import com.rainbow.team.dto.FilterTeamInput;
import com.rainbow.team.dto.UpdateTeamInput;
import com.rainbow.team.entity.Team;

import com.rainbow.team.entity.TeamLevel;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.PessimisticLockException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public class MemoryTeamRepository implements TeamRepository {

    private final Map<Long, Team> teams = new ConcurrentHashMap<>();

    @Override
    public Team create(CreateTeamInput createTeamInput) {
        this.findByName(createTeamInput.getName()).ifPresent(t -> {
            throw new EntityExistsException("같은 이름의 부서가 있어요.");
        });

        Team team = new Team();
        team.setId((long) this.teams.size());
        team.setOrder(createTeamInput.getOrder());
        team.setName(createTeamInput.getName());

        // NODE 부서 일시
        if (createTeamInput.getLevel() == TeamLevel.NODE) {
            // 상위 부서 Id 없을시
            if (createTeamInput.getParentId().isEmpty()) {
                throw new PersistenceException("하위 부서는 상위 부서를 꼭 선택해야해요.");
            }
            Long parentId = createTeamInput.getParentId().get();
            // 상위 부서 없을시
            Optional<Team> parentTeam = this.findById(parentId);
            if (parentTeam.isEmpty()) {
                throw new EntityNotFoundException("상위 부서가 없어요. 다시 확인해주세요");
            }

            // 타입, 상위 부서 설정
            team.setLevel(createTeamInput.getLevel());
            team.setParent(parentTeam.get());

            // 영속성 컨텍스트를 위한 코드 (없어도 Transaction 재시작시 동작하는데 문제 없음)
            parentTeam.get().getChildren().add(team);
        }
        // ROOT 부서 일시
        if (createTeamInput.getLevel() == TeamLevel.ROOT) {
            // 상위 부서 Id 있을시
            if (createTeamInput.getParentId().isPresent()) {
                throw new PersistenceException("상위 부서는 상위 부서 선택을 할수 없어요.");
            }
            team.setLevel(createTeamInput.getLevel());
            team.setParent(null);
        }

        this.teams.put(team.getId(), team);
        return team;
    }

    @Override
    public Team update(Long id, UpdateTeamInput updateTeamInput) {
        Optional<Team> team = this.findById(id);
        if (team.isEmpty()) {
            throw new EntityNotFoundException("수정할 부서를 못찾았어요");
        }
        // 부서 수정
        Team updateTeam = team.get();
        updateTeamInput.getName().ifPresent(updateTeam::setName);
        updateTeamInput.getOrder().ifPresent(updateTeam::setOrder);
        // 부서 타입, 상위 부서 변경
        updateTeamInput.getLevel().ifPresent(level -> {
            // NODE 로 변경시
            if (level == TeamLevel.NODE) {
                // 하위 부서 있을시 에러 반환
                if (!updateTeam.getChildren().isEmpty()) {
                    throw new PersistenceException("하위 부서 변경시, 하위 부서가 있으면 부서 타입 변경이 안되요.");
                }
                // 상위 부서 Id 없을시 에러 반환
                if (updateTeamInput.getParentId().isEmpty()) {
                    throw new PersistenceException("하위 부서는 상위 부서가 필수로 선택이 되어 있어야해요.");
                }
                Long parentId = updateTeamInput.getParentId().get();
                Optional<Team> parentTeam = this.findById(parentId);
                // 상위 부서 없을시 에러 반환
                if (parentTeam.isEmpty()) {
                    throw new EntityNotFoundException("상위 부서를 못찾았어요");
                }

                // 변경 값 적용 (부서 타입, 상위 부서)
                updateTeam.setLevel(level);
                updateTeam.setParent(parentTeam.get());
            }
            // ROOT 로 변경
            if (level == TeamLevel.ROOT) {
                // 상위 부서 설정이 있을시
                if (updateTeamInput.getParentId().isPresent()) {
                    throw new PersistenceException("상위 부서는 상위 부서를 가질수 없어요.");
                }
                updateTeam.setLevel(level);
                updateTeam.setParent(null);
            }
        });

        return updateTeam;
    }

    @Override
    public Optional<Team> findById(Long id) {
        try {
            return Optional.ofNullable(this.teams.get(id));
        } catch (NullPointerException e) {
            return Optional.empty();
        }
    }

    @Override
    public Optional<Team> findByName(String name) {
        return this.teams.values().stream().filter(t -> t.getName().equals(name)).findAny();
    }

    @Override
    public Team delete(Long id) {
        Optional<Team> team = this.findById(id);
        if (team.isEmpty()) {
            throw new EntityNotFoundException("삭제할 부서를 찾지 못했어요");
        }

        if (team.get().getLevel() == TeamLevel.ROOT && !team.get().getChildren().isEmpty()) {
            throw new PessimisticLockException("하위 부서를 가진 상위 부서는 삭제가 불가해요");
        }
        this.teams.remove(id);
        return team.get();
    }

    @Override
    public List<Team> findTeamsByFilter(FilterTeamInput filterTeamInput) {
        String keyword = filterTeamInput.getKeyword().orElse("").toLowerCase();
        return this.teams.values().stream().filter(
            team -> team.getName().contains(keyword)
        ).toList();
    }
}
