from typing import Optional

from pydantic import BaseModel


class UpdateUserInput(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
