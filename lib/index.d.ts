export type PulseEnvironment = 'production' | 'sandbox' | 'test';
export type PaywallSource = 'sdk' | 'superwall' | 'revenuecat';
export interface ConfigureOptions {
  /** App key from PulseTracker → Settings → Connect app. */
  appKey: string;
  /** Purchases's appUserID, so purchases join this install. */
  appUserId?: string | null;
  /** Leave empty to detect (store build = production, TestFlight/debug = sandbox, simulator = test). */
  environment?: PulseEnvironment | null;
  apiBase?: string | null;
}
export function configure(opts: ConfigureOptions): void;
export function identify(appUserId: string, contact?: { email?: string | null; phone?: string | null }): void;
export function paywallShown(placement?: string | null, source?: PaywallSource): void;
export function paywallClosed(placement?: string | null, source?: PaywallSource): void;
declare const PulseTracker: { configure: typeof configure; identify: typeof identify; paywallShown: typeof paywallShown; paywallClosed: typeof paywallClosed };
export default PulseTracker;
