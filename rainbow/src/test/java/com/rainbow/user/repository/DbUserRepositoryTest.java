package com.rainbow.user.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import com.rainbow.team.entity.Team;
import com.rainbow.team.repository.TeamRepository;
import com.rainbow.user.dto.CreateUserInput;
import com.rainbow.user.dto.FilterUserInput;
import com.rainbow.user.dto.UpdateUserInput;
import com.rainbow.user.entity.RoleType;
import com.rainbow.user.entity.User;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;


@SpringBootTest
@Transactional
class DbUserRepositoryTest {

    private final UserRepository userRepository;
    private final TeamRepository teamRepository;

    @Autowired
    public DbUserRepositoryTest(UserRepository userRepository, TeamRepository teamRepository) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
    }

    @Test
    @DisplayName("유저 생성, 유저 확인")
    void createUserSuccess() {
        CreateUserInput createUserInput = getCreateUserInput();
        User createUser = getCreateUser(createUserInput);

        assertThat(createUser.getName()).isEqualTo(createUserInput.getName());
    }

    @Test
    @DisplayName("같은 유저 생성, 중복 에러")
    void createUserDuplicateFailed() {
        // given
        CreateUserInput createUserInput = getCreateUserInput();
        getCreateUser(createUserInput);

        // when, then
        assertThrows(
            DataIntegrityViolationException.class,
            () -> getCreateUser(createUserInput)
        );
    }

    @Test
    @DisplayName("다른 유저 생성, 성공")
    void createUsersSuccess() {
        // given
        CreateUserInput createUserInput = getCreateUserInput();
        User originalUser = getCreateUser(createUserInput);

        // when
        createUserInput.setEmail("admin@naver.com");
        createUserInput.setName("admin");

        User newUser = getCreateUser(createUserInput);

        // then
        assertThat(newUser.getLoginId()).isEqualTo(originalUser.getLoginId());
        assertThat(newUser).isNotEqualTo(originalUser);
    }


    @Test
    @DisplayName("유저 수정, 성공")
    void updateUserSuccess() {
        CreateUserInput createUserInput = getCreateUserInput();
        User user = getCreateUser(createUserInput);

        UpdateUserInput updateUserInput = new UpdateUserInput();
        updateUserInput.setName(Optional.of("admin"));

        User update = this.userRepository.update(user.getId(), updateUserInput);

        assertThat(update.getName()).isEqualTo("admin");
    }

    @Test
    @DisplayName("유저 수정, 실패 (중복된 이름)")
    void updateUserDuplicateNameFailed() {
        createUserList(); // admin1 포함

        // 새 유저 생성
        CreateUserInput createUserInput = getCreateUserInput();
        User user = getCreateUser(createUserInput);

        // 새 유저 업데이트 (중복된 이름)
        UpdateUserInput updateUserInput = new UpdateUserInput();
        updateUserInput.setName(Optional.of("admin1"));

        // 중복 에러 출력
        assertThrows(
            DataIntegrityViolationException.class,
            () -> this.userRepository.update(user.getId(), updateUserInput)
        );
    }

    @Test
    @DisplayName("유저 삭제 : 성공")
    void deleteUserById() {
        createUserList();

        List<User> users = this.userRepository.findUsersByFilter(new FilterUserInput());
        User delete = this.userRepository.delete(users.get(0).getId());

        Optional<User> byId = this.userRepository.findById(delete.getId());
        assertThat(byId).isEmpty();
    }

    @Test
    @DisplayName("유저 삭제 : 실패 (Id 조회 실패)")
    void deleteUserByIdFailed() {
        assertThrows(JpaObjectRetrievalFailureException.class,
            () -> this.userRepository.delete(21237123712938L));
    }

    @Test
    @DisplayName("유저 검색 : 이름 검색 성공")
    void findByName() {
        createUserList();

        Optional<User> byName = this.userRepository.findByName("admin1");
        assertThat(byName).isNotEmpty();
    }

    @Test
    @DisplayName("유저 검색 : 아이디 검색 성공")
    void findById() {
        createUserList();

        List<User> users = this.userRepository.findUsersByFilter(new FilterUserInput());
        Optional<User> user = this.userRepository.findById(users.get(0).getId());

        assertThat(user).isNotEmpty();
    }

    @Test
    @DisplayName("유저 목록 검색 : 키워드 검색 성공")
    void findUsersByFilter() {
        createUserList();
        List<User> users = this.userRepository.findUsersByFilter(new FilterUserInput(
            Optional.of("ADMIN")));

        assertThat(users.size()).isBetween(0, 20);
    }

    @Test
    @DisplayName("유저 목록 검색 : 키워드 검색 - 결과 없음")
    void findUsersByFilterNoUsers() {
        createUserList();
        List<User> users = this.userRepository.findUsersByFilter(
            new FilterUserInput(Optional.of("manager")));

        assertThat(users.size()).isEqualTo(0);
    }


    CreateUserInput getCreateUserInput() {
        return new CreateUserInput("jinwanseo", "jinwanseo@gmail.com",
            "admin", "12345", RoleType.ADMIN, Optional.empty());
    }

    User getCreateUser(CreateUserInput createUserInput) throws EntityNotFoundException {
        User user = new User(createUserInput);
        createUserInput.getTeamId().ifPresent(teamId -> {
            Optional<Team> team = this.teamRepository.findById(teamId);
            if (team.isEmpty()) {
                throw new EntityNotFoundException("부서를 찾지 못했어요");
            }
            user.setTeam(team.get());
        });

        return this.userRepository.create(user);
    }

    void createUserList() {
        for (int i = 0; i < 10; i++) {
            CreateUserInput createUserInput = new CreateUserInput();
            createUserInput.setEmail("admin" + i + (i % 2 == 1 ? "@naver.com" : "@gmail.com"));
            createUserInput.setRole(i % 2 == 0 ? RoleType.ADMIN : RoleType.CLIENT);
            createUserInput.setName("admin" + i);
            createUserInput.setLoginId("admin" + i);
            createUserInput.setLoginPw("12345");

            this.getCreateUser(createUserInput);
        }
    }
}