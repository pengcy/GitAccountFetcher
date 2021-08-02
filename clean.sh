#!/bin/bash

#run this first before run this script
#react-native start --reset-cache
rm -rf $HOME/.gradle/caches/
cd android
./gradlew cleanBuildCache
./gradlew clean
rm -rf build
cd ..
rm package-lock.json
npm cache clean --force
cd ios
rm Podfile.lock
rm -rf build/
rm -rf ~/Library/Developer/Xcode/DerivedData/yourproject-*
cd ..
rm -rf node_modules
npm install
cd ios
pod install
cd ..
npm run android
npm run ios
