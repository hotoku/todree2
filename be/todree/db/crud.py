from sqlalchemy.orm import Session

from .. import schemas
from . import models


def read_item(db: Session, item_id: int) -> models.Item | None:
    return db.query(models.Item).filter(models.Item.id == item_id).first()


def create_item(db: Session, item: schemas.ItemCreate) -> models.Item:
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def read_items(db: Session) -> list[models.Item]:
    return db.query(models.Item).all()


def update_item(db: Session, item_id: int, item: schemas.ItemCreate) -> models.Item | None:
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item is None:
        return None
    db_item.content = item.content
    db.commit()
    db.refresh(db_item)
    return db_item


def delete_item(db: Session, item_id: int) -> models.Item | None:
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item is None:
        return None
    db.delete(db_item)
    db.commit()
    return db_item


def read_children(db: Session, item_id: int) -> list[models.Item]:
    return db.query(models.Item).filter(models.Item.parent_id == item_id).all()
