from sqlalchemy import Column, String, Integer

from common.database.db import Base
from common.entity.core_entity import CoreEntity


class Task(Base, CoreEntity):
    __tablename__ = "tasks"
    title = Column(String, unique=True, nullable=False)
    description = Column(String)
    keyword = Column(String)
    count = Column(Integer)

    # 아래 부터는 스케쥴 관련 필드 (테스트 후 Table 분리 예정)
    hour = Column(Integer)
    minute = Column(Integer)
    # interval 이 없으면 해당 시간에 1회만 실행
    # interval 이 있으면 해당 시간 부터 지속 적으로 실행
    interval = Column(Integer, nullable=True)
