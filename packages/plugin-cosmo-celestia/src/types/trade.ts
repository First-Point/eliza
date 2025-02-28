export interface SwapConfig {
  dex: {
    address: string;
    abi: Array<{
      inputs: any[];
      name: string;
      outputs: any[];
      stateMutability: string;
      type: string;
    }>;
  };
  tokens: {
    icecream: TokenConfig;
    usdc: TokenConfig;
  };
  chain: {
    id: number;
    name: string;
    rpcUrl: string;
    blockExplorerUrl: string;
  };
  methods: {
    swap: {
      icecreamToUsdc: string;
      usdcToIcecream: string;
      getAmountOut: string;
    };
    token: {
      approve: string;
      balanceOf: string;
      allowance: string;
    };
  };
}

export interface TokenConfig {
  address: string;
  abi: any[];
  decimals: number;
  symbol: string;
}

export interface DexData {
  reserves: {
    icecream: string;
    usdc: string;
  };
  tokens: {
    icecream: {
      address: string;
      decimals: number;
    };
    usdc: {
      address: string;
      decimals: number;
    };
  };
  liquidity: {
    total: string;
    share: string;
  };
  rates: {
    icecreamPerUsdc: string;
    usdcPerIcecream: string;
  };
  examples: {
    swap: {
      "1_icecream": string;
      "1_usdc": string;
    };
  };
}

export interface WalletDexData {
  balances: {
    icecream: string;
    usdc: string;
  };
  allowances: {
    icecream: string;
    usdc: string;
  };
  liquidity: {
    share: string;
    tokens: {
      icecream: string;
      usdc: string;
    };
  };
}

export interface LiquidityConfig {
  poolAddress: string;
  tokens: {
    icecream: {
      address: string;
      decimals: number;
      minAmount: string;
    };
    usdc: {
      address: string;
      decimals: number;
      minAmount: string;
    };
  };
  methods: {
    addLiquidity: string;
    removeLiquidity: string;
    approve: string;
    allowance: string;
  };
}

export interface TradeLog {
  type: string;
  tokenIn: {
    symbol: string;
    amount: string;
    price: string;
  };
  tokenOut: {
    symbol: string;
    amount: string;
    price: string;
  };
  timestamp: string;
  status: string;
}

export interface TradeLogs {
  status: string;
  trades: TradeLog[];
  summary: {
    totalTrades: number;
    volume: {
      ICECREAM: string;
      USDC: string;
    };
    profitLoss: {
      USDC: string;
      percentage: string;
    };
  };
} 