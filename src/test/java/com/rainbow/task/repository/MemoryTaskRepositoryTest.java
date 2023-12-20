package com.rainbow.task.repository;

import static org.junit.jupiter.api.Assertions.*;

import com.rainbow.bot.repository.BotRepository;
import com.rainbow.bot.repository.ProxyBotRepository;
import com.rainbow.common.entity.CoreEntity;
import com.rainbow.task.dto.CreateTaskInput;
import com.rainbow.task.dto.UpdateTaskInput;
import com.rainbow.task.entity.Task;
import com.rainbow.team.dto.CreateTeamInput;
import com.rainbow.team.entity.Team;
import com.rainbow.team.entity.TeamLevel;
import com.rainbow.team.repository.MemoryTeamRepository;
import com.rainbow.team.repository.TeamRepository;
import com.rainbow.user.dto.CreateUserInput;
import com.rainbow.user.entity.RoleType;
import com.rainbow.user.entity.User;
import com.rainbow.user.repository.MemoryUserRepository;
import com.rainbow.user.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootTest
class MemoryTaskRepositoryTest {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final BotRepository botRepository;
    private final TaskRepository taskRepository;


    @Autowired
    public MemoryTaskRepositoryTest(WebClient webClient, Environment environment) {
        this.teamRepository = new MemoryTeamRepository();
        this.userRepository = new MemoryUserRepository(this.teamRepository);
        this.botRepository = new ProxyBotRepository(webClient, environment);
        this.taskRepository = new MemoryTaskRepository(this.userRepository, this.teamRepository,
            this.botRepository);
    }


    Team getCreateTeam() {
        CreateTeamInput createTeamInput = new CreateTeamInput(
            "sample",
            0,
            TeamLevel.ROOT,
            Optional.empty()
        );

        return this.teamRepository.create(createTeamInput);
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

    List<User> getCreateUserList() {
        List<User> users = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            CreateUserInput createUserInput = new CreateUserInput();
            createUserInput.setEmail("admin" + i + (i % 2 == 1 ? "@naver.com" : "@gmail.com"));
            createUserInput.setRole(i % 2 == 0 ? RoleType.ADMIN : RoleType.CLIENT);
            createUserInput.setName("admin" + i);
            createUserInput.setLoginId("admin" + i);
            createUserInput.setLoginPw("12345");

            users.add(
                this.getCreateUser(createUserInput)
            );
        }
        return users;
    }

    CreateTaskInput getDefaultTaskInput() {
        Team createTeam = getCreateTeam();
        List<User> createUserList = getCreateUserList();
        List<Long> pkList = createUserList.stream().map(CoreEntity::getId).toList();

        CreateTaskInput createTaskInput = new CreateTaskInput();
        createTaskInput.setTitle("sample");
        createTaskInput.setOrder(1);
        createTaskInput.setUseYn(true);
        createTaskInput.setRpaScriptId(9);
        createTaskInput.setTeamId(createTeam.getId());
        createTaskInput.setManagerPkList(pkList);
        return createTaskInput;
    }

    @Test
    @DisplayName("과제 생성 : 성공 -")
    void createTaskSuccess() {
        CreateTaskInput defaultTaskInput = getDefaultTaskInput();

        Task task = this.taskRepository.create(defaultTaskInput);
        System.out.println("task.getTitle() = " + task.getTitle());

        List<User> managers = task.getManagers();

        for (User manager : managers) {
            System.out.println("manager.getName() = " + manager.getName());
        }

        Assertions.assertThat(task).isNotNull();
    }

    @Test
    @DisplayName("과제 생성 : 잘못된 RpaScriptId 요청 Exception")
    void createTaskRpaScriptIdFailed() {
        CreateTaskInput defaultTaskInput = getDefaultTaskInput();
        defaultTaskInput.setRpaScriptId(999999);

        assertThrows(
            EntityNotFoundException.class,
            () -> this.taskRepository.create(defaultTaskInput)
        );
    }

