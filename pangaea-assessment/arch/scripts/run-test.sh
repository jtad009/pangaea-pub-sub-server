#!/usr/bin/env bash

set -e
set -o pipefail


  printf ">>Running lint with 'yarn lint'..."
  yarn lint
  printf ">> undo all migrations"
  yarn run migration:revert

  printf ">> run migration"
  yarn run migration:run
  printf ">>Build app 'yarn build'..."
  yarn build
  printf ">>Running test with 'yarn test'..."
  yarn test

  yarn test:cov
  