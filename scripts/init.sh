#!/bin/sh
echo Starting init script
set -e
mysql -u chatapp -p12class34 testjenkins < ./scripts/initdb.sql
mysql -u chatapp -p12class34 jenkins < ./scripts/db.sql
cp -r . /tmp/TestChatApp
cd /tmp/TestChatApp
npm install
npm test
echo End of init script