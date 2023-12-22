from common.database.db import Session
from task.dto.filter_task_input import FilterTaskInput
from task.dto.update_task_input import UpdateTaskInput
from task.entity.task import Task


class TaskRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def find_by_id(self, task_id: int) -> Task:
        return self.db.query(Task).filter(Task.id == task_id).first()

    def find_by_title(self, task_title: str) -> Task:
        return self.db.query(Task).filter(Task.title == task_title).first()

    def find_filter_list(self, filter_task_input: FilterTaskInput):
        query = self.db.query(Task)
        query = query.filter(Task.title.contains(filter_task_input.keyword))
        query = query.filter(Task.description.contains(filter_task_input.keyword))
        query = query.filter(Task.keyword.contains(filter_task_input.keyword))
        return query.get_all()

    def create(self, task: Task) -> Task:
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def update(self, task_id: int, update_task_input: UpdateTaskInput) -> Task:
        task = self.find_by_id(task_id)

        input_dict = update_task_input.dict(exclude_unset=True)
        for key, value in input_dict.items():
            setattr(task, key, value)

        self.db.commit()
        self.db.refresh(task)
        return task

    def delete(self, task_id: int) -> Task:
        task = self.find_by_id(task_id)
        self.db.delete(task)
        self.db.commit()
        self.db.refresh(task)
        return task
