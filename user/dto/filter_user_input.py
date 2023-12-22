from pydantic import BaseModel


class FilterUserInput(BaseModel):
    name: str
    email: str
