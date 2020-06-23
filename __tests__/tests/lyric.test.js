import React from 'react'
import { mount } from 'enzyme'
import ReactJkMusicPlayer from '../../src'
import lyric from '../../example/lyric'
import { sleep } from '../utils'

const createPlayer = (props) => (
  <ReactJkMusicPlayer
    showLyric
    audioLists={[
      {
        musicSrc: 'xx',
        name: 'audioName',
        lyric,
      },
      {
        musicSrc: 'xx2',
        name: 'audioName2',
      },
    ]}
    mode="full"
    {...props}
  />
)

describe('Lyric test', () => {
  it('should get initial lyric', () => {
    const wrapper = mount(createPlayer())
    expect(wrapper.state().lyric).toEqual(lyric)
  })
  it('should active lyric button when current clicked', () => {
    const wrapper = mount(createPlayer())
    expect(wrapper.find('.lyric-btn.lyric-btn-active')).toHaveLength(0)
    wrapper.find('.lyric-btn').simulate('click')
    expect(wrapper.find('.lyric-btn').hasClass('lyric-btn-active'))
  })
  it('should call onAudioLyricChange when audio playing', () => {
    const onAudioLyricChange = jest.fn()
    const wrapper = mount(createPlayer({ onAudioLyricChange }))
    wrapper.find('.play-btn').simulate('click')

    sleep(1000).then(() => {
      expect(onAudioLyricChange).toHaveBeenCalled()
    })
  })

  it('should call onAudioLyricChange when audio auto play', () => {
    const onAudioLyricChange = jest.fn()
    mount(createPlayer({ autoPlay: true, onAudioLyricChange }))
    sleep(1000).then(() => {
      expect(onAudioLyricChange).toHaveBeenCalled()
    })
  })
  it('should toggle call onAudioLyricChange when audio pause', () => {
    const onAudioLyricChange = jest.fn()
    const wrapper = mount(createPlayer({ onAudioLyricChange }))
    wrapper.find('.play-btn').simulate('click')

    sleep(1000).then(() => {
      expect(onAudioLyricChange).toHaveBeenCalledTimes(1)
    })

    wrapper.find('.play-btn').simulate('click')

    sleep(1000).then(() => {
      expect(onAudioLyricChange).toHaveBeenCalledTimes(1)
    })
  })

  it('should toggle call onAudioLyricChange when audio pause', () => {
    const onAudioLyricChange = jest.fn()
    const wrapper = mount(createPlayer({ onAudioLyricChange }))
    wrapper.setState({ audioListsPanelVisible: true })
    wrapper.find('.audio-item').first().simulate('click')

    sleep(1000).then(() => {
      expect(onAudioLyricChange).toHaveBeenCalledTimes(1)
    })

    wrapper.find('.audio-item').first().simulate('click')

    sleep(1000).then(() => {
      expect(onAudioLyricChange).toHaveBeenCalledTimes(1)
    })
  })

  it('should match current audio lyric', () => {
    const onAudioLyricChange = jest.fn()
    const wrapper = mount(createPlayer({ onAudioLyricChange }))
    wrapper.find('.next-audio').simulate('click')
    expect(wrapper.state().lyric).toEqual('')
  })

  it('should match current audio lyric by audio item panel', () => {
    const onAudioLyricChange = jest.fn()
    const wrapper = mount(createPlayer({ onAudioLyricChange }))
    wrapper.setState({ audioListsPanelVisible: true })
    wrapper.find('.audio-item').last().simulate('click')
    expect(wrapper.state().lyric).toEqual('')
  })

  it('should match current audio lyric', () => {
    const onAudioLyricChange = jest.fn()
    const wrapper = mount(createPlayer({ autoPlay: true, onAudioLyricChange }))
    sleep(1000).then(() => {
      expect(wrapper.state().currentLyric).toEqual('')
    })
  })
})
