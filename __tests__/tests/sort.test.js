import React from 'react'
import { mount } from 'enzyme'
import ReactJkMusicPlayer from '../../src'

const createPlayer = (props) => {
  return mount(
    <ReactJkMusicPlayer
      audioLists={[
        { cover: 'xx', musicSrc: '1' },
        { cover: 'xx', musicSrc: '2' },
      ]}
      autoPlay={false}
      {...props}
    />,
  )
}

describe('Audio lists Sort test', () => {
  it('should not call onAudioListsSortEnd and onAudioListsChange if index not changed', () => {
    const onAudioListsSortEnd = jest.fn()
    const onAudioListsChange = jest.fn()
    const wrapper = createPlayer({ onAudioListsSortEnd, onAudioListsChange })
    wrapper.instance().onAudioListsSortEnd({ oldIndex: 0, newIndex: 0 })

    expect(onAudioListsSortEnd).not.toHaveBeenCalled()
    expect(onAudioListsChange).not.toHaveBeenCalled()
  })

  it('should sort audio list', () => {
    let list
    const onAudioListsSortEnd = jest.fn()
    const onAudioListsChange = jest.fn((_, result) => {
      list = result
    })
    const wrapper = createPlayer({ onAudioListsSortEnd, onAudioListsChange })
    wrapper.instance().onAudioListsSortEnd({ oldIndex: 0, newIndex: 1 })

    expect(onAudioListsSortEnd).toHaveBeenCalledWith(0, 1)
    expect(onAudioListsChange).toHaveBeenCalledTimes(1)
    expect(list[0].musicSrc).toEqual('2')
    expect(list[1].musicSrc).toEqual('1')
  })

  it('should deprecate onAudioListsDragEnd', () => {
    const warnSpy = jest.spyOn(console, 'warn')
    const onAudioListsDragEnd = jest.fn()
    const wrapper = createPlayer({ onAudioListsDragEnd })
    wrapper.instance().onAudioListsSortEnd({ oldIndex: 0, newIndex: 1 })

    expect(onAudioListsDragEnd).toHaveBeenCalledWith(0, 1)
    expect(warnSpy).toHaveBeenCalledWith(
      '[Deprecated] onAudioListsDragEnd is deprecated. please use onAudioListsSortEnd(oldIndex, newIndex){}',
    )
  })
})
