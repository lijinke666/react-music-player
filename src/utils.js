//秒转换成 时间格式
export function formatTime(second) {
  let i = 0;
  let s = parseInt(second);
  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);
    if (i > 60) {
      i = parseInt(i % 60);
    }
  }
  // 补零
  const zero = v => (v >> 0 < 10 ? `0${v}` : v);
  return [zero(i), zero(s)].join(":");
}

export function createRandomNum(minNum, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

export function distinct(array) {
  return array
    .map(item => JSON.stringify(item))
    .filter((item, idx, arry) => idx === arry.indexOf(item))
    .map(item => JSON.parse(item));
}
