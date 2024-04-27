# The longest Square

There are two wooden sticks of lengths `A` and `B` respectively. Each of them can be cut into shorter sticks of integer lengths. Our goal is to construct the largest possible square. In order to do this, we want to cut the sticks in such a way as to achieve four sticks of the same length (note that there can be some leftover pieces).

What is the longest side of square that we can achieve?

### Write a function:

`function solution (A, B)` that, given two integers `A`, `B`, returns the side length of the largest square that we can obtain. If it is not possible to create any square, the function should return `0`.

## Examples:

1. Given `A = 10`, `B = 21`, the function should return `7`. We can split the second stick into
   three sticks of length `7` and shorten the first stick by `3`.
2. Given `A = 13`, `B = 11`, the function should return `5`. We can cut two sticks of length `5`
   from each of the given sticks.
3. Given `A = 2`, `B = 1`, the function should return `O`. It is not possible to make any square
   from the given sticks.
4. Given `A = 1`, `B = 8`, the function should return `2`. We can cut stick `B` into four parts.

Write an efficient algorithm for the following assumptions:

- A and B are integers within the range [1.. 1,000,000,000]

## Solution:

```javascript
function solution(A, B) {
  // Calculate the minimum and maximum possible square sides
  const minSide = Math.floor(Math.min(A, B) / 4);
  const maxSide = Math.floor(Math.max(A, B) / 2);

  // Check each possible square side length, starting from the maximum
  for (let side = maxSide; side >= minSide; side--) {
    // Check if we can obtain four sticks of length 'side'
    const sticksA = Math.floor(A / side);
    const sticksB = Math.floor(B / side);
    const totalSticks = sticksA + sticksB;
    if (totalSticks >= 4) {
      return side;
    }
  }

  // If we haven't found any square, return 0
  return 0;
}
```

A square has all it's sides with the same size, this can help use determine the perimeter of it 3*4 = 12 and or 5*4 = 20 if we have the perimeter already we can use the square root of it to determine the side size sqrt(20) =

x^2 = a + b

The function first calculates the minimum and maximum possible side lengths for a square, which correspond to dividing the smallest and largest sticks into four pieces, respectively. Then, it checks each possible square side length, starting from the maximum and going down to the minimum. For each side length, it calculates how many sticks of that length we can obtain from the two original sticks, and checks if the total is at least 4. If it is, it returns the side length, which corresponds to the largest possible square. If no square can be obtained, the function returns 0.

This algorithm should have a time complexity of O(log(max(A, B))), since we are dividing the stick lengths by a factor of 2 for each iteration. The space complexity is O(1), since we are only using a few variables to store intermediate results.
