import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

export const useRamp = () => {
  const rampSDK = new RampInstantSDK({
    hostAppName: 'Non Fungible Prints',
    hostLogoUrl: 'https://rampnetwork.github.io/assets/misc/test-logo.png',
    defaultAsset: 'MATIC_MATIC',
  });

  return { rampSDK };
};
