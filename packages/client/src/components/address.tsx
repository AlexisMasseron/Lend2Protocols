import * as React from "react";
import { useMetaMask } from "metamask-react";
import { Tooltip, Typography } from "@material-ui/core";
// import { useProvider } from "contexts/web3";
// import { ethers } from "ethers";
// import { useQuery } from "react-query";

// Not supported on Kovan
// async function lookupAddress(
//   provider: ethers.providers.Web3Provider | null,
//   account: string | null
// ) {
//   if (!provider || !account) return null;
//   const name = await provider.lookupAddress(account);
//   return name;
// }

function useAddress() {
  const { account /*, chainId */ } = useMetaMask();
  // const provider = useProvider();

  // Not supported on Kovan
  // const { data: ensName, isLoading } = useQuery(
  //   ["ens", { account, chainId }],
  //   () => lookupAddress(provider, account)
  // );

  return {
    address: account,
    ensName: "",
    isLoading: false,
  };
}

export function Address() {
  const { address, ensName, isLoading } = useAddress();

  if (isLoading) return null;

  if (!address) return null;

  const Display = Boolean(ensName) ? (
    <Typography color="textPrimary" align="center">
      {ensName}
    </Typography>
  ) : (
    <Typography color="textPrimary" align="center">
      <strong>{cutAddress(address)}</strong>
    </Typography>
  );

  return (
    <Tooltip title={address} arrow>
      {Display}
    </Tooltip>
  );
}

function cutAddress(address: string) {
  return `${address.substring(0, 5)}...${address.substring(
    address.length - 5
  )}`;
}
