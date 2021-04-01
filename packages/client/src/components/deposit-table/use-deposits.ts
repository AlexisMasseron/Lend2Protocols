import { Asset } from "constants/assets";
import {
  AAVE_PROTOCOL_DATA_PROVIDER_KEY,
  L2P_POOL_KEY,
} from "constants/contracts";
import { Contract, ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import { useQuery } from "react-query";
import { useContract } from "utils/contracts";

function roundToFourDecimals(number: number) {
  const roundingNumber = 1e4;
  return Math.round(number * roundingNumber) / roundingNumber;
}

interface Row {
  id: number;
  asset: Asset;
  l2pDep: string;
  l2pLoan: string;
  protocolEarnings: string;
  L2PEarnings: string;
}

interface ReserveData {
  symbol: string;
  tokenAddress: string;
}

// TODO: Uncomment that when delegators mapping is public
// interface Delegator {
//     loaned: ethers.BigNumber;
// }

interface UserReserveData {
  currentATokenBalance: ethers.BigNumber;
  currentStableDebt: ethers.BigNumber;
  principalStableDebt: ethers.BigNumber;
}

async function aggregateReserveData(
  index: number,
  reserve: ReserveData,
  aaveProtocolDataProvider: Contract,
  l2pPool: Contract,
  addressUser: string
): Promise<Row> {
  const asset = reserve.symbol as Asset;
  const reserveAddress = reserve.tokenAddress;

  const delegatorData = await l2pPool.delegators(addressUser);
  const l2pDep = Number(delegatorData.delegated.toString());
  const l2PLoan = Number(delegatorData.loaned.toString());

  const userReserveData: UserReserveData = await aaveProtocolDataProvider.getUserReserveData(
    reserveAddress,
    addressUser
  );
  const currentATokenBalance = Number(
    userReserveData.currentATokenBalance.toString()
  );
  const currentDebtTokenBalance = Number(
    userReserveData.currentStableDebt.toString()
  );
  const principalDebtTokenBalance = Number(
    userReserveData.principalStableDebt.toString()
  );

  // ### Earnings computation ###

  const aTokenEarnings = currentATokenBalance - l2pDep;
  const debtTokenEarnings =
    principalDebtTokenBalance === 0
      ? 0
      : (currentDebtTokenBalance - principalDebtTokenBalance) *
        (l2PLoan / principalDebtTokenBalance);

  // ############################

  const formatedL2pDep = roundToFourDecimals(Number(l2pDep) / 1e18).toString();
  const formatedL2pLoan = roundToFourDecimals(
    Number(l2PLoan) / 1e18
  ).toString();
  const formatedProtocolEarnings = (aTokenEarnings / 1e18).toFixed(6);
  const formatedL2PEarnings = (debtTokenEarnings / 1e18).toFixed(6);

  return {
    id: index,
    asset,
    l2pDep: formatedL2pDep,
    l2pLoan: formatedL2pLoan,
    protocolEarnings: formatedProtocolEarnings,
    L2PEarnings: formatedL2PEarnings,
  };
}

async function aggregateDepositData(
  aaveProtocolDataProvider: Contract | null,
  l2pPool: Contract | null,
  addressUser: string | null
): Promise<Row[]> {
  if (!aaveProtocolDataProvider || !l2pPool || !addressUser) {
    throw new Error("I need the contracts and the address!");
  }

  const allReserves: ReserveData[] = await aaveProtocolDataProvider.getAllReservesTokens();

  // We only support Dai for now
  const supportedAssets = [Asset.dai];
  const reserves = allReserves.filter((reserve) =>
    (supportedAssets as string[]).includes(reserve.symbol)
  );

  return Promise.all(
    reserves.map(async (reserve, index) =>
      aggregateReserveData(
        index,
        reserve,
        aaveProtocolDataProvider,
        l2pPool,
        addressUser
      )
    )
  );
}

export function useDeposits() {
  const l2pPool = useContract(L2P_POOL_KEY);
  const aaveProtocolDataProvider = useContract(AAVE_PROTOCOL_DATA_PROVIDER_KEY);
  const { account } = useMetaMask();

  const queryData = useQuery(
    ["deposits", { account }],
    () => aggregateDepositData(aaveProtocolDataProvider, l2pPool, account),
    {
      refetchInterval: 1000,
    }
  );

  return queryData;
}
