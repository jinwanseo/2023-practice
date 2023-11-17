from pydantic import BaseModel

class GetUserInput(BaseModel):
    id: int