/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-shadow */
import { useContractFunction, useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { Switch } from '@headlessui/react';
import useAlchemy from '../hooks/useAlchemy';
import { SectionTemplate } from './SectionTemplate';
import { client, getNFCStatusChanged } from '../queries';
import useContract from '../hooks/useContract';

export const Nfps = () => {
  const [ contract, setContract ] = useState<any>({});
  const [ userNFTs, setUserNFTs ] = useState([]);

  const [ userNfps, setUserNfps ] = useState<any>([]);
  const { getNFTFromWallet } = useAlchemy();
  const { account } = useEthers();

  const { state: tagState, send: setTag } = useContractFunction(contract, 'changeNFCState');
  const { state: destroyState, send: destroyNfc } = useContractFunction(contract, 'destroyNFC');

  useEffect(() => {
    const getNfts = async () => (account ? getNFTFromWallet(account) : Promise.resolve(undefined));

    (async () => {
      const getNfps = await client
        .query(getNFCStatusChanged, { first: 1000 })
        .toPromise();

      if (getNfps.data && getNfps.data.nfcstatusChangeds) {
        const allNfps = getNfps.data.nfcstatusChangeds;
        const userNfts = userNFTs.map((nft) => nft!.contract!.address!);

        let uNfps = allNfps.sort((a: any, b: any): any => {
          if (parseInt(a.nftInfo_lastUpdated, 10) > parseInt(b.nftInfo_lastUpdated, 10)) {
            return -1;
          }

          return 0;
        }).filter((nfp: any) => userNfts.includes(nfp.nftInfo_nftAddress));

        uNfps = uNfps.filter((value: any, index: any, self: any) => index === self.findIndex((t) => (
          t.nftInfo_nftAddress === value.nftInfo_nftAddress
        )));

        setUserNfps(uNfps);
        console.log({ uNfps });
      }
    })();

    if (userNFTs.length === 0) {
      getNfts().then((ans) => {
        if (ans) {
          setUserNFTs(ans.ownedNfts.filter((nft: any) => !nft.error));
        }
      });
    }

    setContract(useContract());
  }, [ account, userNFTs, tagState, destroyState ]);

  const setTagState = (nfp: any) => {
    setTag(nfp.nfcTag, nfp.nftInfo_nftAddress, nfp.nftInfo_nftId);
  };

  const destroyTag = (nfp: any) => {
    destroyNfc(nfp.nfcTag, nfp.nftInfo_nftAddress, nfp.nftInfo_nftId);
  };

  return (
    <SectionTemplate id="nfps">
      <div className="relative min-h-screen max-w-6xl mx-auto flex">
        <div className="mt-16 text-center bg-black">
          <div className="my-24">
            <h1 className="text-3xl font-bold text-gray-200 mb-8">
              Non Fungible
              {' '}
              <a className="text-purple-700">PRINTS</a>
            </h1>
          </div>

          <div className="flex flex-col text-white space-y-2">
            {userNfps.map((nfp) => (
              <div className="relative flex text-left justify-between p-2 rounded-md">
                {
                  nfp.nftInfo_isDestroyed && (
                    <div className="absolute z-20 left-0 right-0 top-0 bottom-0 bg-black flex rounded-md p-2">
                      <div className="flex flex-col">
                        <h2 className="font-bold text-lg">
                          {nfp.nftInfo_nftName}
                          {' '}
                          #
                          {nfp.nftInfo_nftId}
                        </h2>
                        <span className="">
                          TagID:
                          {' '}
                          {nfp.nfcTag}
                        </span>
                      </div>

                      <h3 className="font-bold mx-auto my-auto text-2xl text-red-500">DESTROYED</h3>
                    </div>
                  )
                }

                <div className="flex flex-col">
                  <h2 className="font-bold text-lg">
                    {nfp.nftInfo_nftName}
                    {' '}
                    #
                    {nfp.nftInfo_nftId}
                  </h2>
                  <span className="">
                    TagID:
                    {' '}
                    {nfp.nfcTag}
                  </span>
                </div>

                <div className="my-auto flex justify-center">
                  <div className="ml-16 flex flex-col justify-center">
                    <span className="text-sm">Change State</span>
                    <Switch
                      checked={nfp.nftInfo_isActive}
                      onChange={() => setTagState(nfp)}
                      className={`${nfp.nftInfo_isActive ? 'bg-green-700' : 'bg-red-700'}
          my-auto mx-auto relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span
                        aria-hidden="true"
                        className={`${nfp.nftInfo_isActive ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>

                  <div className="ml-8 flex flex-col justify-center">
                    <span className="text-sm">Destroy</span>
                    <button type="submit" onClick={() => destroyTag(nfp)} className="mx-auto h-8 w-8 text-white"><XCircleIcon /></button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )
    </SectionTemplate>
  );
};
