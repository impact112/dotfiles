#!/bin/sh

. ./config.sh

echo "Installing configs"
cp -r conf/* "$BASE_CONF_PATH"
