package com.rainbow.user.repository;

import com.rainbow.team.entity.Team;
import com.rainbow.team.repository.TeamRepository;
import com.rainbow.user.entity.User;
import com.rainbow.user.dto.FilterUserInput;
import com.rainbow.user.dto.UpdateUserInput;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 단위 테스트 전용 Memory Repository 입니다.
 */
public class MemoryUserRepository implements UserRepository {

    private final Map<Long, User> users = new ConcurrentHashMap<>();
    private final TeamRepository teamRepository;

    public MemoryUserRepository(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public User create(User user) {
        // id SET
        user.setId((long) this.users.size());
        this.users.put(user.getId(), user);
        return user;
    }

    @Override
    public User update(Long id, UpdateUserInput updateUserInput) {
        return this.findById(id).map(user -> {
            updateUserInput.getName().ifPresent(user::setName);
            updateUserInput.getEmail().ifPresent(user::setEmail);
            updateUserInput.getRole().ifPresent(user::setRole);
            if (updateUserInput.getTeamId().isPresent()) {
                Long teamId = updateUserInput.getTeamId().get();
                Optional<Team> team = this.teamRepository.findById(teamId);
                if (team.isEmpty()) {
                    throw new EntityNotFoundException("유저에 추가할 부서 정보가 없어요");
                }
                user.setTeam(team.get());
            }
            return user;
        }).orElseThrow(() -> new EntityNotFoundException("수정 할 유저 없음"));
    }

    @Override
    public User delete(Long id) {
        return this.findById(id).map(user -> {
            this.users.remove(id);
            return user;
        }).orElseThrow(() -> new EntityNotFoundException("삭제 할 유저 없음"));
    }

    @Override
    public Optional<User> findByName(String name) {
        return this.users.values().stream().filter(u -> u.getName().equals(name)).findAny();
    }

    @Override
    public Optional<User> findById(Long id) {
        try {
            return Optional.ofNullable(this.users.get(id));
        } catch (NullPointerException e) {
            return Optional.empty();
        }
    }


    @Override
    public List<User> findUsersByFilter(FilterUserInput filterUserInput) {
        return this.users.values().stream().filter(
            user -> matchesFilter(user, filterUserInput)
        ).toList();
    }

    private boolean matchesFilter(User user, FilterUserInput filterUserInput) {
        String searchKeyword = filterUserInput.getKeyword().orElse("");
        return user.getRole().toString().contains(searchKeyword) ||
            user.getName().contains(searchKeyword) ||
            user.getEmail().contains(searchKeyword);
    }
}
