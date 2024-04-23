from fastapi import Depends

from common.database.db import Session, get_db
from task.repository.task_respository import TaskRepository
from task.service.task_service import TaskService
from user.repository.user_repository import UserRepository
from user.service.user_service import UserService


def get_task_repository(db: Session = Depends(get_db)):
    return TaskRepository(db)


def get_task_service(task_repository: TaskRepository = Depends(get_task_repository)):
    return TaskService(task_repository)


def get_user_repository(db: Session = Depends(get_db)):
    return UserRepository(db)


def get_user_service(user_repository: UserRepository = Depends(get_user_repository)):
    return UserService(user_repository)
