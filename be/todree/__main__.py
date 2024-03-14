import click

@click.group()
def main():
    pass

def server():
    print("Server started")

if __name__ == "__main__":
    main.command(server)
    main()