from common.utils.env_data import DB_URL
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
engine = create_engine(
    url=DB_URL,
    echo=False,
)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=True,
    bind=engine,
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
