from sqlalchemy import Column, String, Integer, Boolean, DateTime, func, ForeignKey
from sqlalchemy.orm import deferred, relationship
from sqlalchemy.ext.declarative import declarative_base
import bcrypt
from common.database.db import Base
from common.entities.core_entity import CoreEntity


class User(Base, CoreEntity):
    __tablename__ = "users"
    username = Column(
        type=String,
        unique=True,
        index=True,
    )
    password = deferred(
        Column(
            type=String,
        ),
    )
    age = Column(
        type=Integer,
        nullable=True,
    )
    email = Column(
        type=String,
        unique=True,
        nullable=True,
    )
    boards = relationship(
        "Board",
        back_populates="author",
    )

    def set_password(self, password: str):
        self.password = bcrypt.hashpw(
            password=password.encode("utf-8"),
            salt=bcrypt.gensalt(),
        )

    def check_password(self, password: str):
        return bcrypt.checkpw(
            password=password.encode("utf-8"),
            hashed_password=self.password,
        )
