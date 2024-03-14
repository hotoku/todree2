import click
from .server import server

@click.group()
def main():
    pass


if __name__ == "__main__":
    main.add_command(server)
    main()