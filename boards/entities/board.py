from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from common.database.db import Base
from common.entities.core_entity import CoreEntity


class Board(Base, CoreEntity):
    __tablename__ = "board"
    title = Column(
        String,
        index=True,
    )
    content = Column(
        String,
    )
    author_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
    )
    author = relationship(
        "User",
        back_populates="boards",
    )
