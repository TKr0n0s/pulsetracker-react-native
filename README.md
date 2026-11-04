# PulseTracker for React Native / Expo

Tells PulseTracker which link brought each install, so RevenueCat trials and
purchases are credited to the right link, ad and social network.

## Install

```sh
npm install github:TKr0n0s/pulsetracker-react-native#0.4.2
cd ios && pod install
```

- **Android:** add `maven { url 'https://jitpack.io' }` to `allprojects.repositories`
  in `android/build.gradle`.
- **Expo:** use a development build (not Expo Go) and add the plugin to `app.json`;
  it adds JitPack for you:
  ```json
  { "expo": { "plugins": ["@pulsetracker/react-native"] } }
  ```

## Use

```ts
import PulseTracker from '@pulsetracker/react-native';
import Purchases from 'react-native-purchases';

// at launch, after Purchases.configure(...)
PulseTracker.configure({ appKey: 'ptk_…', appUserId: await Purchases.getAppUserID() });

PulseTracker.identify(userId);                    // after Purchases.logIn(userId)
PulseTracker.identify(userId, { email });         // optional: link to your web funnel
PulseTracker.paywallShown('onboarding');          // optional: "Saw a paywall"
```

Wraps the official SDKs: iOS (sources of github.com/TKr0n0s/pulsetracker-ios,
compiled in the pod) and Android (`com.github.TKr0n0s:pulsetracker-android`).
Source of truth: `sdks/react-native` in the PulseTracker monorepo.
