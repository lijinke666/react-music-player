import React from 'react'
import { FaHeadphonesIcon } from '../components/Icon'

export default {
  playModeText: {
    order: '顺序播放',
    orderLoop: '列表循环',
    singleLoop: '单曲循环',
    shufflePlay: '随机播放',
  },
  openText: '打开',
  closeText: '关闭',
  emptyText: '音乐播放列表为空',
  clickToPlayText: '点击播放',
  clickToPauseText: '点击暂停',
  nextTrackText: '下一首',
  previousTrackText: '上一首',
  reloadText: '重新播放',
  volumeText: '音量',
  playListsText: '播放列表',
  toggleLyricText: '显示/隐藏 歌词',
  toggleMiniModeText: '切换至迷你模式',
  destroyText: '移除播放器',
  downloadText: '下载',
  lightThemeText: '亮',
  darkThemeText: '暗',
  switchThemeText: '暗黑/明亮 主题',
  removeAudioListsText: '清空播放列表',
  clickToDeleteText: (name) => `点击删除 ${name}`,
  controllerTitle: <FaHeadphonesIcon />,
  emptyLyricText: '暂无歌词',
  loadingText: '加载中',
}
