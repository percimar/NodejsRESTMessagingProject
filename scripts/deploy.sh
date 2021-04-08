#!/bin/sh
echo Start of deploy script
set -e
mysql -u chatapp -p12class34 jenkins < ./scripts/db.sql
cp webfiles/* /var/www/chatapp/ -r
cp package.json package-lock.json /opt/ChatApp
cd /opt/ChatApp
npm install
cp /var/lib/jenkins/workspace/CP4480\ Chat\ App\ Pipeline/server.js ./server.js
echo End of deploy script