from pydantic import BaseModel


class CreateUserInput(BaseModel):
    name: str
    email: str
