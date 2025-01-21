import { type Plugin } from "@elizaos/core";
import { getCryptoPrice } from "./actions/getCryptoPrice";

export const firstpointCryptoPlugin: Plugin = {
    name: "firstpoint-crypto",
    description: "Firstpoint Crypto Plugin for Eliza",
    actions: [getCryptoPrice],
    evaluators: [],
    providers: []
};

export default firstpointCryptoPlugin;