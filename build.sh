#!/usr/bin/env bash
# exit on error
set -o errexit

yarn install --production=false
yarn build
yarn typeorm migration:run -d dist/src/data-source