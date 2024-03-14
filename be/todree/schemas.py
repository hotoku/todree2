from pydantic import BaseModel


class ItemBase(BaseModel):
    content: str
    parent_id: int | None = None


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int

    class Config:
        orm_mode = True
