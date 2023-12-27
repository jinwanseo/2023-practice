from sqlalchemy import Column, String, Integer, Enum

from common.database.db import Base
from common.entity.core_entity import CoreEntity
from task.entity.scheudle_type import ScheduleType


class Task(Base, CoreEntity):
    __tablename__ = "tasks"
    title = Column(String, unique=True, nullable=False)
    description = Column(String)
    keyword = Column(String)
    count = Column(Integer)

    schedule_type = Column(Enum(ScheduleType), nullable=False)

    # 아래 부터는 스케쥴 관련 필드 (테스트 후 Table 분리 예정)
    hour = Column(Integer, nullable=True)
    minute = Column(Integer, nullable=True)
    second = Column(Integer, nullable=True)

    interval = Column(Integer, nullable=True)
