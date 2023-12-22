from task.dto.create_task_input import CreateTaskInput
from task.dto.delete_task_input import DeleteTaskInput
from task.dto.filter_task_input import FilterTaskInput
from task.dto.update_task_input import UpdateTaskInput
from task.entity.task import Task
from task.repository.task_respository import TaskRepository


class TaskService:
    def __init__(self, task_repository: TaskRepository) -> None:
        self.task_repository = task_repository

    def create_task(self, create_task_input: CreateTaskInput) -> Task:
        create_task = Task(**create_task_input.dict())
        task = self.task_repository.create(create_task)
        return task

    def update_task(self, task_id: int, update_task_input: UpdateTaskInput) -> Task:
        task = self.task_repository.update(task_id, update_task_input)
        return task

    def delete_task(self, delete_task_input: DeleteTaskInput) -> Task:
        task = self.task_repository.delete(delete_task_input.task_id)
        return task

    def find_task_by_id(self, task_id: int) -> Task:
        task = self.task_repository.find_by_id(task_id)
        return task

    def find_task_by_title(self, task_title: str) -> Task:
        task = self.task_repository.find_by_title(task_title)
        return task

    def find_task_by_filter(self, filter_task_input: FilterTaskInput):
        filter_list = self.task_repository.find_filter_list(filter_task_input.filter)
        return filter_list
