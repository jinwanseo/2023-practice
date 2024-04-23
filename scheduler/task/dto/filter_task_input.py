from pydantic import BaseModel


class FilterTaskInput(BaseModel):
    keyword: str
