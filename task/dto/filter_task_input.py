from typing import Optional

from pydantic import BaseModel


class FilterTaskInput(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
