# @elizaos/plugin-firstpoint-crypto

A cryptocurrency price tracking plugin for [ElizaOS](https://github.com/elizaOS/eliza), an autonomous agent operating system. This plugin extends ElizaOS with real-time cryptocurrency price fetching capabilities, enabling agents to retrieve and respond with current market prices.

## Features

- Real-time cryptocurrency price fetching
- Support for multiple cryptocurrencies (BTC, ETH, etc.)
- Price formatting in USD
- Seamless integration with ElizaOS agents
- Comprehensive error handling and validation

## Installation

```bash
npm install @elizaos/plugin-firstpoint-crypto
```

## Configuration

Add these environment variables to your `.env` file:

```env
FIRSTPOINT_API_DOMAIN=your_api_domain
FIRSTPOINT_API_KEY=your_api_key
```

## Usage

1. Import the plugin in your ElizaOS agent configuration:

```typescript
import { firstpointCryptoPlugin } from '@elizaos/plugin-firstpoint-crypto';

// Add to your ElizaOS agent plugins
const config = {
    plugins: [
        firstpointCryptoPlugin,
        // other plugins...
    ]
};
```

2. Interact with your agent using natural language:

```
"What's the current price of Bitcoin?"
"Check ETH price"
"Get AVAX price"
```

## Response Format

The plugin returns responses in the following format:

```json
{
    "text": "The current price of BTC is $45,000 USD",
    "content": {
        "symbol": "BTC",
        "priceUsd": 45000,
        "formattedPrice": "$45,000 USD"
    }
}
```

## Error Handling

The plugin includes comprehensive error handling for:
- Invalid cryptocurrency symbols
- API connection issues
- Missing configuration
- Rate limiting

## Repository

This plugin is maintained at [GitHub](https://github.com/First-Point/plugin-firstpoint-crypto)

## Compatibility

- Requires ElizaOS v0.1.8 or higher
- Node.js 23+
- Compatible with all ElizaOS supported models (Llama, Grok, OpenAI, Anthropic, Gemini, etc.)

## License

MIT

## Author

First Point

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
