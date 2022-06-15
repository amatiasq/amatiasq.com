#!/bin/bash

deno run \
  --import-map=import_map.json \
  --allow-read \
  --allow-write=./dist \
  --allow-net=esm.sh,cdn.esm.sh,deno.land \
  generate/main.ts

  # --watch \
