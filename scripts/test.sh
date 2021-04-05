#!/bin/sh
echo Starting test script
set -e
cd /tmp/TestChatApp
npm install
npm test
echo End of test script