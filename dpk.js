const crypto = require('crypto')

/**
 * This function is used to safely convert a value to a string.
 * 
 * Exceptions - if value is passed as function, recursive object or large object. Throws exception
 * 
 * @param {*} value 
 * @returns string 
 */
const safeConvertToString = (value = '') => {
  try {
    return typeof value === 'string' ? value : JSON.stringify(value)
  } catch (err) {
    throw new Error('Provided input is not input', err)
  }
}

/**
 * function generates or returns updated Hash string from given input
 * 
 * @param {Object | String} event 
 * @returns string
 */
exports.deterministicPartitionKey = (event) => {
  const MAX_LENGTH_PARTITION_KEY = 256
  const DEFAULT_PARTITION_KEY = '0'
  let partitionKey = event?.partitionKey || event

  if (!event) return DEFAULT_PARTITION_KEY
  partitionKey = safeConvertToString(partitionKey)

  if (event?.partitionKey) {
    if(partitionKey.length > MAX_LENGTH_PARTITION_KEY){
      return crypto.createHash('sha3-512').update(partitionKey).digest('hex')
    }
    return partitionKey;
  }

  return crypto.createHash('sha3-512').update(partitionKey).digest('hex')
}
