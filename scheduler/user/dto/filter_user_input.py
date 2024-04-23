from typing import Optional

from pydantic import BaseModel


class FilterUserInput(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
