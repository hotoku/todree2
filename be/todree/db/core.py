import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


engine = create_engine(f"sqlite:///{os.environ['TODREE_DB_PATH']}",
                       connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
