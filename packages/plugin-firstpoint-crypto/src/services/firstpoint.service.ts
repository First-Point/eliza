import { elizaLogger } from "@elizaos/core";

import { FirstpointConfig, PriceResponse } from "../types";

/**
 * Service class for interacting with the Firstpoint Crypto API
 */
export class FirstpointService {
    private baseUrl: string;
    private apiKey: string;

    /**
     * Creates a new instance of FirstpointService
     * @param config Configuration object containing API credentials
     */
    constructor(config: FirstpointConfig) {
        this.baseUrl = config.apiDomain.replace(/\/$/, '');
        this.apiKey = config.apiKey;
    }

    /**
     * Fetches the current price of a cryptocurrency
     * @param symbol The cryptocurrency symbol (e.g., BTC, ETH)
     * @returns The current price in USD
     * @throws Error if the API request fails
     */
    async getPrice(symbol: string): Promise<number> {
        try {
            const response = await fetch(
                `${this.baseUrl}/api/crypto/prices/${symbol}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            const data: PriceResponse = await response.json();

            if (!data.success) {
                throw new Error('API returned unsuccessful response');
            }

            return data.data.price_usd;
        } catch (error) {
            elizaLogger.error(`FirstpointService error:`, error);
            throw error;
        }
    }
}