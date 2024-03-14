import json
import os
from pathlib import Path
import click

from . import models
from . import core


@click.group()
def db():
    pass


@db.command()
def seed():
    seed_file = Path(__file__).parent / "seed.json"
    seed = json.loads(seed_file.read_text())
    session = core.SessionLocal()
    for item in seed:
        session.add(models.Item(**item))
    session.commit()
