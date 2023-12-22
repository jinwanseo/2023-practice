from typing import List

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger

from task.dto.create_task_input import CreateTaskInput
from task.dto.delete_task_input import DeleteTaskInput
from task.dto.filter_task_input import FilterTaskInput
from task.dto.update_task_input import UpdateTaskInput
from task.entity.task import Task
from task.repository.task_respository import TaskRepository


class TaskService:
    def __init__(
        self,
        task_repository: TaskRepository,
    ) -> None:
        self.task_repository = task_repository
        self.scheduler = BackgroundScheduler(timezone="Asia/Seoul")
        # scheduler 가 start 아닐 때 만 실행
        if not self.scheduler.running:
            self.scheduler.start()

    def create_task(self, create_task_input: CreateTaskInput) -> Task:
        create_task = Task(**create_task_input.dict())
        task = self.task_repository.create(create_task)

        if task is not None:
            self.create_schedule(task)

        return task

    def update_task(self, task_id: int, update_task_input: UpdateTaskInput) -> Task:
        task = self.task_repository.update(task_id, update_task_input)

        if task is not None:
            self.update_schedule(task)

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

    def find_task_by_filter(self, filter_task_input: FilterTaskInput) -> List[Task]:
        filter_list = self.task_repository.find_filter_list(filter_task_input)
        return filter_list

    def job(self, task_id: int):
        # Task 정보 실시간 확인
        # deploy_yn, task 최신 정보 확인
        task = self.task_repository.find_by_id(task_id)

        if task is not None:
            print(f"실행 ->  {task.title}")

    def create_schedule(self, task: Task):
        schedule_id = f"task_{task.id}"

        self.scheduler.add_job(
            self.job,
            trigger=IntervalTrigger(seconds=task.interval),
            args=[task.id],
            id=schedule_id,
        )

    def update_schedule(self, task: Task):
        # 기존 스케줄 삭제
        self.delete_schedule(task.task_id)
        # 수정할 스케줄 (새로운 스케줄) 등록
        self.create_schedule(task)

    def delete_schedule(self, task_id: int):
        task = self.task_repository.find_by_id(task_id)
        if task is not None:
            schedule_id = f"task_{task.id}"
            self.scheduler.remove_job(schedule_id)

    def set_schedule_deploy_yn(self, task_id: int, deploy_yn: bool):
        task = self.task_repository.find_by_id(task_id)
        # deploy_yn 에 따라 Schedule 실행 여부 결정
        # True : Schedule 생성
        # False: Schedule 삭제
        if deploy_yn:
            self.create_schedule(task)
        else:
            self.delete_schedule(task_id)
