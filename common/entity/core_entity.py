from sqlalchemy import Integer, Column, DateTime, func


class CoreEntity:
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(
        DateTime(timezone=True), onupdate=func.now(), default=func.now()
    )
