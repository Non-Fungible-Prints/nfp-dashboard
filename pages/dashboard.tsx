/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-key */
import Head from 'next/head';
import AOS from 'aos';
import { useEffect, useState, useCallback } from 'react';
import { Hero } from '../sections';
import { Navbar } from '../components';
import useAlchemy from '../hooks/useAlchemy';
import { useEthers } from '@usedapp/core';
import NFTTile from '../components/NFTTile/NFTTile';

export default function Home() {
    const [userNFTs, setUserNFTs] = useState([]);
    const { getNFTFromWallet } = useAlchemy();
    const { account } = useEthers();
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

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


    return (
        <>
            <Head>
                <title>NFP - Dashboard</title>
                <meta name="viewport" content="initirn dal-scale=1.0, width=device-width" />
                <meta name="title" content="NFP" />
                <meta name="description" content="NFP" />

                <meta property="og:title" content="NFP" />
                <meta property="og:site_name" content="NFP" />
                <meta property="og:description" content="NFP" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://www.nfp-confirm.com/logo.svg" />
                <meta property="og:url" content="https://www.nfp-confirm.com/" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="NFP" />
                <meta property="twitter:description" content="NFP" />
                <meta property="twitter:image" content="https://www.nfp-confirm.com/logo.svg" />
                <meta property="twitter:url" content="https://www.nfp-confirm.com/" />

                <meta name="theme-color" content="#000" />

                <link rel="icon" href="/logo.svg" type="image/svg+xml" />
            </Head>

            <Navbar />

            <main className="h-full bg-black">
                <Hero />
                <div>
                    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                        {renderNFTs()}
                    </div>
                </div>
            </main>
        </>
    );
}


