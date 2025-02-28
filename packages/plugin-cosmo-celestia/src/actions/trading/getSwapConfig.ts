import {
    Action,
    ActionExample,
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
} from "@elizaos/core";
import { createCosmoService } from "../../services/CosmoService";
import { validateCosmoConfig } from "../../environment";

export default {
    name: "SWAP_TOKENS",
    similes: ["SWAP_TOKEN", "CHANGE_TOKEN", "BUY_TOKEN", "SELL_TOKEN"],
    description: "Swap tokens on the DEX",
    validate: async (runtime: IAgentRuntime) => {
        try {
            await validateCosmoConfig(runtime);
            return true;
        } catch (error) {
            return false;
        }
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        const config = await validateCosmoConfig(runtime);
        const cosmoService = createCosmoService(config);
        const swapConfig = await cosmoService.getSwapConfig();
        
        callback({
            text: "You can swap tokens with the following configuration.",
            content: { swapConfig },
        });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Swap 100 USDC for ICECREAM",
                    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "I want to buy ICECREAM with my USDC",
                    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Exchange tokens on DEX",
                    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Sell my ICECREAM for USDC",
                    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
                },
            }
        ]
    ] as ActionExample[][],
} as Action;
