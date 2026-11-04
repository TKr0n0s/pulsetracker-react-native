'use strict';
const { NativeModules, Platform } = require('react-native');

const LINKING_ERROR =
  "PulseTracker native module not found. Rebuild the app after installing (iOS: run `pod install`; " +
  'Expo: use a development build, not Expo Go).';

function native() {
  const m = NativeModules.PulseTrackerRN;
  if (!m) throw new Error(LINKING_ERROR);
  return m;
}

/** Call once at launch, after RevenueCat is configured. */
function configure(opts) {
  if (!opts || typeof opts.appKey !== 'string' || !opts.appKey) throw new Error('PulseTracker.configure: appKey is required');
  native().configure(opts.appKey, opts.appUserId ?? null, opts.environment ?? null, opts.apiBase ?? null);
}

/** After your user logs in (RevenueCat logIn). Optional email/phone link the customer to your web funnel. */
function identify(appUserId, contact) {
  if (typeof appUserId !== 'string' || !appUserId) throw new Error('PulseTracker.identify: appUserId is required');
  native().identify(appUserId, contact?.email ?? null, contact?.phone ?? null);
}

/** When a paywall becomes visible. source: 'sdk' | 'superwall' | 'revenuecat'. */
function paywallShown(placement, source) {
  native().paywallEvent('paywall_view', placement ?? null, source ?? 'sdk');
}

/** When a paywall is dismissed without a purchase. */
function paywallClosed(placement, source) {
  native().paywallEvent('paywall_close', placement ?? null, source ?? 'sdk');
}

module.exports = { configure, identify, paywallShown, paywallClosed, platform: Platform.OS };
module.exports.default = module.exports;
