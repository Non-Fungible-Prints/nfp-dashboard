import { createClient } from 'urql';

const API_URL = 'https://api.thegraph.com/subgraphs/name/kowalewskipawel/non-fungible-prints';

export const client = createClient({
  url: API_URL,
});

export const getNFCStatusChanged = `query nfcprinted($first: Int! ) {
  nfcprinteds(first: $first) {
      nftInfo_nftAddress
      nftInfo_isActive
      nfcTag
      nftInfo_nftId
      nftInfo_nftUri
      nftInfo_nftName
      nftInfo_lastUpdated
      nftInfo_isDestroyed
      }
  }`;
