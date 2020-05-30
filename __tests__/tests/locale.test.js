/* eslint-disable no-console */
import React from 'react'
import { mount } from 'enzyme'
import ReactJkMusicPlayer from '../../src'
import { FaHeadphonesIcon } from '../../src/components/Icon'

const getTitle = (wrapper, className, at) => {
  if (at) {
    return wrapper.find(className).at(at).getDOMNode().getAttribute('title')
  }
  return wrapper.find(className).getDOMNode().getAttribute('title')
}
describe('Locale test', () => {
  it('should render default locale with en_US', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer className="text-class-name" showLyric showDestroy />,
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should render locale with zh_CN', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        className="text-class-name"
        showLyric
        showDestroy
        locale="zh_CN"
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should override locale with en_US', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        className="text-class-name"
        showLyric
        showDestroy
        locale={{
          audioTitle: 'audioTitle',
        }}
        audioLists={[
          {
            musicSrc: 'xx',
            name: 'audioName',
          },
        ]}
      />,
    )
    expect(wrapper.find('.music-player-controller-setting').text()).toContain(
      'Open',
    )
    expect(wrapper.find(FaHeadphonesIcon)).toHaveLength(1)

    wrapper.setProps({ mode: 'full' })
    expect(getTitle(wrapper, '.prev-audio')).toEqual('Previous track')
    expect(getTitle(wrapper, '.play-btn')).toEqual('Click to play')
    expect(getTitle(wrapper, '.next-audio')).toEqual('Next track')
    expect(getTitle(wrapper, '.reload-btn')).toEqual('Reload')
    expect(getTitle(wrapper, '.audio-download')).toEqual('Download')
    expect(getTitle(wrapper, 'audio')).toEqual('audioTitle')
    expect(getTitle(wrapper, '.theme-switch button')).toEqual('Dark/Light mode')
    expect(getTitle(wrapper, '.play-sounds')).toEqual('Volume')
    expect(getTitle(wrapper, '.loop-btn')).toEqual('Play in order')
    expect(getTitle(wrapper, '.lyric-btn')).toEqual('Toggle lyric')
    expect(getTitle(wrapper, '.audio-lists-btn')).toEqual('Playlists')
    expect(getTitle(wrapper, '.hide-panel')).toEqual('Minimize')
    expect(getTitle(wrapper, '.destroy-btn')).toEqual('Destroy')
    expect(wrapper.find('.rc-switch-inner').text()).toContain('D')
    wrapper.find('.rc-switch').simulate('click')
    expect(wrapper.find('.rc-switch-inner').text()).toContain('L')

    // 打开播放列表
    wrapper.find('.audio-lists-btn').simulate('click')
    expect(wrapper.find('.audio-lists-panel-header-title').text()).toContain(
      'Playlists',
    )
    expect(getTitle(wrapper, '.audio-lists-panel-header-delete-btn')).toEqual(
      'Delete audio lists',
    )
    expect(getTitle(wrapper, '.audio-lists-panel-header-close-btn')).toEqual(
      'Close',
    )
    expect(getTitle(wrapper, '.audio-lists-panel .audio-item', 0)).toEqual(
      'Click to play',
    )
    expect(getTitle(wrapper, '.audio-lists-panel .player-delete', 0)).toEqual(
      'Click to delete audioName',
    )
  })

  it('should render locale with zh_CN detail', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        showLyric
        showDestroy
        locale="zh_CN"
        audioLists={[
          {
            musicSrc: 'xx',
            name: 'audioName',
            singer: 'singerName',
          },
        ]}
      />,
    )
    expect(wrapper.find('.music-player-controller-setting').text()).toContain(
      '打开',
    )
    expect(wrapper.find(FaHeadphonesIcon)).toHaveLength(1)

    wrapper.setProps({ mode: 'full' })
    expect(getTitle(wrapper, '.prev-audio')).toEqual('上一首')
    expect(getTitle(wrapper, '.play-btn')).toEqual('点击播放')
    expect(getTitle(wrapper, '.next-audio')).toEqual('下一首')
    expect(getTitle(wrapper, '.reload-btn')).toEqual('重新播放')
    expect(getTitle(wrapper, '.audio-download')).toEqual('下载')
    expect(getTitle(wrapper, 'audio')).toEqual('audioName - singerName')
    expect(getTitle(wrapper, '.theme-switch button')).toEqual('暗黑/明亮 主题')
    expect(getTitle(wrapper, '.play-sounds')).toEqual('音量')
    expect(getTitle(wrapper, '.loop-btn')).toEqual('顺序播放')
    expect(getTitle(wrapper, '.lyric-btn')).toEqual('显示/隐藏 歌词')
    expect(getTitle(wrapper, '.audio-lists-btn')).toEqual('播放列表')
    expect(getTitle(wrapper, '.hide-panel')).toEqual('切换至迷你模式')
    expect(getTitle(wrapper, '.destroy-btn')).toEqual('移除播放器')
    expect(wrapper.find('.rc-switch-inner').text()).toContain('暗')
    wrapper.find('.rc-switch').simulate('click')
    expect(wrapper.find('.rc-switch-inner').text()).toContain('亮')

    // 打开播放列表
    wrapper.find('.audio-lists-btn').simulate('click')
    expect(
      wrapper.find('.audio-lists-panel .audio-lists-panel-header-title').text(),
    ).toContain('播放列表 / 1')
    expect(getTitle(wrapper, '.audio-lists-panel-header-delete-btn')).toEqual(
      '清空播放列表',
    )
    expect(getTitle(wrapper, '.audio-lists-panel-header-close-btn')).toEqual(
      '关闭',
    )
    expect(getTitle(wrapper, '.audio-lists-panel .audio-item', 0)).toEqual(
      '点击播放',
    )
    expect(getTitle(wrapper, '.audio-lists-panel .player-delete', 0)).toEqual(
      '点击删除 audioName',
    )
  })

  it('should override locale', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        locale={{
          openText: 'test',
        }}
      />,
    )
    expect(wrapper.find('.music-player-controller-setting').text()).toContain(
      'test',
    )
  })

  // https://github.com/lijinke666/react-music-player/issues/83
  it('should render locale with functional audioTitle', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        className="text-class-name"
        showMiniProcessBar={true}
        showLyric
        showDestroy
        locale={{
          audioTitle: ({ name }) => `test-${name}`,
        }}
        audioLists={[
          {
            musicSrc: 'xx',
            name: 'audioName',
          },
        ]}
      />,
    )
    expect(getTitle(wrapper, 'audio')).toEqual('test-audioName')
  })
})
