import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type State,
    type HandlerCallback,
    ModelClass,
    elizaLogger,
    composeContext,
    generateMessageResponse
} from "@elizaos/core";
import { FirstpointService } from "../services/firstpoint.service";
import { validateConfig } from "../utils/config";
import { getCryptoPriceTemplate } from "../templates";
import { getCryptoPriceExamples } from "./actionExamples";

interface ActionResponse {
    success: boolean;
    data?: {
        symbol: string;
        priceUsd: number;
        formattedPrice: string;
    };
    error?: string;
}

export const getCryptoPrice: Action = {
    name: "getCryptoPrice",
    similes: ["getPrice", "fetchCryptoPrice", "checkPrice", "cryptoPrice", "tokenPrice"],
    description: "Fetches real-time cryptocurrency prices in USD",
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        try {
            validateConfig(runtime);

            // Validate input
            const content = message.content;
            if (!content) return false;

            // Check if we have either direct symbol or params.symbol
            if (typeof content === 'string') return true;
            if (typeof content === 'object' && 'params' in content) {
                const params = content.params as { symbol?: string };
                return typeof params?.symbol === 'string';
            }

            return false;
        } catch (error) {
            elizaLogger.error('Validation error:', error);
            return false;
        }
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ): Promise<boolean | void> => {
        try {
            // Initialize/update state
            if (!state) {
                state = (await runtime.composeState(message)) as State;
            }
            state = await runtime.updateRecentMessageState(state);

            // state -> context
            const cryptoContext = composeContext({
                state,
                template: getCryptoPriceTemplate,
            });

            // context -> content
            const content = await generateMessageResponse({
                runtime,
                context: cryptoContext,
                modelClass: ModelClass.SMALL,
            });

            // parse content
            const hasSymbol = content?.symbol && !content?.error;
            if (!hasSymbol) {
                callback({
                    text: "Could not determine which cryptocurrency to check. Please specify a symbol (e.g., BTC, ETH, AVAX).",
                    content: { error: "Symbol not found" }
                });
                return false;
            }

            // Instantiate API service
            const config = validateConfig(runtime);
            const cryptoService = new FirstpointService(config);

            // Fetch price & respond
            const symbol = String(content.symbol).toUpperCase();
            const priceUsd = await cryptoService.getPrice(symbol);

            elizaLogger.success(`Successfully fetched price for ${symbol}`);

            if (callback) {
                callback({
                    text: `The current price of ${symbol} is $${priceUsd.toLocaleString()} USD`,
                    content: {
                        symbol,
                        priceUsd,
                        formattedPrice: `$${priceUsd.toLocaleString()} USD`
                    }
                });
                return true;
            }

        } catch (error) {
            elizaLogger.error("Error in getCryptoPrice handler:", error);

            callback({
                text: `Error fetching crypto price: ${error.message}`,
                content: { error: error.message }
            });
            return false;
        }
    },
    examples: getCryptoPriceExamples
};