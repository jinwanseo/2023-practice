package com.rainbow.task.repository;

import com.rainbow.task.dto.CreateTaskInput;
import com.rainbow.task.dto.DeleteTaskInput;
import com.rainbow.task.dto.FilterTaskInput;
import com.rainbow.task.dto.UpdateTaskInput;
import com.rainbow.task.entity.Task;
import java.util.List;
import java.util.Optional;

public interface TaskRepository {

    Task create(CreateTaskInput createTaskInput);


    Task update(Long id, UpdateTaskInput updateTaskInput);

    Task delete(DeleteTaskInput deleteTaskInput);

    List<Task> findTaskByFilter(FilterTaskInput filterTaskInput);

    Optional<Task> getById(Long id);

    Optional<Task> getByTitle(String title);
}
