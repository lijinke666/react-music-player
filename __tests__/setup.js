/* eslint-disable no-console */
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}
global.URL.createObjectURL = jest.fn()
if (typeof window !== 'undefined') {
  global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth
    global.window.innerHeight = height || global.window.innerHeight
    global.window.dispatchEvent(new Event('resize'))
  }
  global.window.scrollTo = () => {}
  global.alert = (msg) => {
    console.log(msg)
  }
  global.scrollTo = () => {}
  global.window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }
  })
  global.window.HTMLMediaElement.prototype.load = () => {}
  global.window.HTMLMediaElement.prototype.play = () => {}
  global.window.HTMLMediaElement.prototype.pause = () => {}
  global.window.URL.createObjectURL = jest.fn()
}

Enzyme.configure({ adapter: new Adapter() })
