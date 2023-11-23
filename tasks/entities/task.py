from sqlalchemy import Column, String, Integer, DateTime
from common.database.db import Base
from common.entities.core_entity import CoreEntity
from sqlalchemy.orm import relationship


class Task(Base, CoreEntity):
    __tablename__ = "tasks"

    title = Column(
        String,
        unique=True,
    )
    start_date = Column(
        DateTime,
        nullable=True,
    )
    end_date = Column(
        DateTime,
        nullable=True,
    )
    interval = Column(
        Integer,
        nullable=True,
    )
    keyword = Column(
        String,
    )
    count = Column(
        Integer,
    )

    scraps = relationship("Scrap", back_populates="task")
