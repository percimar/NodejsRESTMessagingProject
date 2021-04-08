#!/bin/sh
set -e
echo "PWD: "
pwd
echo "USER: "
whoami
echo "Node: "
which node
#npm install
mkdir /tmp/TestChatApp -p
# ln -sf /var/lib/jenkins/workspace/CP4480\ Chat\ App\ Pipeline/node_modules/ /tmp/TestChatApp/node_modules  
cp server.js axios.test.js puppeteer.test.js package.json package-lock.json .eslintrc.js webfiles/ /tmp/TestChatApp -r
echo End of init script