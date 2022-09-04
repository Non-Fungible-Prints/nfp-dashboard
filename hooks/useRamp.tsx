import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

export const useRamp = () => {
  const hostUrl = () => `${window?.location.origin}/images/nfp_logo.png`;
  const rampSDK = new RampInstantSDK({
    hostAppName: 'Non Fungible Prints',
    hostLogoUrl: hostUrl(),
    defaultAsset: 'MATIC_MATIC',
  });

  return { rampSDK };
};
