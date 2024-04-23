package com.rainbow.user.service;

import com.rainbow.common.dto.ResponseDto;
import com.rainbow.common.dto.ResponseFailBody;
import com.rainbow.common.dto.ResponseSuccessBody;
import com.rainbow.team.entity.Team;
import com.rainbow.team.repository.TeamRepository;
import com.rainbow.user.dto.CreateUserInput;
import com.rainbow.user.entity.User;
import com.rainbow.user.dto.DeleteUserInput;
import com.rainbow.user.dto.FilterUserInput;
import com.rainbow.user.dto.UpdateUserInput;
import com.rainbow.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final TeamRepository teamRepository;

    public UserServiceImpl(UserRepository userRepository, TeamRepository teamRepository) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
    }

    @Override
    public ResponseDto<User> createUser(CreateUserInput createUserInput) {
        User user = new User(createUserInput);
        createUserInput.getTeamId().ifPresent(teamId -> {
            Optional<Team> team = this.teamRepository.findById(teamId);
            if (team.isEmpty()) {
                throw new EntityNotFoundException("부서를 찾지 못했어요");
            }
            user.setTeam(team.get());
        });
        User createdUser = this.userRepository.create(user);
        return new ResponseDto<>(
            new ResponseSuccessBody<>(true, createdUser),
            HttpStatusCode.valueOf(200)
        );
    }

    @Override
    public ResponseDto<User> updateUser(Long userId, UpdateUserInput updateUserInput) {
        User user = this.userRepository.update(userId, updateUserInput);
        return new ResponseDto<>(
            new ResponseSuccessBody<>(true, user),
            HttpStatusCode.valueOf(200)
        );
    }

    @Override
    public ResponseDto<List<User>> findUserByFilter(FilterUserInput filterUserInput) {
        List<User> usersByFilter = this.userRepository.findUsersByFilter(filterUserInput);
        return new ResponseDto<>(
            new ResponseSuccessBody<>(true, usersByFilter),
            HttpStatusCode.valueOf(200)
        );
    }

    @Override
    public ResponseDto<User> deleteUser(DeleteUserInput deleteUserInput) {
        User user = this.userRepository.delete(deleteUserInput.getUserId());
        return new ResponseDto<>(
            new ResponseSuccessBody<>(true, user),
            HttpStatusCode.valueOf(200)
        );
    }

    @Override
    public ResponseDto<User> getProfileById(Long userId) {
        return this.userRepository.findById(userId).map(user ->
            new ResponseDto<>(
                new ResponseSuccessBody<>(true, user),
                HttpStatusCode.valueOf(200)
            )
        ).orElseGet(() -> new ResponseDto<>(
            new ResponseFailBody(false, "유저 정보 없음"),
            HttpStatusCode.valueOf(404)));
    }

    @Override
    public ResponseDto<User> getProfileByName(String name) {
        return this.userRepository.findByName(name).map(user -> new ResponseDto<>(
                new ResponseSuccessBody<>(true, user),
                HttpStatusCode.valueOf(200)
            )
        ).orElseGet(() -> new ResponseDto<>(
            new ResponseFailBody(false, "유저 정보 없음"),
            HttpStatusCode.valueOf(404)));
    }
}
