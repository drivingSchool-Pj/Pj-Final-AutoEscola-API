#!/usr/bin/env bash
# exit on error
set -o errexit

yarn install --dev
yarn build
yarn typeorm migration:run -d dist/src/data-source