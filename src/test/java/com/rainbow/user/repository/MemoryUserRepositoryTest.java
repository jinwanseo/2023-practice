package com.rainbow.user.repository;

import com.rainbow.team.entity.Team;
import com.rainbow.team.repository.MemoryTeamRepository;
import com.rainbow.team.repository.TeamRepository;
import com.rainbow.user.dto.CreateUserInput;
import com.rainbow.user.dto.FilterUserInput;
import com.rainbow.user.dto.UpdateUserInput;
import com.rainbow.user.entity.RoleType;
import com.rainbow.user.entity.User;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @ title 단위 테스트 (memory data)
 */
class MemoryUserRepositoryTest {


    private TeamRepository teamRepository;
    private UserRepository userRepository;

    @BeforeEach
    void beforeTest() {
        this.teamRepository = new MemoryTeamRepository();
        this.userRepository = new MemoryUserRepository(this.teamRepository);
    }

    @Test
    @DisplayName("유저 생성 적용 확인")
    void createUser() {
        // given, when
        CreateUserInput createUserInput = new CreateUserInput("jinwanseo", "jinwanseo@gmail.com",
            "admin", "12345", RoleType.ADMIN, Optional.empty());
        User createUser = getCreateUser(createUserInput);

        //then
        assertThat(createUser.getName()).isEqualTo("jinwanseo");
    }

    @Test
    @DisplayName("부서 미적용시 Null 확인")
    void teamIsNull() {
        // given, when
        CreateUserInput createUserInput = new CreateUserInput("jinwanseo", "jinwanseo@gmail.com",
            "admin", "12345", RoleType.ADMIN, Optional.empty());
        User createUser = getCreateUser(createUserInput);

        //then
        assertThat(createUser.getTeam()).isNull();
    }

    @Test
    @DisplayName("유저와 관계형 team Id 없을시 에러")
    void teamQueryFailed() {
        // given, when
        CreateUserInput createUserInput = new CreateUserInput(
            "jinwanseo",
            "jinwanseo@gmail.com",
            "admin",
            "12345",
            RoleType.ADMIN,
            Optional.of(1L)
        );

        //then
        assertThrows(
            EntityNotFoundException.class,
            () -> this.getCreateUser(createUserInput),
            "부서를 찾지 못했어요"
        );
    }

    @Test
    @DisplayName("유저 업데이트 (이름)")
    void updateUser() {
        // given
        CreateUserInput createUserInput = new CreateUserInput("jinwanseo", "jinwanseo@gmail.com",
            "admin", "12345", RoleType.ADMIN, Optional.empty());
        User createUser = getCreateUser(createUserInput);
        UpdateUserInput updateUserInput = new UpdateUserInput();
        updateUserInput.setName(Optional.of("admin"));
        // when
        this.userRepository.update(0L, updateUserInput);
        User user = this.userRepository.findById(0L).get();

        // then
        assertThat(user.getId()).isEqualTo(createUser.getId());
        assertThat(user.getName()).isEqualTo("admin");
    }

    @Test
    @DisplayName("유저 리스트 필터 결과 (ok) : Role")
    void findUserByFilter() {
        createUserList();
        List<User> users = this.userRepository.findUsersByFilter(
            new FilterUserInput(Optional.of("ADMIN")));

        assertThat(users.size()).isEqualTo(5);
    }

    @Test
    @DisplayName("유저 리스트 필터 결과 (ok) : mail")
    void findUserListByFilter() {
        createUserList();
        List<User> users = this.userRepository.findUsersByFilter(
            new FilterUserInput(Optional.of("naver.com")));
        assertThat(users.size()).isEqualTo(5);
    }

    @Test
    @DisplayName("유저 삭제 결과 (ok)")
    void deleteUser() {
        createUserList();
        List<User> beforeUsers = this.userRepository.findUsersByFilter(new FilterUserInput());
        User user = this.userRepository.delete(1L);
        List<User> afterUsers = this.userRepository.findUsersByFilter(new FilterUserInput());

        assertThat(user.getId()).isEqualTo(1L);
        assertThat(afterUsers.size()).isEqualTo(beforeUsers.size() - 1);
    }

    @Test
    @DisplayName("유저 조회 (Id)")
    void getProfileById() {
        // given
        CreateUserInput createUserInput = new CreateUserInput("jinwanseo", "jinwanseo@gmail.com",
            "admin", "12345", RoleType.ADMIN, Optional.empty());
        User createUser = getCreateUser(createUserInput);
        User user = this.userRepository.findById(0L).get();
        assertThat(user).isEqualTo(createUser);
    }

    @Test
    @DisplayName("유저 조회 (Id) 실패")
    void getProfileByIdFailed() {
        // given
        CreateUserInput createUserInput = new CreateUserInput("jinwanseo", "jinwanseo@gmail.com",
            "admin", "12345", RoleType.ADMIN, Optional.empty());
        getCreateUser(createUserInput);
        Optional<User> user = this.userRepository.findById(1L);
        assertThat(user).isEmpty();
    }

    @Test
    @DisplayName("유저 조회 (Name) 성공")
    void getProfileByName() {
        CreateUserInput createUserInput = new CreateUserInput("jinwanseo", "jinwanseo@gmail.com",
            "admin", "12345", RoleType.ADMIN, Optional.empty());
        User createUser = getCreateUser(createUserInput);
        User user = this.userRepository.findByName("jinwanseo").get();
        assertThat(createUser).isEqualTo(user);
    }

    @Test
    @DisplayName("유저 조회 (Name) 실패")
    void getProfileByNameFailed() {
        CreateUserInput createUserInput = new CreateUserInput("jinwanseo", "jinwanseo@gmail.com",
            "admin", "12345", RoleType.ADMIN, Optional.empty());
        getCreateUser(createUserInput);
        Optional<User> admin = this.userRepository.findByName("admin");
        assertThat(admin).isEmpty();
    }

    @Test
    @DisplayName("유저 조회 (Keyword) 실패")
    void getUserListByKeywordFailed() {
        createUserList();
        List<User> users = this.userRepository.findUsersByFilter(
            new FilterUserInput(Optional.of("manager")));

        assertThat(users.size()).isEqualTo(0);
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