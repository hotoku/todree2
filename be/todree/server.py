import click
import uvicorn
from fastapi import FastAPI

app = FastAPI()


@app.get("/hello")
def hello():
    return {"Hello": "World"}


@click.command()
def server():
    uvicorn.run("todree.server:app", host="0.0.0.0", port=8000, reload=True)
