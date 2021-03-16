import { mount } from 'enzyme'
import React from 'react'
import ReactJkMusicPlayer from '../../src'
import { AnimatePlayIcon } from '../../src/components/Icon'
import { sleep } from '../utils'

const getApp = (props) => {
  let _instance
  const wrapper = mount(
    <ReactJkMusicPlayer
      audioLists={[{ musicSrc: 'a' }, { musicSrc: 'b' }]}
      autoPlay={false}
      getAudioInstance={(instance) => {
        _instance = instance
      }}
      {...props}
    />,
  )
  return {
    instance: _instance,
    wrapper,
  }
}

describe('AudioInstance test', () => {
  it('should call getAudioInstance function', () => {
    const getAudioInstance = jest.fn()
    mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x' }]}
        getAudioInstance={getAudioInstance}
      />,
    )
    expect(getAudioInstance).toHaveBeenCalled()
  })
  it('should get audio instance', () => {
    const { instance } = getApp()
    expect(instance).toMatchSnapshot()
    ;[
      ('destroy',
      'updatePlayIndex',
      'playByIndex',
      'playPrev',
      'playNext',
      'togglePlay',
      'clear'),
    ].forEach((key) => {
      expect(instance[key]).toBeInstanceOf(Function)
    })
  })

  it('should destroy', () => {
    const onDestroyed = jest.fn()
    const { instance, wrapper } = getApp({
      onDestroyed,
    })
    instance.destroy()
    wrapper.update()
    expect(wrapper.find('.react-jinke-music-player').exists()).toBeFalsy()
    expect(onDestroyed).toHaveBeenCalled()
  })

  it('should updatePlayIndex', async () => {
    const onPlayIndexChange = jest.fn()
    const { instance, wrapper } = getApp({
      onPlayIndexChange,
    })
    instance.updatePlayIndex(1)
    wrapper.instance().onAudioCanPlay()
    await sleep(300)
    expect(wrapper.state().musicSrc).toEqual('b')
    expect(onPlayIndexChange).toHaveBeenCalled()
  })

  it('should playByIndex', async () => {
    const onPlayIndexChange = jest.fn()
    const { instance, wrapper } = getApp({
      onPlayIndexChange,
    })
    instance.playByIndex(1)
    wrapper.instance().onAudioCanPlay()
    await sleep(300)
    expect(wrapper.state().musicSrc).toEqual('b')
    expect(onPlayIndexChange).toHaveBeenCalled()
  })

  it('should playNext', async () => {
    const onPlayIndexChange = jest.fn()
    const onAudioPlayTrackChange = jest.fn()
    const { instance, wrapper } = getApp({
      onPlayIndexChange,
      onAudioPlayTrackChange,
    })
    instance.playNext()
    wrapper.instance().onAudioCanPlay()
    await sleep(300)
    expect(wrapper.state().musicSrc).toEqual('b')
    expect(onPlayIndexChange).toHaveBeenCalled()
    expect(onAudioPlayTrackChange).toHaveBeenCalled()
  })

  it('should playPrev', async () => {
    const onPlayIndexChange = jest.fn()
    const onAudioPlayTrackChange = jest.fn()
    const { instance, wrapper } = getApp({
      onPlayIndexChange,
      onAudioPlayTrackChange,
    })
    instance.updatePlayIndex(1)
    await sleep(300)
    wrapper.update()
    instance.playPrev()
    wrapper.instance().onAudioCanPlay()
    await sleep(300)
    expect(wrapper.state().musicSrc).toEqual('a')
    expect(onPlayIndexChange).toHaveBeenCalled()
    expect(onAudioPlayTrackChange).toHaveBeenCalled()
  })

  it('should togglePlay', async () => {
    const onAudioPlay = jest.fn()
    const onAudioPause = jest.fn()
    window.HTMLMediaElement.prototype.play = () => {
      onAudioPlay()
    }
    window.HTMLMediaElement.prototype.pause = () => {
      onAudioPause()
    }
    const { instance, wrapper } = getApp()
    wrapper.setProps({ mode: 'full' })
    wrapper.setState({ canPlay: true })
    wrapper.update()
    instance.togglePlay()

    await sleep(200)
    expect(wrapper.state().playing).toEqual(true)
    expect(onAudioPlay).toHaveBeenCalled()

    instance.togglePlay()
    await sleep(200)
    expect(onAudioPause).toHaveBeenCalled()
  })

  it('should clear audio list', () => {
    const onAudioListsChange = jest.fn()
    const { instance, wrapper } = getApp({
      onAudioListsChange,
    })
    instance.clear()
    expect(onAudioListsChange).toHaveBeenCalled()
    expect(wrapper.state().audioLists).toEqual([])
    expect(wrapper.state().cover).toEqual('')
    expect(wrapper.state().musicSrc).toEqual('')
    expect(wrapper.state().name).toEqual('')
  })
})
