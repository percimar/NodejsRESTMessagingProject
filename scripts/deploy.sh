#!/bin/sh
echo Start of deploy script
set -e
mysql -u chatapp -p12class34 jenkins < ./scripts/db.sql
cp server.js package.json package-lock.json webfiles/ /opt/ChatApp -r
echo End of deploy script