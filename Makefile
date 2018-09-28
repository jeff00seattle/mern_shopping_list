#  Makefile
#
#  Copyright (c) 2018, DocuSign, Inc
#  All rights reserved.
#

CLIENT_PORT := $(shell jq .clientPort ./config/ports.json)
SERVER_PORT := $(shell jq .serverPort ./config/ports.json)

lint:
	@echo "======================================================"
	@echo "lint"
	@echo "======================================================"
	npm run lint

run-dev:
	@echo "======================================================"
	@echo "Run server and client concurrently"
	@echo "======================================================"
	npm run dev

eslint-airbnb-install:
	@echo "======================================================"
	@echo "eslint-airbnb-install"
	@echo "======================================================"
	npx install --dev eslint
	npx install-peerdeps --dev eslint-config-airbnb

services-ports:
	@echo CLIENT_PORT=$(CLIENT_PORT)
	@echo SERVER_PORT=$(SERVER_PORT)

services-listen:
	@echo "======================================================"
	@echo "listen"
	@echo "======================================================"
	@lsof -i4TCP:$(CLIENT_PORT) -sTCP:LISTEN -n -P | awk 'FNR == 2'
	@lsof -i4TCP:$(SERVER_PORT) -sTCP:LISTEN -n -P | awk 'FNR == 2'

services-kill:
	@echo "======================================================"
	@echo "kill"
	@echo "======================================================"
	@lsof -i4TCP:$(CLIENT_PORT) -sTCP:LISTEN -n -P | awk 'FNR == 2 { print $2 }' | xargs kill
	@lsof -i4TCP:$(SERVER_PORT) -sTCP:LISTEN -n -P | awk 'FNR == 2 { print $2 }' | xargs kill

services-list:
	@echo "======================================================"
	@echo "services list"
	@echo "======================================================"
	brew services list

mongodb-start:
	@echo "======================================================"
	@echo "start mongodb"
	@echo "======================================================"
	brew services start mongodb

mongodb-restart:
	@echo "======================================================"
	@echo "restart mongodb"
	@echo "======================================================"
	brew services restart mongodb

mongodb-stop:
	@echo "======================================================"
	@echo "stop mongodb"
	@echo "======================================================"
	brew services stop mongodb

list:
	@echo "======================================================"
	@echo list targets
	@echo "======================================================"
	cat Makefile | grep "^[a-z]" | awk '{print $$1}' | sed "s/://g" | sort
