from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from fastapi import HTTPException


class SearchDateInput(BaseModel):
    start_date: Optional[str] = None
    end_date: Optional[str] = None

    # @model_validator("start_date", "end_date")
    # def search_date(cls, values):
    #     if values.start_date and values.end_date :
