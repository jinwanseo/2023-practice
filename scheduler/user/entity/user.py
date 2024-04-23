from sqlalchemy import Column, String

from common.database.db import Base
from common.entity.core_entity import CoreEntity


class User(Base, CoreEntity):
    __tablename__ = "users"
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
