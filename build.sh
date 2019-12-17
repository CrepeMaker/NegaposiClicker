#! /bin/bash

set -eux

rm -rf public/api
cp -r server/src/api public/api

npm run build