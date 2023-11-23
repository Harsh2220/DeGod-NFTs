export const nftsApi = {
  fetchAllnfts: ({ pageParam = 0 }) =>
    fetch(
      `https://api.covalenthq.com/v1/eth-mainnet/nft/0x8821bee2ba0df28761afff119d66390d594cd280/metadata/?page-size=10&page-number=${pageParam}`,
      {
        headers: {
          Authorization: "Bearer cqt_rQ4rjPvbKdDRJCTVHyDWxdhH4hPp",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      return res.json();
    }),
};
