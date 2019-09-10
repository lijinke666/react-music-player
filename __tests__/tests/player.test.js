/* global describe,it*/
/*eslint-disable no-console */
import React from 'react'
import assert from 'power-assert'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import ReactJkMusicPlayer, {
  AnimatePlayIcon,
  AnimatePauseIcon,
  Load,
  PlayModel,
  CircleProcessBar
} from '../../src'
import {
  createRandomNum,
  formatTime,
  arrayEqual,
  distinct
} from '../../src/utils'
import PlayerMobile, { PlayModeTip } from '../../src/components/PlayerMobile'
import AudioListsPanel from '../../src/components/AudioListsPanel'

describe('<ReactJkMusicPlayer/>', () => {
  it('should render a <ReactJkMusicPlayer/> components', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        className="text-class-name"
        showMiniProcessBar={true}
      />
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
          musicSrc: 'test.mp3'
        }
      ]
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
      expect(wrapper.text()).to.contain('no music')
    })
  })
  it('should toggle group setting buttons', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        showDownload={true}
        showThemeSwitch={true}
        showReload={true}
        showPlayMode={true}
      />
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
  it('should find Specified text', () => {
    const testProps = {
      playModeText: {
        order: 'order',
        orderLoop: 'orderLoop',
        singleLoop: 'singleLoop',
        shufflePlay: 'shufflePlay'
      },
      controllerTitle: 'controllerTitle',
      openText: 'openText',
      closeText: 'closeText',
      panelTitle: 'panelTitle',
      notContentText: 'notContentText',
      checkedText: 'checkedText',
      unCheckedText: 'unCheckedText',
      showDownload: true,
      showThemeSwitch: true,
      showReload: true,
      showPlayMode: true,
      defaultPlayMode: 'order'
    }
    const wrapper = mount(<ReactJkMusicPlayer {...testProps} />)
    expect(wrapper.text()).to.contain('openText')

    wrapper.setState({ toggle: false, loading: false })
    expect(wrapper.text()).to.contain('controllerTitle')

    wrapper.setState({ toggle: true })
    expect(wrapper.text()).to.contain('panelTitle')
    expect(wrapper.text()).to.contain('unCheckedText')

    wrapper.setState({ theme: 'light' })
    expect(wrapper.text()).to.contain('checkedText')
    expect(wrapper.text()).to.contain('order')

    wrapper.setProps({ defaultPlayMode: 'orderLoop' })
    expect(wrapper.text()).to.contain('orderLoop')

    wrapper.setProps({ defaultPlayMode: 'singleLoop' })
    expect(wrapper.text()).to.contain('singleLoop')

    wrapper.setProps({ defaultPlayMode: 'shufflePlay' })
    expect(wrapper.text()).to.contain('shufflePlay')

    wrapper.setProps({ audioLists: [] })
    expect(wrapper.text()).to.contain('notContentText')
  })
  it('should render seeked', () => {
    const wrapper = mount(<ReactJkMusicPlayer seeked={true} />)
    assert(wrapper.props().seeked === true)
    wrapper.setProps({ seeked: false })
    assert(wrapper.props().seeked === false)
  })
  it('should render extendsContent', () => {
    const extendsContent = [
      <span key="1" className="extendsContent">
        extendsText1
      </span>,
      <span key="2">extendsText2</span>
    ]
    const wrapper = mount(
      <ReactJkMusicPlayer extendsContent={extendsContent} />
    )
    wrapper.setState({ toggle: true })
    expect(wrapper.text()).to.contain('extendsText1')
    expect(wrapper.text()).to.contain('extendsText2')
    assert(wrapper.find('.extendsContent').length === 1)
  })
  it('should render range random', () => {
    const repeat = 10
    const result = new Array(repeat).fill().map((_, i) => {
      return createRandomNum(0, i + 1) <= i + 1
    })
    expect(result.filter(v => v)).to.have.length(repeat)
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
    assert(wrapper.find('.delete-btn').length >= 1)
    assert(wrapper.find('.player-delete').length === 0)
    wrapper.setState({
      audioLists: [
        {
          name: 'name',
          singer: 'singer',
          cover: 'test.jpg',
          musicSrc: 'test.mp3'
        }
      ]
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
    const wrapper = mount(
      <ReactJkMusicPlayer extendsContent={[<div key="test">extends</div>]} />
    )
    wrapper.setState({ toggle: true, isMobile: true })
    assert(
      wrapper.find('.react-jinke-music-player-mobile-operation .item').length >=
        5
    )
  })
})
