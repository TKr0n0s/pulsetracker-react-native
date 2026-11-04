require "json"
package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "PulseTrackerReactNative"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = "https://github.com/TKr0n0s/pulsetracker-react-native"
  s.license      = "MIT"
  s.author       = "PulseTracker"
  s.platforms    = { :ios => "15.0" }
  s.source       = { :git => "https://github.com/TKr0n0s/pulsetracker-react-native.git", :tag => s.version.to_s }
  s.swift_version = "5.9"
  s.source_files = "ios/*.{m,swift}", "ios/vendor/*.swift"
  s.resource_bundles = { "PulseTrackerPrivacy" => ["ios/vendor/PrivacyInfo.xcprivacy"] }
  s.dependency "React-Core"
end
