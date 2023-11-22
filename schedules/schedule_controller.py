from fastapi import APIRouter
from schedules.utils.celery_config import schedule_task_item

app = APIRouter(prefix="/schedules", tags=["스케쥴 관리"])


@app.get("/work")
async def start_schedule(task_id: str, x, y):
    schedule_task_item.apply_async([x, y], task_id=task_id, queue="celery_task")
    return {"ok": True, "message": "Celery Start!"}


@app.get("/result")
async def result_schedule(task_id: str):
    result = schedule_task_item.AsyncResult(task_id)
    return {
        "ok": True,
        "message": result.info,
    }
