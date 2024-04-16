from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

from .core import engine

Base = declarative_base()


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True,
                index=True, autoincrement=True)
    content = Column(String, nullable=False)
    parent_id = Column(Integer, ForeignKey("items.id"))
    weight = Column(Float, nullable=False, default=0.0)
    open = Column(Boolean, nullable=False, default=False)

    parent = relationship("Item", back_populates="children", remote_side=id)
    children = relationship("Item", back_populates="parent")


Base.metadata.create_all(bind=engine)
