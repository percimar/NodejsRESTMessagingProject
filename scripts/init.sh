#!/bin/sh
echo Starting init script
set -e
pwd
mysql -u chatapp -p12class34 testjenkins < ./scripts/initdb.sql
cp -r ./ /tmp/TestChatApp/
cd /tmp/TestChatApp
npm install
echo End of init script