from pydantic import BaseModel

class CreateBoardInput(BaseModel):
    title: str
    content: str
    author_id: int