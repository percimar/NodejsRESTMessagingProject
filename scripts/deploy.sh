#!/bin/sh
echo Start of deploy script
set -e
mv server.js testing.test.js package.json package-lock.json webfiles/ /opt/ChatApp
echo End of deploy script