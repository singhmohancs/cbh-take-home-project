const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const MAX_PARTITION_KEY_LENGTH = 256;

  // return the PartitionKey if exists event.partitionKey
  if (event && event.partitionKey) {
    return event.partitionKey;
  }

  const data = JSON.stringify(event || "");
  let candidate = crypto.createHash("sha3-512").update(data).digest("hex"); // returns string always

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};
