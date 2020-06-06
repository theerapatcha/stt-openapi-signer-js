
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
const toOIDArray: Function = (oid: string) => oid.split('.').map((s: string) => parseInt(s, 10));
const toPEM: Function = (ecdh: any) => ECPrivateKey.encode({
    version: new BN(1),
    privateKey: ecdh.getPrivateKey(),
    // OID for brainpoolP512t1
    parameters: toOIDArray(curveOID)
}, 'pem', { label: 'EC PRIVATE KEY' });

// STT OpenAPI Functions
const composePayload: Function = (apiKey: string, params: string, timestamp: number) => `${apiKey}.${params}.${timestamp}`;
const currentTimestamp: Function = () => new Date().getTime();

/**
 * @param {string} apiKey - API Key
 * @param {string} apiSecret - API Secret
 * @param {string} params - Parameters to sign
 * @param {number} timestamp - Timestamp(millis)
 * @returns {string}
 */
export const sign: Function = (apiKey: string, apiSecret: string, params: string, timestamp: number | null = null) => {
    if (timestamp === null) {
        timestamp = currentTimestamp();
    }

    const payload = composePayload(apiKey, params, timestamp);

    const hashedPayload = crypto.createHash('sha256').update(payload).digest('hex');

    const ecdh = crypto.createECDH(curveName)
    ecdh.setPrivateKey(apiSecret, 'base64')
    const signer = crypto.createSign('SHA256');
    signer.update(hashedPayload);
    signer.end();
    return signer.sign(toPEM(ecdh), "hex");

}

