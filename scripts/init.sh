#!/bin/sh
echo Starting init script
set -e
echo "PWD: " pwd
echo "USER: " whoami
echo "Node: " which Node
mkdir /tmp/TestChatApp - p
cp server.js testing.test.js puppeteer.js package.json package-lock.json .eslintrc.js webfiles/ /tmp/TestChatApp -r
echo End of init script