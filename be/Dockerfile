FROM python:3.12.2

COPY pyproject.toml poetry.lock ./
RUN touch README.md # poetry install requires README.md to exist

RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    pip install --upgrade pip && \
    pip install poetry && \
    poetry config virtualenvs.in-project true && \
    mkdir -p todree && \
    touch todree/__init__.py && \
    poetry install

RUN wget https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.deb && \
    dpkg -i litestream-v0.3.13-linux-amd64.deb

RUN rm -rf todree
COPY litestream.yml /litestream.yml
COPY run.sh /run.sh
COPY todree/ /todree/
COPY static/ /static/

ARG SHORT_SHA
RUN echo $SHORT_SHA > /commithash.txt

ENV TODREE_DB_PATH /todree.sqlite
ENV PORT 8000

ENTRYPOINT ["/run.sh"]
