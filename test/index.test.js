const test = require('node:test');
const assert = require('node:assert');
const Module = require('module');

const calls = [];
const fakeRN = { NativeModules: { PulseTrackerRN: {
  configure: (...a) => calls.push(['configure', ...a]),
  identify: (...a) => calls.push(['identify', ...a]),
  paywallEvent: (...a) => calls.push(['paywallEvent', ...a]),
} }, Platform: { OS: 'ios' } };
const orig = Module._load;
Module._load = function (req, ...rest) { return req === 'react-native' ? fakeRN : orig.call(this, req, ...rest); };
const PT = require('../lib/index.js');
const { addJitpack } = require('../app.plugin.js');

test('configure/identify/paywall map to the native module with nulls, not undefined', () => {
  PT.configure({ appKey: 'pk_1', appUserId: 'u1' });
  PT.identify('u1', { email: 'a@b.co' });
  PT.paywallShown('onboarding');
  PT.paywallClosed(undefined, 'superwall');
  assert.deepStrictEqual(calls, [
    ['configure', 'pk_1', 'u1', null, null],
    ['identify', 'u1', 'a@b.co', null],
    ['paywallEvent', 'paywall_view', 'onboarding', 'sdk'],
    ['paywallEvent', 'paywall_close', null, 'superwall'],
  ]);
});

test('missing app key / user id fail loudly', () => {
  assert.throws(() => PT.configure({}), /appKey is required/);
  assert.throws(() => PT.identify(''), /appUserId is required/);
});

test('Expo plugin adds JitPack once', () => {
  const gradle = 'allprojects {\n    repositories {\n        google()\n    }\n}';
  const once = addJitpack(gradle);
  assert.match(once, /jitpack\.io/);
  assert.strictEqual(addJitpack(once), once);
});

test('vendored iOS sources match the iOS SDK (React Native + Flutter CocoaPods paths)', (t) => {
  const fs = require('fs');
  const path = require('path');
  const sdk = path.resolve(__dirname, '../../ios/Sources/PulseTracker');
  if (!fs.existsSync(sdk)) return t.skip('published mirror: no monorepo SDK next to it');
  for (const vendor of ['../ios/vendor', '../../pulsetracker_flutter/ios/vendor']) {
    const dir = path.resolve(__dirname, vendor);
    for (const f of fs.readdirSync(sdk)) {
      assert.strictEqual(fs.readFileSync(path.join(dir, f), 'utf8'), fs.readFileSync(path.join(sdk, f), 'utf8'),
        `${vendor}/${f} is stale — run the vendor script`);
    }
  }
});
