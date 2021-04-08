#!/bin/sh
set -e
# mysql -u chatapp -p12class34 testjenkins < ./scripts/initdb.sql
cd /tmp/TestChatApp
npm install
npx eslint server.js axios.test.js puppeteer.test.js
npx jest axios
npx jest puppeteer
echo End of test script