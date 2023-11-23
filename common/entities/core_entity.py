from sqlalchemy import Column, DateTime, Integer
from datetime import datetime


class CoreEntity:
    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )
