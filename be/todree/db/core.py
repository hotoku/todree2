import os
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

url = f"sqlite:///{os.environ['TODREE_DB_PATH']}"
engine = create_engine(url, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_url() -> str:
    return url


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
