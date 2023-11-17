from pydantic import BaseModel
from typing import Optional


class CreateUserInput(BaseModel):
    username : str
    password: str
    age : int
    email: Optional[str]
