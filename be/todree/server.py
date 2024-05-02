import os
import sqlite3

import click
import uvicorn
from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from .db import crud, get_db
from .schemas import Item, ItemCreate

app = FastAPI()


@app.get("/api/info")
def info():
    commithash = "unknown"
    if os.path.exists("/commithash.txt"):
        with open("/commithash.txt", "r") as f:
            commithash = f.read().strip()
    with sqlite3.connect(os.getenv("TODREE_DB_PATH")) as conn:
        cursor = conn.cursor()
        cursor.row_factory = sqlite3.Row
        cursor.execute("""
SELECT
    name
FROM
    sqlite_schema
WHERE
    type ='table' AND
    name NOT LIKE 'sqlite_%';""")
        rows = cursor.fetchall()
        tables = [row["name"] for row in rows]
    return {
        "commithash": commithash,
        "tables": tables,
    }


@app.get("/api/items/{item_id}", response_model=Item)
def get_item(item_id: int, session: Session = Depends(get_db)):
    ret = crud.read_item(session, item_id)
    if ret is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return ret


@app.delete("/api/items/{item_id}", response_model=Item)
def delete_item(item_id: int, session: Session = Depends(get_db)):
    ret = crud.delete_item(session, item_id)
    if ret is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return ret


@app.post("/api/items", response_model=Item)
def create_item(item: ItemCreate, session: Session = Depends(get_db)):
    return crud.create_item(session, item)


@app.put("/api/items/{item_id}", response_model=Item)
def update_item(item_id: int, item: ItemCreate, session: Session = Depends(get_db)):
    ret = crud.update_item(session, item_id, item)
    if ret is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return ret


@app.get("/api/items", response_model=list[Item])
def get_items(session: Session = Depends(get_db)):
    """Return all items that have no parent."""
    return crud.read_items(session)


@app.get("/api/items/{item_id}/children", response_model=list[Item])
def get_children(item_id: int, session: Session = Depends(get_db)):
    """Return all children of the item."""
    return crud.read_children(session, item_id)


app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")


# それ意外のpathでは、static/index.htmlを返す
@app.get("/")
@app.get("/{path:path}")
def index():
    return FileResponse("static/index.html")


def get_port() -> int:
    return int(os.getenv("PORT", 8000))


@click.command()
def server():
    uvicorn.run("todree.server:app", host="0.0.0.0",
                port=get_port(), reload=True)
