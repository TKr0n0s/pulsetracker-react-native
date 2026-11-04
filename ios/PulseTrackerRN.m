#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PulseTrackerRN, NSObject)
RCT_EXTERN_METHOD(configure:(NSString *)appKey appUserId:(NSString *)appUserId environment:(NSString *)environment apiBase:(NSString *)apiBase)
RCT_EXTERN_METHOD(identify:(NSString *)appUserId email:(NSString *)email phone:(NSString *)phone)
RCT_EXTERN_METHOD(paywallEvent:(NSString *)name placement:(NSString *)placement source:(NSString *)source)
+ (BOOL)requiresMainQueueSetup { return NO; }
@end
