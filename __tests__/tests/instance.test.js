import React from 'react'
import { mount } from 'enzyme'
import ReactJkMusicPlayer from '../../src'

const getApp = (props) => {
  let _instance
  const wrapper = mount(
    <ReactJkMusicPlayer
      audioLists={[{ musicSrc: 'a' }, { musicSrc: 'b' }]}
      autoPlay={false}
      getAudioInstance={(instance) => (_instance = instance)}
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
      'clear',
      'appendAudio'),
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

  it('should updatePlayIndex', () => {
    const onPlayIndexChange = jest.fn()
    const { instance, wrapper } = getApp({
      onPlayIndexChange,
    })
    instance.updatePlayIndex(1)
    expect(wrapper.state().musicSrc).toEqual('b')
    expect(onPlayIndexChange).toHaveBeenCalled()
  })

  it('should updatePlayIndex', () => {
    const onPlayIndexChange = jest.fn()
    const { instance, wrapper } = getApp({
      onPlayIndexChange,
    })
    instance.updatePlayIndex(1)
    expect(wrapper.state().musicSrc).toEqual('b')
    expect(onPlayIndexChange).toHaveBeenCalled()
  })

  it('should playByIndex', () => {
    const onPlayIndexChange = jest.fn()
    const { instance, wrapper } = getApp({
      onPlayIndexChange,
    })
    instance.playByIndex(1)
    expect(wrapper.state().musicSrc).toEqual('b')
    expect(onPlayIndexChange).toHaveBeenCalled()
  })

  it('should playNext', () => {
    const onPlayIndexChange = jest.fn()
    const onAudioPlayTrackChange = jest.fn()
    const { instance, wrapper } = getApp({
      onPlayIndexChange,
      onAudioPlayTrackChange,
    })
    instance.playNext()
    expect(wrapper.state().musicSrc).toEqual('b')
    expect(onPlayIndexChange).toHaveBeenCalled()
    expect(onAudioPlayTrackChange).toHaveBeenCalled()
  })

  it('should playPrev', () => {
    const onPlayIndexChange = jest.fn()
    const onAudioPlayTrackChange = jest.fn()
    const { instance, wrapper } = getApp({
      onPlayIndexChange,
      onAudioPlayTrackChange,
    })
    instance.updatePlayIndex(1)
    instance.playPrev()
    expect(wrapper.state().musicSrc).toEqual('a')
    expect(onPlayIndexChange).toHaveBeenCalled()
    expect(onAudioPlayTrackChange).toHaveBeenCalled()
  })

  it('should togglePlay', () => {
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
    wrapper.update()
    instance.togglePlay()
    expect(wrapper.state().playing).toEqual(true)
    expect(onAudioPlay).toHaveBeenCalled()

    instance.togglePlay()
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

  it('should appendAudio', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const onAudioListsChange = jest.fn()
    const { instance, wrapper } = getApp({
      onAudioListsChange,
    })
    instance.appendAudio()
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning! function appendAudio(){} must have formIndex!',
    )
    errorSpy.mockClear()
    instance.appendAudio(0, [
      {
        musicSrc: 'c',
      },
      {
        musicSrc: 'd',
      },
    ])
    expect(onAudioListsChange).toHaveBeenCalled()
    expect(wrapper.state().audioLists.map(({ musicSrc }) => musicSrc)).toEqual([
      'c',
      'd',
      'a',
      'b',
    ])
  })
})
