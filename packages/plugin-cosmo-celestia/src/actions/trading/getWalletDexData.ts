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

const getWalletDexDataTemplate = `Extract the wallet address from the request.

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

interface WalletDexDataContent {
    walletAddress: string;
}

const walletDexDataSchema = z.object({
    walletAddress: z.string()
});

export default {
    name: "GET_WALLET_LOGS",
    similes: [
        "CHECK_MY_WALLET",
        "SHOW_MY_WALLET",
        "VIEW_MY_WALLET",
        "GET_MY_WALLET_INFO",
        "CHECK_MY_WALLET_STATUS"
    ],
    description: "Get wallet's DEX data and status",
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
            template: getWalletDexDataTemplate,
        });

        const { object } = await generateObject({
            runtime,
            context,
            modelClass: ModelClass.SMALL,
            schema: walletDexDataSchema
        }) as { object: WalletDexDataContent };

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

        const walletData = await cosmoService.getWalletDexData(walletAddress);
        
        callback({
            text: `Here is the DEX data for wallet ${walletAddress}:`,
            content: { walletData },
        });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Show me the DEX data for wallet 0x1234567890abcdef1234567890abcdef12345678",
                    walletAddress: "0x1234567890abcdef1234567890abcdef12345678"
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Show me my DEX data",
                    walletAddress: "0x1234567890abcdef1234567890abcdef12345678"
                },
            }
        ]
    ] as ActionExample[][],
} as Action;
