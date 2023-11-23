from sqlalchemy.orm import Session
from fastapi import HTTPException
from tasks.dtos.create_task import CreateTaskInput
from tasks.entities.task import Task
from tasks.dtos.delete_task import DeleteTaskInput
from scheduler.schedule_service import start_task, remove_task


def create(createTaskInput: CreateTaskInput, db: Session):
    try:
        ## db 저장
        new_task = Task(**createTaskInput.dict(exclude_unset=True))

        db.add(new_task)
        db.commit()
        db.refresh(new_task)

        start_task(
            task_id=new_task.id,
            job_id=f"TASK_{new_task.id}",
            interval=new_task.interval,
            start_date=new_task.start_date,
            end_date=new_task.end_date,
        )

        return {"ok": True}
    except Exception as err:
        HTTPException(
            status_code=400,
            detail=str(err),
        )


def delete(deleteTaskInput: DeleteTaskInput, db: Session):
    task = db.query(Task).filter(Task.id == deleteTaskInput.task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="not found")
    db.delete(task)
    db.commit()

    remove_task(f"TASK_{deleteTaskInput.task_id}")

    return {
        "ok": True,
    }
