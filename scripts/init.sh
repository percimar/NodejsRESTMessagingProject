#!/bin/sh
echo Starting init script
set -e
echo "PWD: "
pwd
echo "USER: "
whoami
echo "Node: "
which node
mkdir /tmp/TestChatApp -p
cp server.js axios.test.js puppeteer.test.js package.json package-lock.json .eslintrc.js webfiles/ /tmp/TestChatApp -r
echo End of init script