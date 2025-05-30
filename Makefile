TEMP_FILE := $(shell mktemp)
NET_ACCESS := esm.sh,cdn.esm.sh,deno.land,fonts.googleapis.com


all: build
	make -j 2 watch start-server


deploy:
	git push # gh action


build: copy-assets
	@echo "Building..."
	# find . -name .DS_Store | xargs rm
	deno run \
		--import-map=import-map.json \
		--allow-read \
		--allow-write=./dist \
		--lock=lock.json \
		--allow-net=$(NET_ACCESS) \
		src/main.ts


copy-assets:
	@echo "Copying assets..."
	mkdir -p ./dist
	@cp -r ./assets/CV.pdf ./dist
	@cp -r ./assets/img ./dist


watch:
	@echo "Watching ./src..."
	fswatch  -o src | xargs -n1 -I{} make build


start-server:
	@echo "Serving ./dist..."
	live-server --port=8088 -q dist --wait 500


lock:
	@echo "Locking dependencies..."
	deno run \
		--import-map=import-map.json \
		--allow-read \
		--allow-write=./dist \
		--lock=lock.json \
		--allow-net=$(NET_ACCESS) \
		--reload \
		--lock-write \
		src/main.ts


ci:
	if make build 2>$(TEMP_FILE); then \
		echo "Build successful"; \
	else \
		if grep 'does not match the expected hash' '$(TEMP_FILE)'; then \
			echo "lock.json check failed"; \
			make lock; \
		else \
			echo "Build failed with unknown error"; \
			cat '$(TEMP_FILE)'; \
			rm '$(TEMP_FILE)'; \
			exit 1; \
		fi \
	fi
	rm '$(TEMP_FILE)'

install-deps:
	npm i -g live-server
	brew install fswatch
