// Expo config plugin: the Android SDK is served by JitPack; add it to the
// app's repositories. No other native change is needed (autolinking does the rest).
let plugins;
try { plugins = require('@expo/config-plugins'); } catch { plugins = null; }
const JITPACK = "maven { url 'https://jitpack.io' }";

function addJitpack(src) {
  if (src.includes('jitpack.io')) return src;
  return src.replace(/allprojects\s*\{\s*repositories\s*\{/, (m) => `${m}\n        ${JITPACK}`);
}

function withPulseTracker(config) {
  if (!plugins) return config;
  return plugins.withProjectBuildGradle(config, (c) => {
    c.modResults.contents = addJitpack(c.modResults.contents);
    return c;
  });
}

module.exports = withPulseTracker;
module.exports.addJitpack = addJitpack;
