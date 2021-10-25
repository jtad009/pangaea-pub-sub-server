#!/usr/bin/env bash

set -e
set -o pipefail


  printf ">>Running lint with 'yarn lint'..."
  yarn lint
  printf ">>Build app 'yarn build'..."
  yarn build
  printf ">>Running test with 'yarn test'..."
  yarn test
