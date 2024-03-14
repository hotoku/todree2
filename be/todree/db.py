import os
import click
from sqlalchemy import Column, ForeignKey, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

@click.group()
def db():
    pass

@db.command()
def seed():
    pass

engine = create_engine(f"sqlite://{os.environ['TODREE_DB_PATH']}",
                       connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    parent_id = Column(Integer, ForeignKey("items.id"))

    owner = relationship("Item", back_populates="items")


Base.metadata.create_all(bind=engine)
