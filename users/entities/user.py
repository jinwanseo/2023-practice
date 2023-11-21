from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.orm import deferred, relationship
import bcrypt
from common.database.db import Base
from common.entities.core_entity import CoreEntity


class User(Base, CoreEntity):
    __tablename__ = "users"
    username = Column(
        String,
        unique=True,
        index=True,
    )

    password = deferred(
        Column(
            String,
        ),
    )

    age = Column(
        Integer,
        nullable=True,
    )

    email = Column(
        String,
        unique=True,
        nullable=True,
    )

    def hashPw(self, password: str):
        self.password = bcrypt.hashpw(
            password=password.encode("utf-8"),
            salt=bcrypt.gensalt(),
        )

    def checkPw(self, password: str):
        return bcrypt.checkpw(
            password=password.encode("utf-8"),
            hashed_password=self.password,
        )
