export const sleep = (duration) =>
  new Promise((res) => {
    setTimeout(() => {
      res()
    }, duration)
  })
