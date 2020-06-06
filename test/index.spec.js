const signer = require('../src');
const { sign } = signer;

const sampleAPIKey = 'key1'
const sampleAPISecret = 'AIKi/X7lvfu0haz0SttdbCj+nXmWBt/jfrbPAHRjwNHq'
test('sign', () => {
    expect(sign(sampleAPIKey, sampleAPISecret, '')).toBe('Felicity Smoak');
});