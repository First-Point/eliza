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

const getTradeLogsTemplate = `Extract the wallet address from the request.

Example response:
\`\`\`json
{
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678"
}
\`\`\`

## Recent Messages

{{recentMessages}}

Extract the Ethereum wallet address (starts with 0x).
Respond with a JSON markdown block containing only the extracted values.`;

interface TradeLogsContent {
    walletAddress: string;
}

const tradeLogsSchema = z.object({
    walletAddress: z.string()
});

export default {
    name: "GET_TRADE_HISTORY",
    similes: [
        "SHOW_MY_TRADES",
        "VIEW_MY_TRADES",
        "CHECK_MY_TRADES",
        "GET_MY_TRADES",
        "SHOW_MY_TRADING_HISTORY",
        "VIEW_MY_TRADING_HISTORY"
    ],
    description: "Get trading history and logs for a wallet",
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
            template: getTradeLogsTemplate,
        });

        const { object } = await generateObject({
            runtime,
            context,
            modelClass: ModelClass.SMALL,
            schema: tradeLogsSchema
        }) as { object: TradeLogsContent };

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

        const tradeLogs = await cosmoService.getTradeLogs(walletAddress);
        
        callback({
            text: `Here are the trade logs for wallet ${walletAddress}:`,
            content: { tradeLogs },
        });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Show me the trade history for wallet 0x1234567890abcdef1234567890abcdef1abc5678",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Show me my trade history",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Get my trading logs for wallet 0x1234567890abcdef1234567890abcdef1abc5678",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "What trades have I made?",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Display my trading activity for wallet 0x1234567890abcdef1234567890abcdef1abc5678",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "View my transaction history",
                },
            },
        ]
        
    ] as ActionExample[][],
} as Action;
