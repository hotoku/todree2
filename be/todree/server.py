import click
import uvicorn
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from .db import crud, get_db
from .schemas import Item, ItemCreate

app = FastAPI()


@app.get("/api/hello")
def hello():
    return {"Hello": "World"}


@app.get("/api/items/{item_id}", response_model=Item)
def get_item(item_id: int, session: Session = Depends(get_db)):
    ret = crud.read_item(session, item_id)
    if ret is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return ret


@app.post("/api/items", response_model=Item)
def create_item(item: ItemCreate, session: Session = Depends(get_db)):
    return crud.create_item(session, item)


@app.get("/api/items", response_model=list[Item])
def get_items(session: Session = Depends(get_db)):
    """Return all items that have no parent."""
    return crud.read_items(session)


@app.put("/api/items/{item_id}", response_model=Item)
def update_item(item_id: int, item: ItemCreate, session: Session = Depends(get_db)):
    ret = crud.update_item(session, item_id, item)
    if ret is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return ret


@click.command()
def server():
    uvicorn.run("todree.server:app", host="0.0.0.0", port=8000, reload=True)
