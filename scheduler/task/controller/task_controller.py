from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from starlette import status

from fast_config import get_task_service
from task.dto.create_task_input import CreateTaskInput
from task.dto.delete_task_input import DeleteTaskInput
from task.dto.deploy_task_input import DeployTaskInput
from task.dto.filter_task_input import FilterTaskInput
from task.dto.update_task_input import UpdateTaskInput
from task.service.task_service import TaskService

task_router = InferringRouter()


@cbv(task_router)
class TaskController:
    def __init__(self, task_service: TaskService = Depends(get_task_service)):
        self.task_service = task_service

    @task_router.post(
        "/create",
        summary="과제 등록",
        description="과제 등록 요청 API",
    )
    def create_task(self, create_task_input: CreateTaskInput):
        task = self.task_service.create_task(create_task_input)
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content=jsonable_encoder(task),
        )

    @task_router.patch(
        "/update/{task_id}",
        summary="과제 수정",
        description="과제 수정 요청 API",
    )
    def update_task(self, task_id: int, update_task_input: UpdateTaskInput):
        task = self.task_service.update_task(task_id, update_task_input)
        return JSONResponse(
            status_code=status.HTTP_200_OK, content=jsonable_encoder(task)
        )

    @task_router.delete(
        "/delete",
        summary="과제 삭제",
        description="과제 삭제 요청 API",
    )
    def delete_task(self, delete_task_input: DeleteTaskInput):
        task = self.task_service.delete_task(delete_task_input)
        return JSONResponse(
            status_code=status.HTTP_200_OK, content=jsonable_encoder(task)
        )

    @task_router.get(
        "/task/id/{task_id}",
        summary="과제 조회 (id)",
        description="과제 'Id' 로 조회 요청 API",
    )
    def get_task_by_id(self, task_id: int):
        task = self.task_service.find_task_by_id(task_id)
        return JSONResponse(
            status_code=status.HTTP_200_OK, content=jsonable_encoder(task)
        )

    @task_router.get(
        "/task/title/{task_title}",
        summary="과제 조회 (제목)",
        description="과제 '제목' 으로 조회 요청 API",
    )
    def get_task_by_title(self, task_title: str):
        task = self.task_service.find_task_by_title(task_title)
        return JSONResponse(
            status_code=status.HTTP_200_OK, content=jsonable_encoder(task)
        )

    @task_router.post(
        "/list",
        summary="과제 리스트 조회",
        description="과제 리스트 (필터) 조회 요청 API",
    )
    def get_task_filter_list(self, filter_task_input: FilterTaskInput):
        tasks = self.task_service.find_task_by_filter(filter_task_input)
        return JSONResponse(
            status_code=status.HTTP_200_OK, content=jsonable_encoder(tasks)
        )

    @task_router.post("/deploy/{task_id}", summary="과제 배포", description="과제 배포 요청 API")
    def deploy_task(self, task_id: int, deploy_task_input: DeployTaskInput):
        self.task_service.set_schedule_deploy_yn(task_id, deploy_task_input.deploy_yn)
        return JSONResponse(
            status_code=status.HTTP_200_OK, content=jsonable_encoder(deploy_task_input)
        )
