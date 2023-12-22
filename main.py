from fastapi import FastAPI

from common.database.db import Base, engine
from task.controller.task_controller import task_router
from user.controller.user_controller import user_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_router, prefix="/user", tags=["유저 관리"])
app.include_router(task_router, prefix="/task", tags=["과제 관리"])
