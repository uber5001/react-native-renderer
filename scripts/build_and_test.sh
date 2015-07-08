./scripts/build_app.sh
./node_modules/appium/bin/appium.js &
APPIUM_PID=$!
sleep 10
./node_modules/jasmine/bin/jasmine.js
kill $APPIUM_PID