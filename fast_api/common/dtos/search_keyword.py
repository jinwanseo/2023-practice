from pydantic import BaseModel
from typing import Optional


class SearchKeywordInput(BaseModel):
    keyword: Optional[str] = None
