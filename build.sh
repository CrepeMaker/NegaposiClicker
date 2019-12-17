#! /bin/bash

set -eux

rm -rf public/api
cp server/src/env.ini public/env.ini
cp -r server/src/api public/api

npm run build