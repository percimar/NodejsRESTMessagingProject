#!/bin/sh
echo Start of deploy script
cd ..
mv server.js testing.test.js package.json package-lock.json webfiles/ /opt/chatapp/ -r
echo End of deploy script