# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- Remove the following lines of code as they are unnecessary writtern. If the `event.PartitionKey` exists, return it and thats it.
```
// remove
  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

	// Change to 
	 if (event && event.partitionKey) {
    return event.partitionKey;
  }

```

- Remove unnecessary constant `TRIVIAL_PARTITION_KEY`, no need of this as it equal when candidate is empty string.

- No need to convert the candiate to `JSON.stringify` everytime. `crypto.createHash("sha3-512").update(data).digest("hex");` alway returns hash string. so no need to convert it again to string.
```
// Remove it 
if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
```

and thats it.