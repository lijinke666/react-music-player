import React from 'react'
import { FaHeadphonesIcon } from '../components/Icon'

export default {
  playMode: {
    order: '顺序播放',
    orderLoop: '列表循环',
    singleLoop: '单曲循环',
    shufflePlay: '随机播放'
  },
  openText: 'Open',
  closeText: 'Close',
  notContentText: 'No music',
  panelTitle: 'Playlist',
  clickToPlayText: 'Click to play',
  clickToPauseText: 'Click to pause',
  nextTrackText: 'Next track',
  previousTrackText: 'Previous track',
  reloadText: 'Reload',
  volumeText: 'Volume',
  playListsText: 'Playlists',
  toggleLyricText: 'Toggle lyric',
  toggleModeText: 'Minimize',
  destroyText: 'Destroy',
  downloadText: 'Download',
  lightThemeText: 'L',
  darkThemeText: 'D',
  darkLightModeText: 'Dark/Light mode',
  removeAudioLists: "Delete audio lists",
  clickToDelete: (name) => `Click to delete ${name}`,
  controllerTitle: <FaHeadphonesIcon />,
  emptyLyricPlaceholder: 'No lyric',
}
