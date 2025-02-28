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
    name: "GET_DEX_DATA",
    similes: ["FETCH_DEX_DATA", "SHOW_DEX_INFO", "GET_EXCHANGE_DATA", "GET_DEX_INFO"],
    description: "Get DEX data including reserves and token addresses",
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
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }


        const config = await validateCosmoConfig(runtime);
        const cosmoService = createCosmoService(config);
        const dexData = await cosmoService.getDexData();
        
        callback({
            text: "Here is the current DEX data:",
            content: { dexData },
        });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Show me the DEX information",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "What are the current DEX reserves?",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Get me the DEX token addresses",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "What's the current state of the DEX?",
                },
            }
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Show DEX data",
                },
            }
        ],
    ] as ActionExample[][],
} as Action;
