/*eslint-disable no-console */
import React from 'react'
import assert from 'power-assert'
import { shallow, mount } from 'enzyme'

import ReactJkMusicPlayer from '../../src'

import {
  AnimatePlayIcon,
  AnimatePauseIcon,
  MdVolumeDownIcon,
  MdVolumeMuteIcon,
} from '../../src/components/Icon'
import {
  createRandomNum,
  formatTime,
  arrayEqual,
  distinct,
} from '../../src/utils'
import PlayerMobile from '../../src/components/PlayerMobile'
import PlayModeTip from '../../src/components/PlayModeTip'
import AudioPlayerMobile from '../../src/components/PlayerMobile'
import AudioListsPanel from '../../src/components/AudioListsPanel'
import PlayModel from '../../src/components/PlayModel'
import CircleProcessBar from '../../src/components/CircleProcessBar'
import Load from '../../src/components/Load'
import { SPACE_BAR_KEYCODE } from '../../src/config/keycode'
import { sleep } from '../utils'
import { MEDIA_QUERY } from '../../src/config/mediaQuery'

describe('<ReactJkMusicPlayer/>', () => {
  it('should render a <ReactJkMusicPlayer/> components', () => {
    const wrapper = mount(<ReactJkMusicPlayer className="text-class-name" />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should render a <ReactJkMusicPlayer/> components', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        className="text-class-name"
        showMiniProcessBar={true}
      />,
    )
    assert(wrapper.find('.react-jinke-music-player-main').length === 1)
    assert(wrapper.find('.react-jinke-music-player').length >= 1)
    assert(wrapper.find('.text-class-name').length >= 1)
    assert(wrapper.find('.audio-circle-process-bar').length >= 1)
    wrapper.setProps({ showMiniProcessBar: false })
    assert(wrapper.find('.audio-circle-process-bar').length === 0)
    wrapper.setState({ pause: false, playing: true, toggle: true })
    assert(wrapper.find(AnimatePauseIcon).length >= 1)
    wrapper.setState({ pause: true, playing: false })
    assert(wrapper.find(AnimatePlayIcon).length >= 1)
    wrapper.setState({ loading: true })
    assert(wrapper.find(Load).length >= 1)
    assert(wrapper.find(PlayModel).length >= 1)
    wrapper.setState({ toggle: false })
    wrapper.setProps({ showMiniProcessBar: true })
    assert(wrapper.find(CircleProcessBar).length >= 1)
  })
  it('should render <AudioListsPanel/> components', () => {
    const wrapper = mount(<ReactJkMusicPlayer />)
    assert(wrapper.find(AudioListsPanel).length === 1)
    assert(wrapper.find('.audio-lists-panel').length === 1)
  })
  it('should find a <PlayerMobile/> components', () => {
    const wrapper = shallow(<PlayerMobile />)
    assert(wrapper.find('.react-jinke-music-player-mobile').length === 1)
    assert(wrapper.find(PlayModeTip).length === 1)
  })
  it('should render mini of full mode', () => {
    const wrapper = mount(<ReactJkMusicPlayer mode="full" />)
    assert(wrapper.props().mode === 'full')
    wrapper.setProps({ mode: 'mini' })
    assert(wrapper.props().mode === 'mini')
  })
  it('should render dark and light theme', () => {
    const wrapper = mount(<ReactJkMusicPlayer theme="dark" />)
    assert(wrapper.props().theme === 'dark')
    wrapper.setState({ theme: 'dark' })
    assert(wrapper.find('.light-theme').length === 0)
    assert(wrapper.find('.dark-theme').length === 1)
    wrapper.setProps({ theme: 'light' })
    wrapper.setState({ theme: 'light' })
    assert(wrapper.props().theme === 'light')
    assert(wrapper.find('.dark-theme').length === 0)
    assert(wrapper.find('.light-theme').length === 1)
  })
  it('should find audioLists and return Array, playlists show "no music" text ', () => {
    const testProps = {
      audioLists: [
        {
          name: 'name',
          singer: 'singer',
          cover: 'test.jpg',
          musicSrc: 'test.mp3',
        },
      ],
    }
    const wrapper = mount(<ReactJkMusicPlayer {...testProps} />)
    assert(wrapper.props().audioLists.length >= 1)
    assert(wrapper.props().audioLists[0].name === 'name')
    assert(wrapper.props().audioLists[0].singer === 'singer')
    assert(wrapper.props().audioLists[0].cover === 'test.jpg')
    assert(wrapper.props().audioLists[0].musicSrc === 'test.mp3')
    wrapper.setProps({ audioLists: [] })
    setTimeout(() => {
      assert(wrapper.props().audioLists.length === 0)
      expect(wrapper.text()).toContain('no music')
    })
  })
  it('should toggle group setting buttons', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        showDownload={true}
        showThemeSwitch={true}
        showReload={true}
        showPlayMode={true}
      />,
    )
    wrapper.setState({ loading: false, toggle: true })
    assert(wrapper.find('.audio-download').length >= 1)
    assert(wrapper.find('.group').length >= 1)
    assert(wrapper.find('.theme-switch').length >= 1)
    assert(wrapper.find('.reload-btn').length >= 1)
    assert(wrapper.find('.loop-btn').length === 1)
    wrapper.setState({ toggle: false })
    assert(wrapper.find('.audio-download').length === 0)
    assert(wrapper.find('.theme-switch').length === 0)
    assert(wrapper.find('.reload-btn').length === 0)
    assert(wrapper.find('.loop-btn').length === 0)
  })
  it('should render seeked', () => {
    const wrapper = mount(<ReactJkMusicPlayer seeked={true} />)
    assert(wrapper.props().seeked === true)
    wrapper.setProps({ seeked: false })
    assert(wrapper.props().seeked === false)
  })
  it('should render extendsContent', () => {
    const extendsContent = (
      <>
        <span className="extendsContent">extendsText1</span>,
        <span>extendsText2</span>
      </>
    )

    const wrapper = mount(
      <ReactJkMusicPlayer extendsContent={extendsContent} />,
    )
    wrapper.setState({ toggle: true })
    expect(wrapper.text()).toContain('extendsText1')
    expect(wrapper.text()).toContain('extendsText2')
    assert(wrapper.find('.extendsContent').length === 1)
  })
  it('should render extendsContent with react fragment', () => {
    const ExtendsContent = () => (
      <>
        <button>1</button>
      </>
    )
    const wrapper = mount(
      <ReactJkMusicPlayer extendsContent={<ExtendsContent />} />,
    )
    const wrapper1 = mount(<ReactJkMusicPlayer extendsContent={'extends'} />)
    wrapper.setState({ toggle: true })
    wrapper1.setState({ toggle: true })
    assert(wrapper.find(ExtendsContent).length === 1)
    expect(wrapper1.text()).toContain('extends')
  })
  it('should render range random', () => {
    const repeat = 10
    const result = new Array(repeat).fill().map((_, i) => {
      return createRandomNum(0, i + 1) <= i + 1
    })
    expect(result.filter((v) => v)).toHaveLength(repeat)
  })
  it('should set defaultVolume', () => {
    const volumes = [100, 20]
    const wrapper = mount(<ReactJkMusicPlayer defaultVolume={volumes[0]} />)
    assert(wrapper.props().defaultVolume === volumes[0])
    wrapper.setProps({ defaultVolume: volumes[1] })
    assert(wrapper.props().defaultVolume === volumes[1])
  })
  it('should autoPlay', () => {
    const wrapper = mount(<ReactJkMusicPlayer autoPlay={false} />)
    assert(wrapper.state().playing === false)
    assert(wrapper.state().pause === true)
    wrapper.setProps({ autoPlay: true })
    assert(wrapper.props().autoPlay === true)
  })
  it('should render glass background', () => {
    const wrapper = mount(<ReactJkMusicPlayer glassBg={true} />)
    assert(wrapper.props().glassBg === true)
    assert(wrapper.find('.glass-bg').length >= 1)
  })
  it('should render delete btns', () => {
    const wrapper = mount(<ReactJkMusicPlayer audioLists={[]} remove={true} />)
    assert(wrapper.find('.audio-lists-panel-header-delete-btn').length >= 1)
    assert(wrapper.find('.player-delete').length === 0)
    wrapper.setState({
      audioLists: [
        {
          name: 'name',
          singer: 'singer',
          cover: 'test.jpg',
          musicSrc: 'test.mp3',
        },
      ],
    })
    assert(wrapper.find('.player-delete').length === 1)
  })
  it('should render progress load bar', () => {
    const wrapper = mount(<ReactJkMusicPlayer showProgressLoadBar={true} />)
    wrapper.setState({ toggle: true })
    assert(wrapper.props().showProgressLoadBar === true)
    assert(wrapper.find('.progress-load-bar').length === 1)
    wrapper.setProps({ showProgressLoadBar: false })
    assert(wrapper.props().showProgressLoadBar === false)
    assert(wrapper.find('.progress-load-bar').length === 0)
  })
  it('should print second return format time', () => {
    assert(formatTime(30000) === '08:20:00')
    assert(formatTime(60) === '00:60')
    assert(formatTime(140) === '02:20')
    assert(formatTime(2 * 60 * 60) === '02:00:00')
    assert(formatTime(2 * 60 * 60 + 30) === '02:00:30')
  })
  it('should return array is equal', () => {
    assert(arrayEqual([1])([1]) === true)
    assert(arrayEqual([1])([2]) === false)
    assert(arrayEqual([{ musicSrc: '' }])([{ musicSrc: 'xx' }]) === false)
    assert(arrayEqual([{ musicSrc: 'aa' }])([{ musicSrc: 'aa' }]) === true)
  })
  it('should distinct arrar', () => {
    assert(arrayEqual(distinct([1, 1, 1]))([1]) === true)
    assert(arrayEqual(distinct([{ a: 1 }, { a: 1 }]))([{ a: 1 }]) === true)
  })
  it('should render operation group', () => {
    const prefix = '.react-jinke-music-player-mobile'
    const wrapper = mount(<ReactJkMusicPlayer />)
    wrapper.setState({ toggle: true })
    assert(wrapper.find(PlayerMobile).length === 0)
    wrapper.setState({ isMobile: true })
    assert(wrapper.find(PlayerMobile).length === 1)
    assert(wrapper.find(`${prefix}-header`).length === 1)
    assert(wrapper.find(`${prefix}-singer`).length === 1)
    assert(wrapper.find(`${prefix}-switch`).length === 1)
    assert(wrapper.find(`${prefix}-cover`).length === 1)
    assert(wrapper.find(`${prefix}-progress`).length === 1)
    assert(wrapper.find(`${prefix}-toggle`).length === 1)
    assert(wrapper.find(`${prefix}-operation`).length === 1)
    assert(wrapper.find('.img-rotate-pause').length === 1)
  })
  it('should render extendsContent with mobile', () => {
    const Content = () => <div>extends</div>
    const wrapper = mount(<ReactJkMusicPlayer extendsContent={<Content />} />)
    wrapper.setState({ toggle: true, isMobile: true })
    expect(wrapper.find(Content)).toHaveLength(1)
  })
  it('should render music player in custom root node', () => {
    const div = document.createElement('div')
    div.className = 'test'
    const wrapper = mount(<ReactJkMusicPlayer getContainer={() => div} />)
    expect(wrapper.find('.test')).toHaveLength(0)
  })

  it('should render music player in custom root node', () => {
    const wrapper = mount(
      <div>
        <div className="test">
          <ReactJkMusicPlayer
            getContainer={() => document.querySelector('.test')}
          />
        </div>
        <span className="test1"></span>
      </div>,
    )
    expect(wrapper.find('.test1').find(ReactJkMusicPlayer)).toHaveLength(0)
    expect(wrapper.find('.test').find(ReactJkMusicPlayer)).toHaveLength(1)
  })

  it('should cannot render player in invalid custom root node', () => {
    const div = 1
    try {
      mount(<ReactJkMusicPlayer getContainer={() => div} />)
    } catch (error) {
      expect(error.message).toContain('Target container is not a DOM element')
    }
  })
  it('update state theme when option theme change', () => {
    const wrapper = mount(<ReactJkMusicPlayer theme="light" />)
    wrapper.setProps({ theme: 'dark' })
    expect(wrapper.state().theme).toEqual('dark')
    wrapper.setProps({ theme: 'xxxx' })
    expect(wrapper.state().theme).toEqual('dark')
  })

  it('trigger theme change handler when option theme change', () => {
    const onThemeChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer theme="light" onThemeChange={onThemeChange} />,
    )
    wrapper.setProps({ theme: 'dark' })
    expect(onThemeChange).not.toHaveBeenCalled()
  })

  it('update mode', () => {
    const onModeChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer mode="mini" onModeChange={onModeChange} />,
    )
    wrapper.setProps({ mode: 'full' })
    expect(onModeChange).not.toHaveBeenCalled()
    expect(wrapper.state().toggle).toEqual(true)
    wrapper.setProps({ mode: 'xxxx' })
    expect(wrapper.state().toggle).toEqual(true)
    wrapper.setProps({ mode: 'mini' })
    expect(wrapper.state().toggle).toEqual(false)
  })

  it('mode change handler when update mode', () => {
    const onModeChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer mode="mini" onModeChange={onModeChange} />,
    )
    wrapper.setProps({ mode: 'full' })
    expect(onModeChange).not.toHaveBeenCalled()
  })
  it('should cannot find lyric operation button', () => {
    const wrapper = mount(<ReactJkMusicPlayer audioLists={[]} mode="full" />)
    wrapper.setState({ isMobile: true })
    expect(
      wrapper.find('.react-jinke-music-player-mobile-operation .item'),
    ).toHaveLength(4)
  })

  it('should find five operation button when toggle lyric option', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer audioLists={[]} mode="full" showLyric={false} />,
    )
    wrapper.setState({ isMobile: true })
    expect(
      wrapper.find('.react-jinke-music-player-mobile-operation .item'),
    ).toHaveLength(4)
    wrapper.setProps({ showLyric: true })
    expect(
      wrapper.find('.react-jinke-music-player-mobile-operation .item'),
    ).toHaveLength(5)
  })
  it('should only render audio list menu button when ', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[]}
        mode="full"
        showLyric={false}
        showDownload={false}
        showPlayMode={false}
        showReload={false}
      />,
    )
    wrapper.setState({ isMobile: true })
    expect(
      wrapper.find('.react-jinke-music-player-mobile-operation .item'),
    ).toHaveLength(1)
  })
  it('should cannot trigger onAudioError when clear audioLists', () => {
    const onAudioError = jest.fn()
    const testProps = {
      audioLists: [
        {
          name: 'name',
          singer: 'singer',
          cover: 'test.jpg',
          musicSrc: 'test.mp3',
        },
      ],
      onAudioError,
    }
    const wrapper = mount(<ReactJkMusicPlayer {...testProps} mode="full" />)
    wrapper.setState({ audioListsPanelVisible: true })
    wrapper.find('.audio-lists-panel-header-delete-btn').simulate('click')
    expect(onAudioError).not.toHaveBeenCalled()
  })
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
    let _instance
    mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x' }]}
        getAudioInstance={(instance) => (_instance = instance)}
      />,
    )
    expect(typeof _instance).toEqual('object')
    expect(typeof _instance.destroy).toBe('function')
  })
  it('should auto hide the cover photo if no cover photo is available for pc', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', cover: '' }]}
        mode="full"
        autoHiddenCover
      />,
    )
    expect(wrapper.find('.img-content')).toHaveLength(0)
    wrapper.setProps({
      audioLists: [
        { musicSrc: '2', cover: 'xxxx' },
        { musicSrc: '22', cover: 'xxxxx' },
      ],
    })
    setTimeout(() => {
      expect(wrapper.find('.img-content')).toHaveLength(1)
    })
  })
  it('should auto hide the cover photo if no cover photo is available for mobile', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', cover: '' }]}
        mode="full"
        autoHiddenCover
      />,
    )
    wrapper.setState({ isMobile: true })
    expect(wrapper.find('.cover')).toHaveLength(0)
    wrapper.setProps({
      audioLists: [
        { musicSrc: '2', cover: 'xxxx' },
        { musicSrc: '22', cover: 'xxxxx' },
      ],
    })
    setTimeout(() => {
      expect(wrapper.find('.cover')).toHaveLength(1)
    })
  })
  it('should transform download audio info before', () => {
    const onBeforeAudioDownload = jest.fn(() => {
      return Promise.resolve({
        src: '123.mpg',
        filename: 'test',
      })
    })
    const onAudioDownload = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', cover: '' }]}
        mode="full"
        onBeforeAudioDownload={onBeforeAudioDownload}
        onAudioDownload={onAudioDownload}
      />,
    )
    wrapper.find('.audio-download').simulate('click')
    expect(onBeforeAudioDownload).toHaveBeenCalled()
    expect(onAudioDownload).toHaveBeenCalled()
  })

  it('should call customer downloader', () => {
    const onBeforeAudioDownload = jest.fn(() => {
      return Promise.resolve({
        src: '123.mp3',
        filename: 'test',
      })
    })
    let testSrc = ''
    const customDownloader = jest.fn((info) => {
      testSrc = info.src
    })
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', cover: '' }]}
        mode="full"
        onBeforeAudioDownload={onBeforeAudioDownload}
        customDownloader={customDownloader}
      />,
    )
    wrapper.find('.audio-download').simulate('click')
    setTimeout(() => {
      expect(testSrc).toEqual('123.mp3')
    }, 0)
  })
  it('should trigger onAudioPlay hook when audio track list change', () => {
    const onAudioPlay = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[
          { musicSrc: 'x', cover: '' },
          { musicSrc: 'xx', cover: '' },
        ]}
        mode="full"
        onAudioPlay={onAudioPlay}
      />,
    )
    wrapper.find('.next-audio').simulate('click')
    expect(onAudioPlay).toHaveBeenCalled()
  })

  it('should export custom fields in audioLists with audio info', () => {
    let _audioInfo
    const onAudioPlay = jest.fn((audioInfo) => {
      _audioInfo = audioInfo
    })
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[
          { musicSrc: 'x', name: '1', cover: '11', id: '1', customField: '1' },
          { musicSrc: 'x', name: '2', cover: '22', id: '2', customField: '2' },
        ]}
        mode="full"
        onAudioPlay={onAudioPlay}
      />,
    )
    wrapper.find('.next-audio').simulate('click')
    expect(_audioInfo.id).toEqual('1')
    expect(_audioInfo.customField).toEqual('1')
  })
  it('should trigger onAudioListsChange when audioList Change', () => {
    const onThemeChange = jest.fn()
    const onModeChange = jest.fn()
    const onAudioListsChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[
          { musicSrc: 'x', name: '1', cover: '11', id: '1', customField: '1' },
          { musicSrc: 'x', name: '2', cover: '22', id: '2', customField: '2' },
        ]}
        mode="full"
        onAudioListsChange={onAudioListsChange}
        onModeChange={onModeChange}
        onThemeChange={onThemeChange}
      />,
    )
    wrapper.setProps({ audioLists: [] })
    expect(onAudioListsChange).toHaveBeenCalled()
    expect(onModeChange).not.toHaveBeenCalled()
    expect(onThemeChange).not.toHaveBeenCalled()
  })
  it('should not trigger onAudioListsChange when audioList is equal', () => {
    const onAudioListsChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
        onAudioListsChange={onAudioListsChange}
      />,
    )
    wrapper.setProps({ audioLists: [{ musicSrc: 'x', name: '1' }] })
    expect(onAudioListsChange).not.toHaveBeenCalled()
    wrapper.setProps({ audioLists: [{ musicSrc: 'x', name: '2' }] })
    expect(onAudioListsChange).toHaveBeenCalled()
  })
  it('should update audioLists', () => {
    const onAudioListsChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
        onAudioListsChange={onAudioListsChange}
      />,
    )
    wrapper.setProps({
      audioLists: [
        { musicSrc: 'xx', name: '11' },
        { musicSrc: 'xxx', name: '111' },
      ],
    })

    expect(wrapper.state().audioLists.map(({ id, ...attr }) => attr)).toEqual([
      { musicSrc: 'x', name: '1' },
      { musicSrc: 'xx', name: '11' },
      { musicSrc: 'xxx', name: '111' },
    ])
  })
  it('should replace audioLists with clearPriorAudioLists option', () => {
    const onAudioListsChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
        onAudioListsChange={onAudioListsChange}
      />,
    )
    wrapper.setProps({
      clearPriorAudioLists: true,
      audioLists: [
        { musicSrc: 'xx', name: '11' },
        { musicSrc: 'xxx', name: '111' },
      ],
    })

    expect(wrapper.state().audioLists.map(({ id, ...attr }) => attr)).toEqual([
      { musicSrc: 'xx', name: '11' },
      { musicSrc: 'xxx', name: '111' },
    ])

    expect(onAudioListsChange).toHaveBeenCalled()
  })

  it('should not set playing state when audioLists is change and autoPlayInitLoadPlayList is false', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
        autoPlayInitLoadPlayList={false}
      />,
    )
    wrapper.setProps({
      audioLists: [
        { musicSrc: 'xx', name: '11' },
        { musicSrc: 'xxx', name: '111' },
      ],
    })

    expect(wrapper.state().playing).toEqual(false)
  })

  it('should trigger onAudioListsChange when clear all audio list', () => {
    const onAudioListsChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
        onAudioListsChange={onAudioListsChange}
      />,
    )
    wrapper.find('.audio-lists-panel-header-delete-btn').simulate('click')
    expect(onAudioListsChange).toHaveBeenCalled()
  })

  it('should trigger onAudioListsChange when audio list update', () => {
    const onAudioListsChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[
          { musicSrc: 'x', name: '1' },
          { musicSrc: 'xx', name: '2' },
        ]}
        mode="full"
        onAudioListsChange={onAudioListsChange}
      />,
    )
    wrapper.setProps({
      audioLists: [],
    })
    expect(onAudioListsChange).toHaveBeenCalled()
  })

  it('should pause audio when Space bar has be triggered', () => {
    const onAudioPause = jest.fn()
    const onAudioPlay = jest.fn()
    window.HTMLMediaElement.prototype.load = () => {}
    window.HTMLMediaElement.prototype.play = () => {
      onAudioPlay()
    }
    window.HTMLMediaElement.prototype.pause = () => {
      onAudioPause()
    }
    const triggerKeyDown = () => {
      const player = document.querySelector('.react-jinke-music-player-main')
      player.focus()
      player.dispatchEvent(
        new KeyboardEvent('keydown', { keyCode: SPACE_BAR_KEYCODE }),
      )
    }
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
        autoPlay={false}
        spaceBar
        onAudioPause={onAudioPause}
        onAudioPlay={onAudioPlay}
      />,
    )
    triggerKeyDown()
    sleep(1000).then(() => {
      expect(wrapper.state().isAutoPlayWhenUserClicked).toBe(true)
      expect(onAudioPause).not.toHaveBeenCalled()
      expect(onAudioPlay).toHaveBeenCalledTimes(1)
    })
    triggerKeyDown()
    sleep(1000).then(() => {
      expect(onAudioPause).toHaveBeenCalledTimes(1)
    })
    wrapper.setProps({ mode: 'mini' })
    triggerKeyDown()
    sleep(1000).then(() => {
      expect(onAudioPlay).toHaveBeenCalledTimes(2)
    })
    triggerKeyDown()
    sleep(1000).then(() => {
      expect(onAudioPause).toHaveBeenCalledTimes(2)
    })
  })

  it('should find destroy button', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
      />,
    )
    expect(wrapper.find('.destroy-btn')).toHaveLength(0)
    wrapper.setProps({ showDestroy: true })
    expect(wrapper.find('.destroy-btn')).toHaveLength(1)
    wrapper.setProps({ mode: 'mini' })
    expect(wrapper.find('.destroy-btn')).toHaveLength(1)
  })

  it('should trigger onDestroyed when destroy button clicked', () => {
    const onDestroyed = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
        showDestroy
        onDestroyed={onDestroyed}
      />,
    )
    wrapper.find('.destroy-btn').simulate('click')
    expect(onDestroyed).toHaveBeenCalled()
  })

  it('should trigger onBeforeDestroy when destroy button clicked', () => {
    const onBeforeDestroy = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
        showDestroy
        onBeforeDestroy={onBeforeDestroy}
      />,
    )
    wrapper.find('.destroy-btn').simulate('click')
    expect(onBeforeDestroy).toHaveBeenCalled()
  })

  it('should trigger onBeforeDestroy when destroy button clicked', () => {
    const onBeforeDestroyRes = jest.fn(() => Promise.resolve())
    const onBeforeDestroyRej = jest.fn(() => Promise.reject())
    const onDestroyed = jest.fn()
    const wrapperRes = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
        showDestroy
        onBeforeDestroy={onBeforeDestroyRes}
        onDestroyed={onDestroyed}
      />,
    )
    wrapperRes.find('.destroy-btn').simulate('click')
    // Promise 微任务 , setTimeout 宏任务
    setTimeout(() => {
      expect(onDestroyed).toHaveBeenCalled()
    }, 0)

    const wrapperRej = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
        showDestroy
        onBeforeDestroy={onBeforeDestroyRej}
        onDestroyed={onDestroyed}
      />,
    )
    wrapperRej.find('.destroy-btn').simulate('click')
    expect(onDestroyed).not.toHaveBeenCalled()
  })

  it('should trigger onDestroyed when component unmount', () => {
    const onDestroyed = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
        showDestroy
        onDestroyed={onDestroyed}
      />,
    )
    wrapper.unmount()
    expect(onDestroyed).toHaveBeenCalled()
  })

  // https://github.com/lijinke666/react-music-player/issues/78#issuecomment-574089990
  it('should play audio when click play button and not auto play', () => {
    const onAudioPlay = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        autoPlay={false}
        mode="full"
        onAudioPlay={onAudioPlay}
      />,
    )
    wrapper.find('.play-btn').simulate('click')
    expect(wrapper.state().playing).toEqual(true)
    expect(wrapper.state().pause).toEqual(false)
  })

  it('should toggle audio volume', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
        defaultVolume={1}
      />,
    )
    wrapper.find('.sounds-icon').simulate('click')
    expect(wrapper.state().soundValue).toEqual(0)
    wrapper.find('.sounds-icon').simulate('click')
    expect(wrapper.state().soundValue).toEqual(1)
  })

  // https://github.com/lijinke666/react-music-player/issues/91
  it('should not call ref.contains when showDestroy is false', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        showDestroy
        mode="mini"
      />,
    )
    wrapper.setProps({ showDestroy: false })
    wrapper.find('.music-player-controller').simulate('click')
    setTimeout(() => {
      expect(wrapper.state().toggle).toEqual(true)
    })
  })

  it('should async get music src', () => {
    const getMusicSrc = new Promise((res) => {
      setTimeout(() => {
        res('xxx.mp3')
      }, 2000)
    })
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: getMusicSrc, name: '1' }]}
        mode="full"
      />,
    )
    setTimeout(() => {
      expect(wrapper.state().musicSrc).toEqual('xxx.mp3')
    }, 2000)
  })
  it('should call onAudioError when async load music src failed', () => {
    const onAudioError = jest.fn()
    const getMusicSrc = new Promise((res, rej) => {
      setTimeout(() => {
        rej()
      }, 2000)
    })
    mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: getMusicSrc, name: '1' }]}
        mode="full"
        onAudioError={onAudioError}
      />,
    )

    setTimeout(() => {
      expect(onAudioError).toHaveBeenCalled()
    }, 2000)
  })

  // https://github.com/lijinke666/react-music-player/issues/101
  it('should render light theme when audio lists is empty', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer audioLists={[]} mode="full" theme="light" />,
    )
    expect(
      wrapper.find('.react-jinke-music-player-main.light-theme'),
    ).toHaveLength(1)
    wrapper.setProps({ mode: 'mini' })
    expect(
      wrapper.find('.react-jinke-music-player-main.light-theme'),
    ).toHaveLength(1)
  })

  it('should toggle audio volume when audio lists is empty', () => {
    const onAudioVolumeChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[]}
        mode="full"
        onAudioVolumeChange={onAudioVolumeChange}
      />,
    )
    expect(wrapper.find(MdVolumeDownIcon)).toHaveLength(1)
    expect(wrapper.find(MdVolumeMuteIcon)).toHaveLength(0)
    wrapper.find('.sounds-icon').simulate('click')
    expect(wrapper.find(MdVolumeDownIcon)).toHaveLength(0)
    expect(wrapper.find(MdVolumeMuteIcon)).toHaveLength(1)
    expect(onAudioVolumeChange).not.toHaveBeenCalled()
  })

  it('should call onAudioVolumeChange', () => {
    const onAudioVolumeChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        mode="full"
        onAudioVolumeChange={onAudioVolumeChange}
      />,
    )
    wrapper.find('.sounds-icon').simulate('click')
    expect(onAudioVolumeChange).toHaveBeenCalled()
    wrapper.find('.sounds-icon').simulate('click')
    expect(onAudioVolumeChange).toHaveBeenCalled()
    wrapper.find('.sound-operation .rc-slider-step').simulate('click')
    expect(onAudioVolumeChange).toHaveBeenCalled()
  })

  // https://github.com/lijinke666/react-music-player/issues/100
  it('should toggle mobile and desktop panel when enable responsive option', () => {
    const onAudioVolumeChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="full"
        responsive
        onAudioVolumeChange={onAudioVolumeChange}
      />,
    )
    expect(wrapper.find(AudioPlayerMobile)).toHaveLength(0)
    expect(wrapper.find('.music-player-panel')).toHaveLength(1)
    wrapper.setState({ isMobile: true }, () => {
      expect(wrapper.find(AudioPlayerMobile)).toHaveLength(1)
      expect(wrapper.find('.music-player-panel')).toHaveLength(0)
    })
  })

  it('should toggle mobile and desktop panel when disable responsive option', () => {
    const onAudioVolumeChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="full"
        responsive={false}
        onAudioVolumeChange={onAudioVolumeChange}
      />,
    )
    expect(wrapper.find(AudioPlayerMobile)).toHaveLength(0)
    expect(wrapper.find('.music-player-panel')).toHaveLength(1)
    wrapper.setState({ isMobile: true }, () => {
      expect(wrapper.find(AudioPlayerMobile)).toHaveLength(0)
      expect(wrapper.find('.music-player-panel')).toHaveLength(1)
    })
  })

  // https://github.com/lijinke666/react-music-player/issues/90
  it('should support custom audio duration', () => {
    const customAudioDuration = 70.01
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="full"
        audioLists={[
          {
            duration: customAudioDuration,
          },
        ]}
      />,
    )
    expect(wrapper.find('.duration').text()).toContain('01:10')
    expect(wrapper.instance().getBaseAudioInfo().duration).toStrictEqual(
      customAudioDuration,
    )
  })

  it('should format custom audio duration', () => {
    const customAudioDuration = 104.0
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="full"
        audioLists={[
          {
            duration: customAudioDuration,
          },
        ]}
      />,
    )
    expect(wrapper.find('.duration').text()).toEqual('01:44')

    wrapper.setState(
      {
        audioLists: [{ duration: -10 }],
      },
      () => {
        expect(wrapper.find('.duration').text()).toEqual('00:00')
      },
    )
  })

  it('should close audio panel when change to mini mode', () => {
    const onAudioListsPanelChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="full"
        audioLists={[{ musicSrc: 'x', name: '1' }]}
        onAudioListsPanelChange={onAudioListsPanelChange}
      />,
    )
    wrapper.find('.audio-lists-btn').simulate('click')
    expect(wrapper.state().audioListsPanelVisible).toEqual(true)
    wrapper.setProps({ mode: 'mini' })
    expect(wrapper.state().audioListsPanelVisible).toEqual(false)
    expect(onAudioListsPanelChange).toHaveBeenCalledTimes(2)
  })

  it('should not call onAudioReload when reload button clicked and audio list is empty', () => {
    const onAudioReload = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="full"
        audioLists={[]}
        onAudioReload={onAudioReload}
      />,
    )
    wrapper.find('.reload-btn').simulate('click')
    expect(onAudioReload).not.toHaveBeenCalled()
  })

  // https://github.com/lijinke666/react-music-player/issues/115
  it('should throw error when audioList is not array', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mount(<ReactJkMusicPlayer mode="full" audioLists={''} />)

    expect(errSpy).toHaveBeenCalled()
    errSpy.mockRestore()
  })

  // https://github.com/lijinke666/react-music-player/issues/115
  it('should unmount player success', () => {
    let success = false
    const wrapper = mount(<ReactJkMusicPlayer audioLists={[]} />)
    wrapper.unmount()
    success = true
    expect(success).toEqual(true)
  })

  it('should only update defaultPlayMode once', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer defaultPlayMode="order" audioLists={[]} />,
    )
    expect(wrapper.state().playMode).toEqual('order')
    wrapper.setProps({ defaultPlayMode: 'orderLoop' })
    expect(wrapper.state().playMode).toEqual('order')
  })

  it('should use playMode options if all with playMode and defaultPlayMode ', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        playMode="orderLoop"
        defaultPlayMode="order"
        audioLists={[]}
      />,
    )
    expect(wrapper.state().playMode).toEqual('orderLoop')
  })

  // https://github.com/lijinke666/react-music-player/issues/117
  it('should update play mode', () => {
    const onPlayModeChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        playMode="order"
        audioLists={[]}
        onPlayModeChange={onPlayModeChange}
      />,
    )
    expect(wrapper.state().playMode).toEqual('order')
    wrapper.setProps({ playMode: 'orderLoop' })
    expect(onPlayModeChange).not.toHaveBeenCalled()
    expect(wrapper.state().playMode).toEqual('orderLoop')
    wrapper.setProps({ playMode: 'xxxxx' })
    expect(wrapper.state().playMode).toEqual('orderLoop')
    expect(onPlayModeChange).not.toHaveBeenCalled()
  })

  it('should call onCoverClick', () => {
    const onCoverClick = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="full"
        audioLists={[
          {
            cover: 'http://test.jpg',
            musicSrc: 'test.mp3',
            singer: 'xx',
          },
        ]}
        onCoverClick={onCoverClick}
      />,
    )
    wrapper.find('.img-content').simulate('click')
    expect(onCoverClick).toHaveBeenCalledTimes(1)
    wrapper.setState({ isMobile: true })
    wrapper.find('.react-jinke-music-player-mobile-cover').simulate('click')
    expect(onCoverClick).toHaveBeenCalledTimes(2)
  })

  it('should trigger onPlayIndexChange hook when audio track list change', () => {
    const onPlayIndexChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[
          { musicSrc: 'x', cover: '' },
          { musicSrc: 'xx', cover: '' },
        ]}
        mode="full"
        onPlayIndexChange={onPlayIndexChange}
      />,
    )
    wrapper.find('.next-audio').simulate('click')
    expect(onPlayIndexChange).toHaveBeenCalledTimes(1)
  })

  it('should trigger onAudioPlayTrackChange hook when audio track list change', () => {
    const onAudioPlayTrackChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        audioLists={[
          { musicSrc: 'x', cover: '' },
          { musicSrc: 'xx', cover: '' },
        ]}
        mode="full"
        onAudioPlayTrackChange={onAudioPlayTrackChange}
      />,
    )
    wrapper.find('.next-audio').simulate('click')
    expect(onAudioPlayTrackChange).toHaveBeenCalledTimes(1)
  })
  it('should trigger onPlayIndexChange hook when playIndex props update', () => {
    const onPlayIndexChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        playIndex={0}
        audioLists={[
          { musicSrc: 'x', cover: '' },
          { musicSrc: 'xx', cover: '' },
        ]}
        onPlayIndexChange={onPlayIndexChange}
      />,
    )
    expect(onPlayIndexChange).not.toHaveBeenCalled()
    wrapper.setProps({ playIndex: 1 })
    wrapper.update()
    expect(onPlayIndexChange).toHaveBeenCalledTimes(1)
  })
  it('should get first audio info by default play index', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        defaultPlayIndex={0}
        audioLists={[
          { musicSrc: 'a', cover: 'a', name: 'a' },
          { musicSrc: 'b', cover: 'b', name: 'b' },
        ]}
      />,
    )
    expect(wrapper.state().musicSrc).toEqual('a')
    expect(wrapper.state().cover).toEqual('a')
    expect(wrapper.state().name).toEqual('a')
  })

  it('should get secondary audio info by default play index', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        defaultPlayIndex={1}
        audioLists={[
          { musicSrc: 'a', cover: 'a', name: 'a' },
          { musicSrc: 'b', cover: 'b', name: 'b' },
        ]}
      />,
    )
    expect(wrapper.state().musicSrc).toEqual('b')
    expect(wrapper.state().cover).toEqual('b')
    expect(wrapper.state().name).toEqual('b')
  })

  it('should get secondary audio info by play index', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        playIndex={1}
        audioLists={[
          { musicSrc: 'a', cover: 'a', name: 'a' },
          { musicSrc: 'b', cover: 'b', name: 'b' },
        ]}
      />,
    )
    expect(wrapper.state().musicSrc).toEqual('b')
    expect(wrapper.state().cover).toEqual('b')
    expect(wrapper.state().name).toEqual('b')
  })

  it('should auto play audio clicked in audio panel list', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="full"
        audioLists={[
          { musicSrc: 'a', cover: 'a', name: 'a' },
          { musicSrc: 'b', cover: 'b', name: 'b' },
        ]}
        autoPlay={false}
      />,
    )
    wrapper.find('.audio-item').last().simulate('click')
    expect(wrapper.state().isAutoPlayWhenUserClicked).toBe(true)
  })

  it('should auto play audio clicked by prev or next audio button', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="full"
        audioLists={[
          { musicSrc: 'a', cover: 'a', name: 'a' },
          { musicSrc: 'b', cover: 'b', name: 'b' },
        ]}
        autoPlay={false}
      />,
    )
    wrapper.find('.next-audio').simulate('click')
    expect(wrapper.state().isAutoPlayWhenUserClicked).toBe(true)
  })

  it('should cannot trigger onPlayIndexChange when open full mode', () => {
    const onAudioPlay = jest.fn()
    const onPlayIndexChange = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        defaultPlayIndex={1}
        mode="mini"
        audioLists={[
          { musicSrc: 'a', cover: 'a', name: 'a' },
          { musicSrc: 'b', cover: 'b', name: 'b' },
        ]}
        autoPlay={false}
        onAudioPlay={onAudioPlay}
        onPlayIndexChange={onPlayIndexChange}
      />,
    )
    wrapper.find('.music-player-controller').simulate('click')
    expect(onAudioPlay).not.toHaveBeenCalled()
    expect(onPlayIndexChange).not.toHaveBeenCalled()
    expect(wrapper.state().name).toEqual('b')
  })

  it('should not throw error when unmount player', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="full"
        audioLists={[{ musicSrc: 'a', cover: 'a', name: 'a' }]}
        autoPlay={false}
      />,
    )
    wrapper.unmount()
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('should not throw error when unmount player after destroyed', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="full"
        audioLists={[{ musicSrc: 'a', cover: 'a', name: 'a' }]}
        autoPlay={false}
        showDestroy
      />,
    )
    wrapper.find('.destroy-btn').simulate('click')
    wrapper.unmount()
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('should reset volume if current is mute and mute icon clicked', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="full"
        audioLists={[{ musicSrc: 'a', cover: 'a', name: 'a' }]}
        autoPlay={false}
      />,
    )
    wrapper.setState({ currentAudioVolume: 0 })
    wrapper.find('.sounds-icon').simulate('click')
    expect(wrapper.state().currentAudioVolume).not.toEqual(0)
  })

  it('should set theme to dark if media dark theme matches', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === MEDIA_QUERY.DARK_THEME,
        addListener: jest.fn(),
      }
    })
    const wrapper = mount(<ReactJkMusicPlayer theme="auto" autoPlay={false} />)
    expect(wrapper.state().theme).toEqual('dark')
  })

  it('should set theme to light if media dark theme not matches', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === MEDIA_QUERY.LIGHT_THEME,
        addListener: jest.fn(),
      }
    })
    const wrapper = mount(<ReactJkMusicPlayer theme="auto" autoPlay={false} />)
    expect(wrapper.state().theme).toEqual('light')
  })

  it('should update auto theme props', () => {
    const wrapper = mount(<ReactJkMusicPlayer autoPlay={false} />)

    wrapper.setProps({ theme: 'auto' })
    expect(wrapper.state().theme).toEqual('auto')
  })
})
