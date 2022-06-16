all: generate
	make -j 2 watch start-server


generate:
	@echo "Building..."
	deno run \
		--import-map=import_map.json \
		--allow-read \
		--allow-write=./dist \
		--allow-net=esm.sh,cdn.esm.sh,deno.land \
		src/generate/main.ts


watch:
	@echo "Watching ./src..."
	fswatch  -o src | xargs -n1 -I{} make generate


start-server:
	@echo "Serving ./dist..."
	live-server --port=8088 -q dist
