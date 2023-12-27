from common.entity.core_entity import CoreEntity
from sqlalchemy import Column, String, Integer

from common.database.db import Base


class Log(Base, CoreEntity):
    __tablename__ = "result_logs"

    title = Column(String)
    count = Column(Integer)
    keyword = Column(String)
    task_id = Column(Integer)
