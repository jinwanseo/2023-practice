from sqlalchemy import Column, String, DateTime, Integer

from common.database.db import Base
from common.entity.core_entity import CoreEntity


class Task(Base, CoreEntity):
    __tablename__ = "tasks"
    title = Column(String, unique=True, nullable=False)
    description = Column(String)
    start_date = Column(DateTime(timezone=True), nullable=True)
    end_date = Column(DateTime(timezone=True), nullable=True)
    interval = Column(Integer, nullable=True)
    keyword = Column(String)
    count = Column(Integer)
