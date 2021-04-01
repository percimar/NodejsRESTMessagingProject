#!/bin/sh
echo Starting init script
pwd
mysql -u chatapp -p12class34 testjenkins < ./scripts/initdb.sql
cp -r . /opt/TestChatApp
cd /opt/TestChatApp
npm install
systemctl start testchatapp
# node server.js 3001 chatapp 12class34 testjenkins
npm test
echo End of init script