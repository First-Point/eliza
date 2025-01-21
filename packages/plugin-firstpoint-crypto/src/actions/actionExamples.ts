import { ActionExample } from "@elizaos/core";

export const getCryptoPriceExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: { text: "What's the current price of Bitcoin?", action: "getCryptoPrice", params: { symbol: "BTC" } }
        },
        {
            user: "{{user2}}",
            content: { text: "The current price of BTC is $45,000 USD" }
        }
    ],
    [
        {
            user: "{{user1}}",
            content: { text: "Check ETH price", action: "getCryptoPrice", params: { symbol: "ETH" } }
        },
        {
            user: "{{user2}}",
            content: { text: "Ethereum is currently trading at $2,800 USD" }
        }
    ],
    [
        {
            user: "{{user1}}",
            content: { text: "Can you tell me the price of Dogecoin?", action: "getCryptoPrice", params: { symbol: "DOGE" } }
        },
        {
            user: "{{user2}}",
            content: { text: "Dogecoin is valued at $0.085 USD" }
        }
    ],
    [
        {
            user: "{{user1}}",
            content: { text: "What is the latest price for Solana?", action: "getCryptoPrice", params: { symbol: "SOL" } }
        },
        {
            user: "{{user2}}",
            content: { text: "Solana's current price is $32.50 USD" }
        }
    ],

];
