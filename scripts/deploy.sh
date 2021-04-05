#!/bin/sh
echo Start of deploy script
set -e
cp server.js package.json package-lock.json webfiles/ /opt/ChatApp -r
echo End of deploy script