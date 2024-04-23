package com.rainbow.task.repository;

import com.rainbow.bot.repository.BotRepository;
import com.rainbow.task.dto.CreateTaskInput;
import com.rainbow.task.dto.DeleteTaskInput;
import com.rainbow.task.dto.FilterTaskInput;
import com.rainbow.task.dto.UpdateTaskInput;
import com.rainbow.task.entity.Task;
import com.rainbow.team.entity.Team;
import com.rainbow.team.repository.TeamRepository;
import com.rainbow.user.entity.User;
import com.rainbow.user.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public class MemoryTaskRepository implements TaskRepository {

    private final Map<Long, Task> tasks = new ConcurrentHashMap<>();

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final BotRepository botRepository;

    public MemoryTaskRepository(
        UserRepository userRepository,
        TeamRepository teamRepository,
        BotRepository botRepository
    ) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.botRepository = botRepository;
    }

    @Override
    public Task create(CreateTaskInput createTaskInput) {
        // 1. 이름 중복 확인
        this.getByTitle(createTaskInput.getTitle()).ifPresent(t -> {
            throw new EntityExistsException("같은 이름의 과제가 이미 있어요");
        });

        // 2. 부서 확인
        Optional<Team> searchTeam = this.teamRepository.findById(createTaskInput.getTeamId());
        if (searchTeam.isEmpty()) {
            throw new EntityNotFoundException("부서 정보를 찾을수 없어요");
        }
        Team team = searchTeam.get();

        // 3. 유저 확인
        List<User> users = new ArrayList<>();
        createTaskInput.getManagerPkList().forEach(userId -> {
            Optional<User> searchUser = this.userRepository.findById(userId);
            if (searchUser.isEmpty()) {
                throw new EntityNotFoundException("유저를 찾을수 없어요");
            }
            users.add(searchUser.get());
        });

        // 4. Rpa Script Id 유효 확인
        Boolean checkedRpaScriptIsValid = this.botRepository.checkRpaScriptById(
            createTaskInput.getRpaScriptId());
        if (!checkedRpaScriptIsValid) {
            throw new EntityNotFoundException("Rpa Script를 찾을수 없어요");
        }

        // 5. 과제 생성
        Task task = new Task();
        task.setId((long) this.tasks.size());
        task.setTitle(createTaskInput.getTitle());
        task.setUseYn(createTaskInput.getUseYn());
        task.setRpaScriptId(createTaskInput.getRpaScriptId());
        task.setOrder(createTaskInput.getOrder());
        task.setTeam(team);

        // 6. 과제 / 유저 리스트 연결
        task.setManagers(users);
        // 7. 과제 저장
        this.tasks.put(task.getId(), task);
        return task;
    }

    @Override
    public Task update(Long id, UpdateTaskInput updateTaskInput) {
        // 1. Task 확인
        Optional<Task> searchTask = this.getById(id);
        if (searchTask.isEmpty()) {
            throw new EntityNotFoundException("수정할 과제를 찾지 못했어요");
        }
        Task task = searchTask.get();
        // 2. 이름 중복 확인
        updateTaskInput.getTitle().flatMap(this::getByTitle).ifPresent(t -> {
            throw new EntityExistsException("같은 이름의 과제가 있어요");
        });

        // 3. RpaScriptId 검증
        updateTaskInput.getRpaScriptId().ifPresent(
            rpaScriptId -> {
                Boolean checkedRpaScriptIsValid = this.botRepository.checkRpaScriptById(
                    rpaScriptId);
                if (!checkedRpaScriptIsValid) {
                    throw new EntityNotFoundException("Rpa Script를 찾을수 없어요");
                }
            }
        );

        updateTaskInput.getTitle().ifPresent(task::setTitle);
        updateTaskInput.getUseYn().ifPresent(task::setUseYn);
        updateTaskInput.getRpaScriptId().ifPresent(task::setRpaScriptId);
        updateTaskInput.getOrder().ifPresent(task::setOrder);

        // 3. team 설정
        updateTaskInput.getTeamId().ifPresent(
            teamId -> {
                Optional<Team> searchTeam = this.teamRepository.findById(teamId);
                if (searchTeam.isEmpty()) {
                    throw new EntityNotFoundException("부서 정보를 찾을수 없어요.");
                }
                task.setTeam(searchTeam.get());
            }
        );

        // 4. 유저 설정
        updateTaskInput.getManagerPkList().ifPresent(list -> {
            List<User> users = new ArrayList<>();
            for (Long userId : list) {
                Optional<User> searchUser = this.userRepository.findById(userId);
                if (searchUser.isEmpty()) {
                    throw new EntityNotFoundException("유저를 찾을 수 없어요");
                }
                users.add(searchUser.get());
            }
            task.setManagers(users);
        });

        return task;
    }

    @Override
    public Task delete(DeleteTaskInput deleteTaskInput) {
        Optional<Task> searchTask = this.getById(deleteTaskInput.getTaskId());
        if (searchTask.isEmpty()) {
            throw new EntityNotFoundException("삭제할 과제가 없어요");
        }
        Task task = searchTask.get();
        this.tasks.remove(task.getId());
        return task;
    }

    @Override
    public List<Task> findTaskByFilter(FilterTaskInput filterTaskInput) {
        return null;
    }

    @Override
    public Optional<Task> getById(Long id) {
        return Optional.ofNullable(this.tasks.get(id));
    }

    @Override
    public Optional<Task> getByTitle(String title) {
        return this.tasks.values().stream().filter(t -> t.getTitle().equals(title)).findAny();
    }

}
