#!/bin/sh
echo Start of deploy script
set -e
mv server.js testing.test.js package.json package-lock.json /opt/ChatApp 
mv webfiles/* /opt/ChatApp/ -r
echo End of deploy script