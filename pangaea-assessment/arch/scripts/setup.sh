#!/usr/bin/env bash

set -e
set -o pipefail




if [ "$APP_ENV" != "local" ]; then
  #Update nginx config and start it if not on local environment
  echo ">>Copying nginx configuration..."
  cat "$WORKING_DIR/$APP_WORKSPACE/arch/conf.d/$APP_ENV.conf" > /etc/nginx/conf.d/default.conf
  echo ">>Starting nginx..."
  nginx || exit 1

  ## Copy environment file
  cp ".env.$APP_ENV" ".env"
fi