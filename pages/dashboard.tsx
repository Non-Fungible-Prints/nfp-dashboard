/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-key */
import Head from 'next/head';
import AOS from 'aos';
import { useEffect } from 'react';
import { Hero } from '../sections';
import { Navbar } from '../components';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

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

      </main>
    </>
  );
}
