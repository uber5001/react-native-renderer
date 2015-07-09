./scripts/build_app.sh
./node_modules/appium/bin/appium.js --log-level info &
APPIUM_PID=$!

#wait for appium server to accept http requests
until ( curl -s 0.0.0.0:4723 >/dev/null ); do sleep 1; done;

./node_modules/jasmine/bin/jasmine.js
EXIT_STATUS=$?
kill $APPIUM_PID
exit $EXIT_STATUS