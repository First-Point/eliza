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
    name: "ADD_LIQUIDITY",
    similes: [
        "PROVIDE_LIQUIDITY",
        "DEPOSIT_LP",
        "BECOME_LP",
        "JOIN_POOL",
        "PROVIDE_TOKENS"
    ],
    description: "Add liquidity to a pool on the DEX",
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
        const liquidityConfig = await cosmoService.getLiquidityConfig();
        
        callback({
            text: "You can add liquidity with the following configuration.",
            content: { liquidityConfig },
        });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Add liquidity with 100 USDC and 100 ICECREAM",
                    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "I want to provide liquidity to the USDC-ICECREAM pool",
                    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Become a liquidity provider",
                    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Add LP tokens to the pool",
                    walletAddress: "0x1234567890abcdef12345678",
                },
            }
        ]
    ] as ActionExample[][],
} as Action;
