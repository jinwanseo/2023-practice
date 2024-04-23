from pydantic import BaseModel


class DeleteUserInput(BaseModel):
    user_id: int
