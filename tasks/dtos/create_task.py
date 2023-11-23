from pydantic import BaseModel
from typing import Optional


class CreateTaskInput(BaseModel):
    title: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    interval: Optional[int] = None
    keyword: str
    count: int
