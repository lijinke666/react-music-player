import React from 'react'
import { FaHeadphonesIcon } from '../components/Icon'

export default {
  playMode: {
    order: 'Play in order',
    orderLoop: 'List loop',
    singleLoop: 'Single loop',
    shufflePlay: 'Shuffle playback'
  },
  openText: 'Open',
  closeText: 'Close',
  notContentText: 'No music',
  clickToPlayText: 'Click to play',
  clickToPauseText: 'Click to pause',
  nextTrackText: 'Next track',
  previousTrackText: 'Previous track',
  reloadText: 'Reload',
  volumeText: 'Volume',
  playListsText: 'Playlists',
  toggleLyricText: 'Toggle lyric',
  toggleMiniModeText: 'Minimize',
  destroyText: 'Destroy',
  downloadText: 'Download',
  lightThemeText: 'L',
  darkThemeText: 'D',
  switchThemeText: 'Dark/Light mode',
  removeAudioLists: "Delete audio lists",
  clickToDelete: (name) => `Click to delete ${name}`,
  controllerTitle: <FaHeadphonesIcon />,
  emptyLyricText: 'No lyric',
}
