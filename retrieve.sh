#!/bin/sh

. ./config.sh

mkdir -p conf

echo "Formatting configuration files"
./format.sh > /dev/null

echo "Retrieving configuration files"
cp -r "$HYPR_CONF_PATH" conf/
cp -r "$FOOT_CONF_PATH" conf/
cp -r "$AGS_CONF_PATH" conf/
