import { useEffect, useState } from 'react';
import {
  useEthers, useLookupAddress, shortenAddress,
} from '@usedapp/core';

import Web3Modal from 'web3modal';

export const ConnectWallet = () => {
  const { account, activate, deactivate } = useEthers();
  const { ens } = useLookupAddress(account);
  const [activateError, setActivateError] = useState('');
  const { error } = useEthers();

  useEffect(() => {
    if (error && account) {
      setActivateError(error.message);
      return;
    }
    setActivateError('');
  }, [error, account]);

  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: 'Metamask',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
    };

    const web3Modal = new Web3Modal({
      providerOptions,
    });
    try {
      const provider = await web3Modal.connect();
      await activate(provider);
      setActivateError('');
    } catch (error: any) {
      setActivateError(error.message);
    }
  };
  useEffect(() => {
    const initProvider = async () => activateProvider();

    if (!account) {
      initProvider();
    }
  }, []);

  return (
    <div className="p-4 text-white flex flex-row">
      <div>{activateError}</div>
      {account ? (
        <div className="text-white space-x-4">
          <span>{shortenAddress(account)}</span>
          <button className="border-2 border-white rounded-md px-4 py-2" type="button" onClick={() => deactivate()}>Disconnect</button>
        </div>
      ) : (
        <button type="button" onClick={activateProvider} className="border-2 border-white rounded-md px-4 py-2">Connect Wallet</button>
      )}
    </div>
  );
};
