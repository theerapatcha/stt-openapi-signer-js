
import crypto from 'crypto';
const asn1 = require('asn1.js');
const BN = require('bn.js');

// Crypto-related functions
const curveName = 'prime256v1'; // aka: secp256r1
const curveOID = '1.2.840.10045.3.1.7'

// Define ECPrivateKey from RFC 5915
const ECPrivateKey = asn1.define('ECPrivateKey', function (this: any) {
    this.seq().obj(
        this.key('version').int(),
        this.key('privateKey').octstr(),
        this.key('parameters').explicit(0).objid().optional(),
        this.key('publicKey').explicit(1).bitstr().optional()
    );
});
const toOIDArray = (oid: string) => oid.split('.').map((s: string) => parseInt(s, 10));
const toPEM = (ecdh: any) => ECPrivateKey.encode({
    version: new BN(1),
    privateKey: ecdh.getPrivateKey(),
    // OID for brainpoolP512t1
    parameters: toOIDArray(curveOID)
}, 'pem', { label: 'EC PRIVATE KEY' });

// STT OpenAPI Functions
const composePayload = (apiKey: string, params: string, timestamp: number) => `${apiKey}.${params}.${timestamp}`;
const currentTimestamp = () => new Date().getTime();

/**
 * @param {string} apiKey - API Key
 * @param {string} apiSecret - API Secret
 * @param {string} params - Parameters to sign
 * @param {number} timestamp - Timestamp in millisecond (Optional)
 * @returns Signature and timestamp object
 */
export const sign = (apiKey: string, apiSecret: string, params: string, timestamp: number | null = null) => {
    const _timestamp: number = timestamp || currentTimestamp()
    const payload = composePayload(apiKey, params, _timestamp);
    
    const signer = crypto.createSign('SHA256');
    signer.update(payload);
    signer.end();
    const ecdh = crypto.createECDH(curveName)
    ecdh.setPrivateKey(apiSecret, 'base64')
    
    return {
        signature: signer.sign(toPEM(ecdh), "hex"),
        timestamp: _timestamp
    }

}

