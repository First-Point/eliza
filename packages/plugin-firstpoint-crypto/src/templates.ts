export const getCryptoPriceTemplate = `Respond with a JSON object containing cryptocurrency symbol information.
Extract the cryptocurrency symbol from the most recent message. If no specific symbol is provided, respond with an error.

The response must include:
- symbol: The cryptocurrency symbol (e.g., BTC, ETH, BNB)

Example response:
\`\`\`json
{
    "symbol": "BTC"
}
\`\`\`
{{recentMessages}}
Extract the cryptocurrency symbol from the most recent message.
Respond with a JSON markdown block containing the symbol.`;