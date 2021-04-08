#!/bin/sh
echo Start of deploy script
set -e
mysql -u chatapp -p12class34 jenkins < ./scripts/db.sql
cp server.js package.json package-lock.json /opt/ChatApp
cp webfiles/* /var/www/chatapp/ -r
cd /opt/ChatApp
npm install
systemctl restart chatapp
echo End of deploy script