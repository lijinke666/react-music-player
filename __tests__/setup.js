/* eslint-disable no-console */
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const sortablejs = require('sortablejs')
const {
  AUDIO_READY_STATE,
  AUDIO_NETWORK_STATE,
} = require('../src/config/audioState')

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
  global.window.URL.revokeObjectURL = jest.fn()
  global.window.HTMLMediaElement.prototype.load = jest.fn()
  global.window.HTMLMediaElement.prototype.play = jest.fn()
  global.window.HTMLMediaElement.prototype.pause = jest.fn()
  Object.defineProperty(
    global.window.HTMLMediaElement.prototype,
    'readyState',
    {
      get() {
        return AUDIO_READY_STATE.HAVE_ENOUGH_DATA
      },
    },
  )
  Object.defineProperty(
    global.window.HTMLMediaElement.prototype,
    'networkState',
    {
      get() {
        return AUDIO_NETWORK_STATE.NETWORK_READY_SUCCESS_STATE
      },
    },
  )
  global.window.URL.createObjectURL = jest.fn()
}

Enzyme.configure({ adapter: new Adapter() })

jest.mock('sortablejs', () => {
  return jest.fn().mockImplementation(() => {
    return { destroy: jest.fn() }
  })
})

sortablejs.Swap = jest.fn()
sortablejs.mount = jest.fn()
