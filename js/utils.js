let secondsPassed;
let oldTimeStamp = 0;
export function calculateFps(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Calculate fps
  return Math.round(1 / secondsPassed);
}
