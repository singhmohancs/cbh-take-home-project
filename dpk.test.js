const crypto = require('crypto');
const { deterministicPartitionKey } = require('./dpk');

describe('deterministicPartitionKey', () => {
  const DEFAULT_PARTITION_KEY = '0';
  
  test('should return the default hash when no event is provided', () => {
    const result = deterministicPartitionKey(null);
    expect(result).toBe(DEFAULT_PARTITION_KEY);
  });

  test('should return the partitionKey if it exists in the event', () => {
    const event = { partitionKey: 'customPartitionKey' };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(event.partitionKey);
  });

  test('should generate a deterministic partition key for the event', () => {
    const event = { id: 1, name: 'John' };
    const expectedKey = crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex');
    const result = deterministicPartitionKey(event);
    expect(result).toBe(expectedKey);
  });

  test('should generate a new hash when the generated key exceeds the maximum length', () => {
    const longKey = 'a'.repeat(300);
    const expectedKey = crypto.createHash('sha3-512').update(longKey).digest('hex');
    const result = deterministicPartitionKey(longKey);
    expect(result).toBe(expectedKey);
  });
});