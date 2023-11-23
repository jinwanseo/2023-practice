from pydantic import BaseModel


class CreateScrapInput(BaseModel):
    title: str
    content: str
    author: str
    task_id: str
