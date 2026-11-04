import Foundation

/// React Native bridge over the official iOS SDK (vendored in ios/vendor).
@objc(PulseTrackerRN)
final class PulseTrackerRN: NSObject {
    @objc func configure(_ appKey: String, appUserId: String?, environment: String?, apiBase: String?) {
        let env = environment.flatMap(PulseEnvironment.init(rawValue:))
        if let base = apiBase.flatMap(URL.init(string:)) {
            PulseTracker.configure(appKey: appKey, appUserID: appUserId, environment: env, apiBase: base)
        } else {
            PulseTracker.configure(appKey: appKey, appUserID: appUserId, environment: env)
        }
    }

    @objc func identify(_ appUserId: String, email: String?, phone: String?) {
        PulseTracker.identify(appUserId, email: email, phone: phone)
    }

    @objc func paywallEvent(_ name: String, placement: String?, source: String) {
        let src = PaywallSource(rawValue: source) ?? .sdk
        if name == "paywall_close" { PulseTracker.paywallClosed(placement: placement, source: src) }
        else { PulseTracker.paywallShown(placement: placement, source: src) }
    }
}
