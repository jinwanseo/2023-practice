from typing import Optional

from pydantic import BaseModel


class UpdateTaskInput(BaseModel):
    title: Optional[str] = None
