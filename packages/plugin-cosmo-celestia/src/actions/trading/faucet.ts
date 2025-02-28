import {
    Action,
    ActionExample,
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
} from "@elizaos/core";
import { validateCosmoConfig } from "../../environment";

export default {
    name: "FAUCET_TOKENS",
    similes: ["GET_TOKENS", "GET_FAUCET_TOKENS", "REQUEST_TOKENS", "CLAIM_TOKENS", "NEED_TOKENS", "FAUCET"],
    description: "Request tokens from the faucet",
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
        callback({
            text: "You can request tokens from the faucet by clicking the button below.",
            content: { dataType: "faucet" },
        });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "I need some tokens",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Can I get tokens from the faucet?",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "How do I get test tokens?",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Where can I get tokens to test with?",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Give me some tokens please",
                },
            }
        ],
    ] as ActionExample[][],
} as Action;
