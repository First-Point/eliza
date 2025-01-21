export interface FirstpointConfig {
    apiDomain: string;
    apiKey: string;
}

interface CryptoData {
    symbol: string;
    name: string;
    price_usd: number;
    change_24h: number;
    market_cap: number;
    volume_24h: number;
    last_updated: string;
    source: string;
    input_symbol: string;
}

interface MetadataInfo {
    input: string;
    matched: string;
}

interface Metadata {
    timestamp: string;
    source: string;
    match_info: MetadataInfo;
}

export interface PriceResponse {
    success: boolean;
    data: CryptoData;
    metadata: Metadata;
}