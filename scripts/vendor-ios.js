// Copies the official iOS SDK sources into ios/vendor so the pod compiles them
// (the iOS SDK ships as a Swift package; CocoaPods needs the files in-tree).
const fs = require('fs');
const path = require('path');
const src = path.resolve(__dirname, '../../ios/Sources/PulseTracker');
const dst = path.resolve(__dirname, '../ios/vendor');
if (!fs.existsSync(src)) { if (fs.existsSync(dst)) process.exit(0); throw new Error('iOS SDK sources not found: ' + src); }
fs.rmSync(dst, { recursive: true, force: true });
fs.mkdirSync(dst, { recursive: true });
for (const f of fs.readdirSync(src)) fs.copyFileSync(path.join(src, f), path.join(dst, f));
console.log('vendored', fs.readdirSync(dst).join(', '));
