from typing import Optional

from pydantic import BaseModel


class UpdateTaskInput(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    count: Optional[int] = None
    keyword: Optional[str] = None
    # 아래 부터는 스케쥴 관련 필드 (테스트 후 Table 분리 예정)
    hour: Optional[int] = None
    minute: Optional[int] = None
    # interval 이 없으면 해당 시간에 1회만 실행
    # interval 이 있으면 해당 시간 부터 지속 적으로 실행
    interval: Optional[int] = None
