#!/bin/bash

#--import-map ./import-map.json \

deno run \
  --allow-read=. \
  mod.ts \
  build . bar \
  --dir a \
