const { expect } = require('@jest/globals');
const { octogone } = require('./tools');

test('octogone', () => {
    expect(octogone('abc', 'def')).toBe('abc');
    expect(octogone('abc', 'defgh')).toBe('defgh');
    expect(octogone('abc', 'defghi')).toBe('defghi');
});