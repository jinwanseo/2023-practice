from fastapi import APIRouter, Depends
from tasks.dtos.create_task import CreateTaskInput
from sqlalchemy.orm import Session
from common.database.db import get_db
from tasks import tasks_service
from tasks.dtos.delete_task import DeleteTaskInput

app = APIRouter(prefix="/tasks", tags=["과제 관리"])


@app.post("/add", summary="과제 등록", description="과제 등록 요청 API")
def add_task(createTaskInput: CreateTaskInput, db: Session = Depends(get_db)):
    return tasks_service.create(createTaskInput, db)


@app.delete("/delete", summary="과제 삭제", description="과제 삭제 요청 API")
def delete_task(deleteTaskInput: DeleteTaskInput, db: Session = Depends(get_db)):
    return tasks_service.delete(deleteTaskInput, db)
