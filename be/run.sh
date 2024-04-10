#!/bin/sh

# 環境変数
# TODREE_BUCKET: バケット名
# TODREE_DB_PATH: データベースファイルのパス

set -eu

rm -f $TODREE_DB_PATH
litestream restore -config ./litestream.yml $TODREE_DB_PATH
litestream replicate -exec "poetry run python -m todree server"  -config ./litestream.yml
