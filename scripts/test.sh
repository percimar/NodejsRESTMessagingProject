#!/bin/sh
echo Starting test script
set -e
cd /tmp/TestChatApp
npm install
npx eslint server.js testing.test.js puppeteer.js
npm test
echo End of test script