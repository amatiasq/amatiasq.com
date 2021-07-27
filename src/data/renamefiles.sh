#!/bin/bash

# get all files with extension .md
# and rename them with the same name but with extension .yml

for file in `ls ./**/*.md`; do
    newfile=`echo $file | sed 's/\.md$/.yml/'`
    mv $file $newfile
done