#!/bin/sh
echo Starting test script
set -e
mysql -u chatapp -p12class34 testjenkins < ./scripts/initdb.sql
cd /tmp/TestChatApp
npm install
npx eslint server.js testing.test.js puppeteer.js
npm test
echo End of test script