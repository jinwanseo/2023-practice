from typing import Optional

from pydantic import BaseModel


class CreateTaskInput(BaseModel):
    title: str
    description: str
    keyword: str
    count: int
    # 아래 부터는 스케쥴 관련 필드 (테스트 후 Table 분리 예정)
    schedule_type: str
    hour: Optional[int] = None
    minute: Optional[int] = None
    second: Optional[int] = None
    interval: Optional[int] = None
