from pydantic import BaseModel


class DeleteScrapInput(BaseModel):
    scrap_id: int
