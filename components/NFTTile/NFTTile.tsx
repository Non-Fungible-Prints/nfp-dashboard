// import Image from "next/image"
import React, { FC } from 'react';

const NFTTile: FC<any> = ({ nftData, onClick }) => (
  <div className="group rounded-lg cursor-pointer border-2 border-gray-200" onClick={() => onClick(nftData)}>
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
      <img src={nftData.tokenUri.gateway} alt={nftData.contractMetadata?.name || ''} />
    </div>
    <h3 className="py-4 text-md text-bold text-gray-200">{`${nftData.contractMetadata?.name || ''} #${parseInt(nftData.id.tokenId, 16)}`}</h3>
  </div>
);

export default NFTTile;
