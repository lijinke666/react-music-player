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
