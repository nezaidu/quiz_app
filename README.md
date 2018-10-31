## Quiz application for crowdbotics
### Manual installation of the application
In the root directory there is a ***app-release.apk*** file which can either be installed manually or via adb on either simulator/hardware device.
***quiz_app.ipa*** can be installed on ios devices.

### Building or developing application
In order to build or to develop the application it's required to follow getting-started guide from react-native website:
**https://facebook.github.io/react-native/docs/getting-started**
### 1. Install dependencies
```
    npm install
```
or

```
    yarn
```
### 2. Build the application
Android:
```
react-native run-android
```
iOS:
```
react-native run-ios
```

if you are using **xcode 12** and have problems installing third-party libraries run this:
```
node_modules/react-native && scripts/ios-install-third-party.sh && cd third-party && cd glog-0.3.5 && ./configure --host arm-apple-darwin && cd ../../../../
```
and then change xcode build system from new one to the legacy one, then try building app again.
If issues with third-party libraries persist, check these issues carefully:
https://github.com/facebook/react-native/issues/21168
https://github.com/facebook/react-native/issues/21274
https://github.com/facebook/react-native/issues/19839


