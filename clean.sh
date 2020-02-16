# rm -rf $HOME/.gradle/caches/
cd android && ./gradlew cleanBuildCache
cd ..
cd ios && pod cache clean --all && rm -rf build && pod install
cd ..
rm -rf node_modules
yarn cache clean --force
yarn install
