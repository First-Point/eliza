import { IAgentRuntime } from "@elizaos/core";
import { FirstpointConfig } from "../types";

/**
 * Validates the configuration required for the Firstpoint Crypto plugin
 * @param runtime The Eliza agent runtime
 * @returns Validated configuration object
 * @throws Error if required configuration is missing
 */
export function validateConfig(runtime: IAgentRuntime): FirstpointConfig {
    const apiDomain = runtime.getSetting("FIRSTPOINT_API_DOMAIN");
    const apiKey = runtime.getSetting("FIRSTPOINT_API_KEY");

    if (!apiDomain) {
        throw new Error("FIRSTPOINT_API_DOMAIN is required");
    }
    if (!apiKey) {
        throw new Error("FIRSTPOINT_API_KEY is required");
    }

    return {
        apiDomain,
        apiKey
    };
}