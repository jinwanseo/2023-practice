from pydantic import BaseModel


class CreateTaskInput(BaseModel):
    title: str
    description: str
    start_date: str
    end_date: str
    keyword: str
    interval: int
    count: int
