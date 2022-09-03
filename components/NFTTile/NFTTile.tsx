// import Image from "next/image"
import React, { FC } from "react"
import { utils } from 'ethers'
const NFTTile: FC<any> = ({ nftData }) => {
    console.log(nftData)
    console.log(nftData.tokenUri.gateway)
    return (<div className="group">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <img src={`${nftData.tokenUri.gateway}`} />
        </div>
        <h3 className="mt-4 text-sm text-gray-200">{`${nftData.contractMetadata?.name || ''}`}</h3>
        <p className="mt-1 text-lg font-medium text-gray-300">{`Token ID: ${parseInt(nftData.id.tokenId, 16)}`}</p>
    </div>)
}

export default NFTTile;