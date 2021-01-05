/* eslint-disable radix */
/* eslint-disable no-bitwise */
export function formatTime(second) {
  let i = 0
  let h = 0
  let s = parseInt(second)
  if (s >= 60) {
    i = parseInt(s / 60)
    s = parseInt(s % 60)
    if (i >= 60) {
      h = parseInt(i / 60)
      i = parseInt(i % 60)
    }
  }
  // 补零
  const zero = (v) => (v >> 0 < 10 ? `0${v}` : v)
  if (h > 0) return [zero(h), zero(i), zero(s)].join(':')
  return [zero(i), zero(s)].join(':')
}

export function createRandomNum(minNum, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
}

export function distinct(array) {
  return array
    .map((item) => JSON.stringify(item))
    .filter((item, idx, arr) => idx === arr.indexOf(item))
    .map((item) => JSON.parse(item))
}

export const arrayEqual = (arr1) => (arr2) =>
  JSON.stringify(arr1) === JSON.stringify(arr2)

const s4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
// Generate a pseudo-GUID by concatenating random hexadecimal.
export const uuId = () => {
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}

export const isSafari = () => {
  return (
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  )
}
