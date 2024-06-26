# 以下の環境変数が必要
# - PROJECT_ID

REPO_NAME := todree
GCP_REGION := asia-northeast1
IMAGE_NAME := todree

IMAGE_PATH := $(GCP_REGION)-docker.pkg.dev/$(PROJECT_ID)/$(REPO_NAME)/$(IMAGE_NAME)

# MacでのビルドだとCPUアーキの違いでcloud runで動かないイメージになるので、GCPでビルドする。
# ローカル環境がintelのCPUの場合は、localでビルドするとキャッシュが利くので早い。
# BUILD_PLACE := local
BUILD_PLACE := gcp

.PHONY: deploy
deploy: image
	gcloud run deploy todree \
		--image=$(IMAGE_PATH):$(IMAGE_TAG) \
		--region=$(GCP_REGION) \
		--allow-unauthenticated \
		--update-env-vars=TODREE_BUCKET=$(TODREE_BUCKET),TODREE_DB_PATH=$(TODREE_DB_PATH) \
		--max-instances=1 \
		--min-instances=1 \
		--ingress=internal-and-cloud-load-balancing


.PHONY: image
image: build image-tag
ifeq ($(BUILD_PLACE),local)
	docker build -t $(IMAGE_PATH):latest --build-arg "SHORT_SHA=$(IMAGE_TAG)" .
else
	gcloud builds submit \
		--config=cloudbuild.yaml \
		--substitutions=SHORT_SHA=$(IMAGE_TAG),_IMAGE_NAME=$(IMAGE_NAME),_REPO_NAME=$(REPO_NAME),_GCP_REGION=$(GCP_REGION)
endif


.PHONY: image-tag
image-tag: tree-clean
# image-tag:
	$(eval IMAGE_TAG := $(shell git rev-parse HEAD | fold -w7 | head -n1))


.PHONY: tree-clean
tree-clean:
	@if [ $$(git status -s | wc -l) -ge 1 ]; then echo "Error: local tree is dirty."; false; fi


.PHONY: build
build:
	cd ../fe && npm run build
	mkdir -p static
	cp -fr ../fe/dist/* ./static/

.PHONY: clean
clean:
	rm -rf static ../fe/dist

.PHONY: remove-service
remove-service:
	gcloud run services delete todree --region=$(GCP_REGION)

## DB操作用のターゲット
.PHONY: download-db
download-db:
	rm -f $(TODREE_DB_PATH)
	litestream restore -config litestream.yml ${TODREE_DB_PATH}

.PHONY: seed
seed:
	rm -f $(TODREE_DB_PATH)
	alembic upgrade head
	python -m todree db seed

## openAPIの生成
.PHONY: openapi
openapi:
	curl localhost:8000/openapi.json | jq > ../fe/openapi.json