    @Test
    @DisplayName("과제 생성 : 잘못된 TeamId 요청 Exception")
    void createTaskTeamIdFailed() {
        CreateTaskInput defaultTaskInput = getDefaultTaskInput();
        defaultTaskInput.setTeamId(99999L);
        assertThrows(
            EntityNotFoundException.class,
            () -> this.taskRepository.create(defaultTaskInput)
        );
    }

    @Test
    @DisplayName("과제 생성 : 잘못된 유저 Pk LIST 전달시 Exception")
    void createTaskManagerPkListFailed() {
        CreateTaskInput defaultTaskInput = getDefaultTaskInput();
        defaultTaskInput.setManagerPkList(List.of(213123L, 23423142134L));
        assertThrows(
            EntityNotFoundException.class,
            () -> this.taskRepository.create(defaultTaskInput)
        );
    }

    @Test
    @DisplayName("과제 생성 : 같은 과제명 Duplicate Exception")
    void createTaskTitleDuplicateFailed() {
        CreateTaskInput defaultTaskInput = getDefaultTaskInput();
        this.taskRepository.create(defaultTaskInput);
        assertThrows(
            EntityExistsException.class,
            () -> this.taskRepository.create(defaultTaskInput)
        );
    }


    @Test
    @DisplayName("과제 수정 : 성공")
    void updateTaskSuccess() {
        CreateTaskInput defaultTaskInput = getDefaultTaskInput();
        Task task = this.taskRepository.create(defaultTaskInput);

        UpdateTaskInput updateTaskInput = new UpdateTaskInput();
        updateTaskInput.setTitle(Optional.of("hello"));

        Task update = this.taskRepository.update(task.getId(), updateTaskInput);

        Assertions.assertThat(update.getTitle()).isEqualTo("hello");
    }

    @Test
    @DisplayName("과제 수정 : 잘못된 TeamId 변경 요청 Exception")
    void updateTaskTeamIdFailed() {
        CreateTaskInput defaultTaskInput = getDefaultTaskInput();
        Task task = this.taskRepository.create(defaultTaskInput);

        UpdateTaskInput updateTaskInput = new UpdateTaskInput();
        updateTaskInput.setTeamId(Optional.of(1239812983L));

        assertThrows(
            EntityNotFoundException.class,
            () -> this.taskRepository.update(task.getId(), updateTaskInput)
        );
    }

    @Test
    @DisplayName("과제 수정 : 잘못된 RpaScriptId 수정 요청 Exception")
    void updateTaskRpaScriptIdFailed() {
        CreateTaskInput defaultTaskInput = getDefaultTaskInput();
        Task task = this.taskRepository.create(defaultTaskInput);

        UpdateTaskInput updateTaskInput = new UpdateTaskInput();
        updateTaskInput.setRpaScriptId(Optional.of(123871238));

        assertThrows(
            EntityNotFoundException.class,
            () -> this.taskRepository.update(task.getId(), updateTaskInput)
        );
    }

    @Test
    @DisplayName("과제 수정 : 같은 과제명으로 수정 요청 Exception")
    void updateTaskDuplicateTitleFailed() {
        CreateTaskInput defaultTaskInput = getDefaultTaskInput();
        Task task = this.taskRepository.create(defaultTaskInput);

        defaultTaskInput.setTitle("hello!!");
        Task task2 = this.taskRepository.create(defaultTaskInput);

        UpdateTaskInput updateTaskInput = new UpdateTaskInput();
        updateTaskInput.setTitle(Optional.ofNullable(task.getTitle()));

        assertThrows(
            EntityExistsException.class,
            () -> this.taskRepository.update(task2.getId(), updateTaskInput),
            "같은 이름의 부서가 있어요."
        );
    }

    @Test
    @DisplayName("과제 수정 : 과제 pk 틀렸을때 Exception")
    void updateTaskPkFailed() {
        CreateTaskInput defaultTaskInput = getDefaultTaskInput();
        Task task = this.taskRepository.create(defaultTaskInput);
        UpdateTaskInput updateTaskInput = new UpdateTaskInput();
        updateTaskInput.setTitle(Optional.ofNullable(task.getTitle()));

        assertThrows(
            EntityNotFoundException.class,
            () -> this.taskRepository.update(129381293L, updateTaskInput),
            "수정할 과제를 찾지 못했어요"
        );
    }
}