import { Plugin } from "@elizaos/core";
import actions from "./actions";

export const cosmoCelestiaPlugin: Plugin = {
    name: "cosmo-celestia",
    description: "Cosmo Celestia Plugin for Eliza - Celestia DeFi Automation",
    actions: actions,
    evaluators: [],
};

export default cosmoCelestiaPlugin; 