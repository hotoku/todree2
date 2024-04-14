from pydantic import BaseModel


class ItemBase(BaseModel):
    content: str
    parent_id: int | None = None
    position: float


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int

    class Config:
        from_attributes = True
