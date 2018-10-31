## Quiz application for crowdbotics
### Manual installation of the application
In the root directory there is a ***app-release.apk*** file which can either be installed manually or via adb on either simulator/hardware device.

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
if you are using **xcode 12** and have problems building application check these issues you should check this issues, react-native doesn't fully support it yet
https://github.com/facebook/react-native/issues/21168
https://github.com/facebook/react-native/issues/21274

```
react-native run-ios
```
