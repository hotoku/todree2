from sqlalchemy.orm import Session
from . import models
from .. import schemas


def read_item(db: Session, item_id: int) -> models.Item | None:
    return db.query(models.Item).filter(models.Item.id == item_id).first()


def create_item(db: Session, item: schemas.ItemCreate) -> models.Item:
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def read_items(db: Session) -> list[models.Item]:
    return db.query(models.Item).filter(models.Item.parent_id.is_(None)).all()
