#!/bin/sh
echo Starting init script
set -e
echo $USER;
whoami;
mysql -u chatapp -p12class34 testjenkins < ./scripts/initdb.sql
cp server.js testing.test.js puppeteer.js package.json package-lock.json .eslintrc.js webfiles/ /tmp/TestChatApp -r
echo End of init script