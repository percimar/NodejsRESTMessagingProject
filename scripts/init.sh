#!/bin/sh
echo Starting init script
set -e
mysql -u chatapp -p12class34 testjenkins < ./scripts/initdb.sql
cp server.js testing.test.js package.json package-lock.json webfiles/ /tmp/TestChatApp
cd /tmp/TestChatApp
npm install
npm test
echo End of init script