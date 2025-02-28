import axios, { AxiosInstance } from "axios";
import { CosmoConfig } from "../environment";
import { 
    SwapConfig, 
    DexData, 
    WalletDexData, 
    LiquidityConfig, 
    TradeLogs 
} from "../types";

export interface CosmoServiceConfig {
    apiBaseUrl: string;
    apiToken: string;
    apiKey: string;
    timeout?: number;
}

export class CosmoService {
    private readonly client: AxiosInstance;
    private readonly config: CosmoServiceConfig;

    constructor(config: CosmoServiceConfig) {
        this.config = config;
        this.client = axios.create({
            baseURL: config.apiBaseUrl + '/api/celestia',
            headers: {
                Authorization: `Bearer ${config.apiToken}`,
                "x-api-key": config.apiKey,
                "Content-Type": "application/json",
            },
        });
    }

    async getSwapConfig(): Promise<SwapConfig> {
        const response = await this.client.get('/trade/swap/config');
        return response.data.data;
    }

    async getDexData(): Promise<DexData> {
        const response = await this.client.get('/trade/dex');
        return response.data.data;
    }

    async getWalletDexData(walletAddress: string): Promise<WalletDexData> {
        const response = await this.client.get(`/trade/dex/wallet/${walletAddress}`);
        return response.data.data;
    }

    async removeLiquidity(walletAddress: string, liquidityAmount: string): Promise<{
        txHash: string;
        amounts: {
            icecream: string;
            usdc: string;
        };
    }> {
        const response = await this.client.post('/trade/liquidity/remove', {
            walletAddress,
            liquidityAmount
        });
        return response.data.data;
    }

    async getLiquidityConfig(): Promise<LiquidityConfig> {
        const response = await this.client.get('/trade/liquidity/config');
        return response.data.data;
    }

    async getTradeLogs(walletAddress: string): Promise<TradeLogs> {
        const response = await this.client.get(`/trade/logs/${walletAddress}`);
        return response.data.data;
    }
}
    
export function createCosmoService(config: CosmoConfig): CosmoService {
    return new CosmoService({
        apiBaseUrl: config.API_BASE_URL,
        apiToken: config.API_TOKEN,
        apiKey: config.API_TOKEN,
    });
}