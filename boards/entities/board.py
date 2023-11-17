from sqlalchemy import Column, String,Integer, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship
from common.database.db import Base

class Board(Base):
    __tablename__ = 'board'
    id= Column(Integer, primary_key=True, index=True)
    title= Column(String, index=True)
    content= Column(String)
    author_id = Column(Integer, ForeignKey("users.id"))
    created_at= Column(DateTime, default=func.now())
    updated_at= Column(DateTime, default=func.now(), onupdate=func.now())
    author = relationship("User", back_populates="boards")
