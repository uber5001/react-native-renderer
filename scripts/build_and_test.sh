./scripts/build_app.sh
./node_modules/appium/bin/appium.js --log-level info &
APPIUM_PID=$!
sleep 10
./node_modules/jasmine/bin/jasmine.js
EXIT_STATUS=$?
kill $APPIUM_PID
exit $EXIT_STATUS