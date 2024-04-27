function solution(A, B) {
  // Calculate the minimum and maximum possible square sides
  const minSide = Math.floor(Math.min(A, B) / 4);
  const maxSide = Math.floor(Math.max(A, B) / 2);

  // Check each possible square side length, starting from the maximum
  for (let side = maxSide; side >= minSide; side--) {
    console.log({ side });
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

console.log(solution(7, 13));
