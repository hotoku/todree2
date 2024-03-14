import click
import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from .schemas import Item, ItemCreate
from .db import get_db, crud


app = FastAPI()


@app.get("/hello")
def hello():
    return {"Hello": "World"}


@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: int, session: Session = Depends(get_db)):
    ret = crud.read_item(session, item_id)
    if ret is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return ret


@app.post("/items", response_model=Item)
def create_item(item: ItemCreate, session: Session = Depends(get_db)):
    return crud.create_item(session, item)


@app.get("/items", response_model=list[Item])
def get_items(session: Session = Depends(get_db)):
    """Return all items that have no parent."""
    return crud.read_items(session)


@click.command()
def server():
    uvicorn.run("todree.server:app", host="0.0.0.0", port=8000, reload=True)
