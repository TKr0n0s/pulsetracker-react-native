package io.pulsetracker.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import io.pulsetracker.sdk.PaywallSource
import io.pulsetracker.sdk.PulseEnvironment
import io.pulsetracker.sdk.PulseTracker

/** React Native bridge over the official Android SDK (JitPack). */
class PulseTrackerRNModule(private val ctx: ReactApplicationContext) : ReactContextBaseJavaModule(ctx) {
  override fun getName() = "PulseTrackerRN"

  @ReactMethod
  fun configure(appKey: String, appUserId: String?, environment: String?, apiBase: String?) {
    val env = PulseEnvironment.values().firstOrNull { it.wire == environment }
    if (apiBase != null) PulseTracker.configure(ctx.applicationContext, appKey, appUserId, env, apiBase)
    else PulseTracker.configure(ctx.applicationContext, appKey, appUserId, env)
  }

  @ReactMethod
  fun identify(appUserId: String, email: String?, phone: String?) = PulseTracker.identify(appUserId, email, phone)

  @ReactMethod
  fun paywallEvent(name: String, placement: String?, source: String) {
    val src = PaywallSource.values().firstOrNull { it.wire == source } ?: PaywallSource.SDK
    if (name == "paywall_close") PulseTracker.paywallClosed(placement, src) else PulseTracker.paywallShown(placement, src)
  }
}
