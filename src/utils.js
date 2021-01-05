/* eslint-disable no-param-reassign */
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

// https://stackoverflow.com/questions/7451508/html5-audio-playback-with-fade-in-and-fade-out
export function swing(p) {
  return 0.5 - Math.cos(p * Math.PI) / 2
}

export function adjustVolume(
  element,
  newVolume,
  { duration = 1000, easing = swing, interval = 13 } = {},
) {
  const originalVolume = element.volume
  const delta = newVolume - originalVolume
  if (!delta || !duration || !easing || !interval) {
    element.volume = newVolume
    return Promise.resolve()
  }
  const ticks = Math.floor(duration / interval)
  let tick = 1
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      element.volume = originalVolume + easing(tick / ticks) * delta
      if (++tick === ticks) {
        clearInterval(timer)
        resolve()
      }
    }, interval)
  })
}
