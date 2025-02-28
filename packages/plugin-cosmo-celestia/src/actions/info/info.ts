import {
    Action,
    ActionExample,
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
    elizaLogger,
    composeContext,
} from "@elizaos/core";

export default {
    name: "AGENT_INFO",
    similes: [
        "GET_AGENT_INFO",
        "SHOW_ACTIONS", 
        "LIST_ACTIONS",
        "WHAT_CAN_YOU_DO",
        "SHOW_CAPABILITIES",
        "LIST_CAPABILITIES"
    ],
    description: "MUST use this action if the user wants to see the list of actions that Cosmo can perform.",
    validate: async () => true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        callback({
            text: `I am Cosmo, your automated DeFi trading assistant for the Celestia ecosystem. Here's what I can help you with:

1. DEX Data & Status
- Get general DEX information and reserves
- Check wallet-specific DEX data
- View trading history and logs

2. Liquidity Management
- Add liquidity to pools
- Remove liquidity from pools
- View liquidity configurations

3. Token Operations
- Swap tokens on the DEX
- Get tokens from the faucet for testing

Just let me know what you'd like to do and I'll guide you through the process.`,
            content: { type: "info" },
        });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "What actions can you perform?",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Show me what you can do",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "List your capabilities",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "What are your available actions?",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Tell me about your features",
                },
            }
        ],
    ] as ActionExample[][],
} as Action; 