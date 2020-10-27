const signer = require('../src');
const { sign } = signer;

const sampleAPIKey = 'key1'
const sampleAPISecret = 'AIKi/X7lvfu0haz0SttdbCj+nXmWBt/jfrbPAHRjwNHq'
describe('sign', () => {
    test('without timestamp return hex signature and auto-defined timestamp', () => {
        const { signature, timestamp } = sign(sampleAPIKey, sampleAPISecret, '')
        expect(isHexadecimal(signature)).toBeTruthy();
        expect(timestamp).toBeDefined;
        expect(new Date().getTime() - timestamp < 50).toBeTruthy();
    });
    test('with timestamp return hex signature and timestamp', () => {
        const { signature, timestamp } = sign(sampleAPIKey, sampleAPISecret, '', 1603783386198)
        expect(isHexadecimal(signature)).toBeTruthy();
        expect(timestamp).toBe(1603783386198);
    });

    test('with parameters and timestamp return hex signature and timestamp', () => {
        const { signature, timestamp } = sign(sampleAPIKey, sampleAPISecret, 'lorem ipsum,lorem ipsum,lorem ipsum', 1603783386198)
        expect(isHexadecimal(signature)).toBeTruthy();
        expect(timestamp).toBe(1603783386198);
    });
})

function isHexadecimal(str) {
    return Boolean(str.match(/^[0-9a-f]+$/i));
}

