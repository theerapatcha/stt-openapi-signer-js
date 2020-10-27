/**
 * @param {string} apiKey - API Key
 * @param {string} apiSecret - API Secret
 * @param {string} params - Parameters to sign
 * @param {number} timestamp - Timestamp in millisecond (Optional)
 * @returns Signature and timestamp object
 */
export declare const sign: (apiKey: string, apiSecret: string, params: string, timestamp?: number | null) => {
    signature: string;
    timestamp: number;
};
