from pydantic import BaseModel


class DeleteTaskInput(BaseModel):
    task_id: int
