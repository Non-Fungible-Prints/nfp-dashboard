import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import NFTTile from '../components/NFTTile/NFTTile';
import useAlchemy from '../hooks/useAlchemy';
import { SectionTemplate } from './SectionTemplate';

export const Dashboard = () => {
  const [userNFTs, setUserNFTs] = useState([]);
  const { getNFTFromWallet } = useAlchemy();
  const { account } = useEthers();

  useEffect(() => {
    const getNfts = async () => account ? await getNFTFromWallet(account) : Promise.resolve(undefined);

    getNfts().then(ans => {
      if (ans) {
        setUserNFTs(ans.ownedNfts.filter((nft: any) => !nft.error));
      }
    });

  }, [account])

  const renderNFTs = () => {
    console.log('printNFT')
    return (<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" >
      <div className="group relative">
        {userNFTs.map((nft: any) => <NFTTile key={nft.id.tokenId + nft.timeLastUpdated} nftData={nft} />)}
      </div>
    </div >)
  }

  return (<SectionTemplate id="dashboard">
    <div className="relative min-h-screen max-w-6xl mx-auto flex">
      <div className="mt-16 text-center bg-black">
        <div className="my-24">
          <h1 className="text-3xl font-bold text-gray-200 mb-8">
            Non Fungible
            {' '}
            <a className="text-purple-700">PRINTS</a>
          </h1>
        </div>

        <div>
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            {renderNFTs()}
          </div>
        </div>
      </div>
    </div>)
  </SectionTemplate>)
};
