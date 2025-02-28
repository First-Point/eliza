import {
    Action,
    ActionExample,
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
    generateObject,
    ModelClass,
    composeContext,
} from "@elizaos/core";
import { createCosmoService } from "../../services/CosmoService";
import { validateCosmoConfig } from "../../environment";
import { z } from "zod";

const removeLiquidityTemplate = `Extract the wallet address and liquidity amount from the request.

Example response:
\`\`\`json
{
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "liquidityAmount": "100"
}
\`\`\`

## Recent Messages

{{recentMessages}}

Extract the Ethereum wallet address (starts with 0x) and liquidity amount.
Respond with a JSON markdown block containing only the extracted values.`;

interface RemoveLiquidityContent {
    walletAddress: string;
    liquidityAmount: string;
}

const removeLiquiditySchema = z.object({
    walletAddress: z.string(),
    liquidityAmount: z.string()
});

export default {
    name: "REMOVE_LIQUIDITY",
    similes: [
        "WITHDRAW_LIQUIDITY",
        "REMOVE_MY_LIQUIDITY",
        "TAKE_OUT_LIQUIDITY",
        "GET_MY_LIQUIDITY_OUT",
        "WITHDRAW_MY_LIQUIDITY"
    ],
    description: "MUST USE THIS TO Remove liquidity from the pool",
    validate: async (runtime: IAgentRuntime, message: Memory) => {
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
        
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        const context = composeContext({
            state,
            template: removeLiquidityTemplate,
        });

        const { object } = await generateObject({
            runtime,
            context,
            modelClass: ModelClass.SMALL,
            schema: removeLiquiditySchema
        }) as { object: RemoveLiquidityContent };

        const walletAddress = object.walletAddress?.match(/^0x[a-fA-F0-9]{40}$/) 
            ? object.walletAddress 
            : (message.content as any).config?.walletAddress;

        if (!walletAddress?.match(/^0x[a-fA-F0-9]{40}$/)) {
            callback({
                text: "Invalid wallet address. Please provide a valid Ethereum wallet address.",
                content: { error: "Invalid wallet address" },
            });
            return false;
        }

        const result = await cosmoService.removeLiquidity(walletAddress, object.liquidityAmount);
        
        callback({
            text: `Successfully removed liquidity. Transaction hash: ${result.txHash}`,
            content: { result },
        });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Remove liquidity tokens from my wallet 0x1234567890abcdef1234567890abcdef12345678 liquidity amount 100",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Remove liquidity tokens from my wallet",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Remove liquidity",
                },
            }
        ]    
    ] as ActionExample[][],
} as Action;
