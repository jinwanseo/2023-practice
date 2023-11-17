from sqlalchemy import Column, String, Integer, Boolean, DateTime, func, ForeignKey
from sqlalchemy.orm import deferred, relationship
from sqlalchemy.ext.declarative import declarative_base
import bcrypt
from common.database.db import Base

class User(Base) : 
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = deferred(Column(String))
    age = Column(Integer, nullable=True)
    email = Column(String, unique=True, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    boards = relationship("Board", back_populates="author")

    def set_password(self, password: str): 
        self.password = bcrypt.hashpw(password=password.encode('utf-8'), salt=bcrypt.gensalt())

    def check_password(self, password: str):
        return bcrypt.checkpw(password.encode('utf-8'), self.password)
    
