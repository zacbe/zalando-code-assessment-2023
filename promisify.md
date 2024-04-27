# Promisify

You are given an initial function named `promisify`, and it receives two arguments: `fn (type: Function)` and `hasCallback (type: Boolean, default: true)`. Originally the function returns another function that receives the args object (containing the arguments) from the parent function.

## Requirements:

The promisify function needs to be updated in order to satisfy the following requirements:

1. It must convert the function passed in the parameter `fn` into a `Promise` object (thus it can resolve/reject).
2. When the `hasCallback` parameter is `true`, `fn` is a function implementing the callback pattern `(error, response) => {}`.
3. When the `hasCallback` parameter is `false`, `fn` is a regular function.
4. If a non function `type` is passed as the `fn` argument, `invalid (string)` should be returned.
5. When a function is `promisified`, it can receive any number of arguments.

## Solution:

This updated implementation first checks if the `fn` argument is a function. If it's not, it returns the string `'invalid'`.

If `fn` is a function, it returns a new function that takes any number of arguments using the spread operator (`...args`). This new function returns a Promise that wraps the execution of `fn`.

If `hasCallback` is `true`, the new function executes `fn` with the given arguments and a callback function that resolves or rejects the Promise based on whether an error is passed as the first argument of the callback. If `hasCallback` is `false`, the new function executes `fn` with the given arguments and resolves the Promise with the result of `fn` or rejects the Promise if an error is thrown.

Note that the updated implementation assumes that `fn` follows the standard Node.js callback pattern with an error object as the first argument and a response object as the second argument. If `fn` uses a different callback pattern, the implementation may need to be adjusted accordingly.

```javascript
function promisify(fn, hasCallback = true) {
  if (typeof fn !== "function") {
    return "invalid";
  }

  return function (...args) {
    return new Promise((resolve, reject) => {
      if (hasCallback) {
        fn(...args, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      } else {
        try {
          const result = fn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }
    });
  };
}
```

## Examples:

```javascript
// Example function that takes a callback
function someFunction(arg1, arg2, callback) {
  // Do something with arg1 and arg2
  const result = arg1 + arg2;
  callback(null, result);
}

// Wrapping someFunction in a Promise using promisify
const wrappedFunction = promisify(someFunction);

// Invoking the wrapped function using Promise syntax
wrappedFunction(2, 3)
  .then((result) => {
    console.log(result); // Output: 5
  })
  .catch((error) => {
    console.error(error);
  });
```
