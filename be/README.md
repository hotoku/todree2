# todree backend

## DB の操作

### migration スクリプトを作る

```shell
alembic revision -m "add some column"
```

これを実行すると、alembic/versions 以下に`xxxxxxx_add_some_column.py`ファイルができるので、
この中の`upgrade`と`downgrade`を実装する。

### migration 実行

以下のコマンドでローカルの DB が更新される。

```shell
alembic upgrade head
```

#### サーバーに反映させる

クラウドのファイルに migration を反映するには、litestream で replicate するのが良い。以下の手順を踏む。

まず、サービスを削除しておく。

```shell
make remove-service
```

以下のコマンドでローカルに DB ファイルをリストアする。（※ローカルのファイルが消えるので注意）

```shell
rm ${TODREE_DB_PATH}*
litestream restore -config litestream.yml ${TODREE_DB_PATH}
```

litestream のレプリカを開始する。

```shell
litestream replicate -config litestream.yml
```

別のターミナルで以下のコマンドを実行しマイグレーションする。

```shell
alembic upgrade head
```

litestream サーバーに`Ctrl+C`を送って停止する。そのあと、以下を実行しサービスを deploy する。

```shell
make
```

### seed

```shell
python -m todree db seed
```

## litestream について

Cloud Run での動作時には、litestream によって GCS 上の sqlite ファイルをコンテナの中に同期している。
この DB を更新するには、以下の手順を行う。

### クラウドからローカルにダウンロードするとき

```shell
make download-db
```

### ローカルからクラウドにアップロードするとき

※ migration 以外の理由でクラウドにアップロードするのは、運用上、基本は避けるべき。

cloud run を停止する。

```shell
make remove-service
```

以下のコマンドで GCS 上のバックアップを削除する。あるいは rename する。

```shell
gsutil -m mv gs://${TODREE_BUCKET}/litestream/ gs://${TODREE_BUCKET}/litestream-$(date +%s)/
```

配置したい sqlite ファイルをローカルの`${TODREE_DB_PATH}`に置く。

以下のコマンドで litestream サーバーが起動し、レプリケーションを開始する。

```shell
litestream replicate -config litestream.yml
```

`wal segment wirtten`が出たら`Ctrl + C`でサーバーを停止する。
GCS にレプリカが出来ているはず。以下のコマンドで確認できる。

```shell
gsutil ls gs://${TODREE_BUCKET}/litestream
```

また、以下のコマンドで、一旦ローカルのファイルを消去したあとにリストアできる。

```shell
rm ${TODREE_DB_PATH}*
litestream restore -config litestream.yml ${TODREE_DB_PATH}
```

これで正しく DB の中身が復元されていれば問題ない。

問題がなければ、cloud run のサービスをデプロイすれば、新しく DB で利用できる。
