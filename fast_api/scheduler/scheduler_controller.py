from fastapi import APIRouter
from scheduler.schedule_service import (
    start_scheduler,
    pause_scheduler,
    remove_scheduler,
)
from datetime import datetime

app = APIRouter(prefix="/scheduler", tags=["스케쥴 관리 (Crontab)"])


def schedule_task():
    print("스케쥴 실행!!", datetime.today())


def schedule_stop():
    print("스케쥴 중단!!", datetime.today())


def schedule_remove():
    print("스케쥴 삭제!!", datetime.today())


@app.get("/start")
def schedule_start():
    # schedule_task 가 rabbitMQ Trigger가 될 예정
    start_scheduler(schedule_task, job_id="TASK_1")
    return {"ok": True}


@app.get("/pause")
def schedule_pause():
    pause_scheduler(schedule_stop, job_id="TASK_1")
    return {"ok": True}


@app.get("/remove")
def schedule_pause():
    remove_scheduler(schedule_remove, job_id="TASK_1")
    return {"ok": True}
