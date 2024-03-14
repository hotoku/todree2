import click
from .server import server
from .db.commands import db


@click.group()
def main():
    pass


if __name__ == "__main__":
    main.add_command(server)
    main.add_command(db)
    main()
