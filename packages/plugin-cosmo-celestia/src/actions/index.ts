import { Action } from '@elizaos/core';
import { default as Info } from './info/info';
import { default as GetSwapConfig } from './trading/getSwapConfig';
import { default as GetDexData } from './trading/getDexData';
import { default as GetWalletDexData } from './trading/getWalletDexData';
import { default as RemoveLiquidity } from './trading/removeLiquidity';
import { default as GetLiquidityConfig } from './trading/addLiquidity';
import { default as GetTradeLogs } from './trading/getTradeLogs';
import { default as Faucet } from './trading/faucet';
export default [
    Info,
    GetSwapConfig,
    GetWalletDexData,
    RemoveLiquidity,
    GetLiquidityConfig,
    GetTradeLogs,
    GetDexData,
    Faucet
] as Action[];

export * from './info/info';
export * from './trading/getSwapConfig';
export * from './trading/getWalletDexData';
export * from './trading/removeLiquidity';
export * from './trading/addLiquidity';
export * from './trading/getTradeLogs';
export * from './trading/getDexData';
export * from './trading/faucet';