from sqlalchemy import Column, String, Integer, ForeignKey
from common.database.db import Base
from common.entities.core import CoreEntity
from sqlalchemy.orm import relationship


# 스크랩된 기사
class Scrap(Base, CoreEntity):
    __tablename__ = "scraps"
    title = Column(String)
    content = Column(String)
    author = Column(String)
    task_id = Column(Integer, ForeignKey("tasks.id"))

    task = relationship("Task", back_populates="scraps")
