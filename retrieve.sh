#!/bin/sh

. ./config.sh

mkdir -p conf

echo "Retrieving existing configuration files"
cp -r "$HYPR_CONF_PATH" conf/
cp -r "$WAYBAR_CONF_PATH" conf/
cp -r "$FOOT_CONF_PATH" conf/
cp -r "$EWW_CONF_PATH" conf/
