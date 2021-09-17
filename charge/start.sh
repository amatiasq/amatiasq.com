#!/bin/bash

rmdir charge
git clone git@github.com:amatiasq/charge
cd charge
npm i
cd ..
mv charge/node_modules .

echo 'npm run start -- To start development'
