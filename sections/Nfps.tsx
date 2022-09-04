/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-shadow */
import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { Switch } from '@headlessui/react';
import NFTTile from '../components/NFTTile/NFTTile';
import useAlchemy from '../hooks/useAlchemy';
import { SectionTemplate } from './SectionTemplate';
import PrintModal from '../components/PrintModal/PrintModal';
import { client, getNFCStatusChanged } from '../queries';

export const Nfps = () => {
  const [ userNFTs, setUserNFTs ] = useState([]);
  const [ selectedNFT, setSelectedNFT ] = useState(null);

  const [ userNfps, setUserNfps ] = useState<any>([]);
  const { getNFTFromWallet } = useAlchemy();
  const { account } = useEthers();

  useEffect(() => {
    const getNfts = async () => (account ? getNFTFromWallet(account) : Promise.resolve(undefined));

    (async () => {
      const getNfps = await client
        .query(getNFCStatusChanged, { first: 1000 })
        .toPromise();

      if (getNfps.data && getNfps.data.nfcprinteds) {
        const allNfps = getNfps.data.nfcprinteds;
        const userNfts = userNFTs.map((nft) => nft!.contract!.address!);
        console.log(userNfts);
        // eslint-disable-next-line no-shadow
        const uNfps = allNfps.filter((nfp) => userNfts.includes(nfp.nftInfo_nftAddress));
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
  }, [ account, userNFTs ]);

  // Change state - jedna funkcja
  const [ enabled, setEnabled ] = useState(false);
  const setTagState = (nfp) => {
    // wywołać metodę destroy
  };

  const destroyTag = (nfp) => {
    // wywołać metodę destroy
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
              <div className="flex text-left justify-between">
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

                <div className="">
                  <Switch
                    checked={nfp.nftInfo_isActive}
                    onChange={() => setTagState(nfp)}
                    className={`${nfp.nftInfo_isActive ? 'bg-green-700' : 'bg-red-700'}
          relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${nfp.nftInfo_isActive ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                  <button type="button" onChange={() => destroyTag(nfp)} className="my-auto h-8 w-8 text-white"><XCircleIcon /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedNFT && <PrintModal nftData={selectedNFT} onClose={() => setSelectedNFT(null)} />}
      </div>
      )
    </SectionTemplate>
  );
};
