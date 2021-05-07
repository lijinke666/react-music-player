import * as React from 'react'

export interface ReactJkMusicPlayerAudioInfo {
  cover: string
  currentTime: number
  duration: number
  ended: boolean
  musicSrc: string
  muted: boolean
  name: string
  networkState: number
  paused: boolean
  played: any
  readyState: number
  startDate: any
  volume: number
  lyric: string
  currentLyric: string
  playIndex: number
  __PLAYER_KEY__: string
  [key: string]: any
}

export type ReactJkMusicPlayerTheme = 'dark' | 'light' | 'auto'
export type ReactJkMusicPlayerMode = 'mini' | 'full'
export type ReactJkMusicPlayerPlayMode =
  | 'order'
  | 'orderLoop'
  | 'singleLoop'
  | 'shufflePlay'

export interface ReactJkMusicPlayerAudioListProps {
  name: React.ReactNode
  musicSrc: (() => Promise<string>) | string
  singer?: React.ReactNode
  cover?: string
  lyric?: string
  duration?: number
  [key: string]: any
}

export interface ReactJkMusicPlayerInstance extends HTMLAudioElement {
  destroy?: () => void
  updatePlayIndex?: (index: number) => void
  playByIndex?: (index: number) => void
  playNext?: () => void
  playPrev?: () => void
  togglePlay?: () => void
  clear?: () => void
  sortable?: any
}

export interface ReactJkMusicPlayerIcon {
  pause?: React.ReactNode
  play?: React.ReactNode
  destroy?: React.ReactNode
  close?: React.ReactNode
  delete?: React.ReactNode
  download?: React.ReactNode
  toggle?: React.ReactNode
  lyric?: React.ReactNode
  volume?: React.ReactNode
  mute?: React.ReactNode
  next?: React.ReactNode
  prev?: React.ReactNode
  playLists?: React.ReactNode
  reload?: React.ReactNode
  loop?: React.ReactNode
  order?: React.ReactNode
  orderLoop?: React.ReactNode
  shuffle?: React.ReactNode
  loading?: React.ReactNode
}

export interface ReactJkMusicPlayerCustomLocale {
  playModeText: {
    order: React.ReactNode
    orderLoop: React.ReactNode
    singleLoop: React.ReactNode
    shufflePlay: React.ReactNode
  }
  openText: React.ReactNode
  closeText: React.ReactNode
  emptyText: React.ReactNode
  clickToPlayText: React.ReactNode
  clickToPauseText: React.ReactNode
  nextTrackText: React.ReactNode
  previousTrackText: React.ReactNode
  reloadText: React.ReactNode
  volumeText: React.ReactNode
  playListsText: React.ReactNode
  toggleLyricText: React.ReactNode
  toggleMiniModeText: React.ReactNode
  destroyText: React.ReactNode
  downloadText: React.ReactNode
  lightThemeText: React.ReactNode
  darkThemeText: React.ReactNode
  switchThemeText: React.ReactNode
  removeAudioListsText: React.ReactNode
  clickToDeleteText: (name: string) => React.ReactNode
  controllerTitle: React.ReactNode
  emptyLyricText: React.ReactNode
}

export type ReactJkMusicPlayerLocale =
  | 'zh_CN'
  | 'en_US'
  | ReactJkMusicPlayerCustomLocale

export interface TransformedDownloadAudioInfo {
  src: string
  filename?: string
  mimeType?: string
}

export interface ReactJkMusicPlayerProps {
  style?: React.CSSProperties
  className?: string
  audioLists: Array<ReactJkMusicPlayerAudioListProps>
  locale?: ReactJkMusicPlayerLocale
  icon?: ReactJkMusicPlayerIcon
  theme?: ReactJkMusicPlayerTheme
  mode?: ReactJkMusicPlayerMode
  defaultPlayMode?: ReactJkMusicPlayerPlayMode
  playMode?: ReactJkMusicPlayerPlayMode
  drag?: boolean
  seeked?: boolean
  autoPlay?: boolean
  defaultPosition?: {
    top?: number | string
    left?: number | string
    right?: number | string
    bottom?: number | string
  }
  responsive?: boolean
  quietUpdate?: boolean
  onAudioPlay?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void
  onAudioPause?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void
  onAudioEnded?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void
  onAudioAbort?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void
  onAudioVolumeChange?: (volume: number) => void
  onAudioError?: (
    error: any,
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void
  onAudioProgress?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void
  onAudioSeeked?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void
  onAudioDownload?: (
    audioInfo: ReactJkMusicPlayerAudioInfo,
    transformedDownloadAudioInfo: TransformedDownloadAudioInfo,
  ) => void
  onAudioReload?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void
  onThemeChange?: (theme: ReactJkMusicPlayerTheme) => void
  onAudioListsChange?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void
  onPlayModeChange?: (playMode: ReactJkMusicPlayerPlayMode) => void
  onModeChange?: (mode: ReactJkMusicPlayerMode) => void
  onAudioListsPanelChange?: (panelVisible: boolean) => void
  onAudioPlayTrackChange?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void
  onAudioListsSortEnd?: (oldIndex: number, newIndex: number) => void
  showDownload?: boolean
  showPlay?: boolean
  showReload?: boolean
  showPlayMode?: boolean
  showThemeSwitch?: boolean
  showMiniModeCover?: boolean
  showDestroy?: boolean
  showMediaSession?: boolean
  toggleMode?: boolean
  once?: boolean
  extendsContent?: React.ReactNode
  defaultVolume?: number
  playModeShowTime?: number
  bounds?: React.ReactNode
  showMiniProcessBar?: boolean
  loadAudioErrorPlayNext?: boolean
  preload?: boolean | 'auto' | 'metadata' | 'none'
  glassBg?: boolean
  remember?: boolean
  remove?: boolean
  defaultPlayIndex?: number
  playIndex?: number
  lyricClassName?: string
  showLyric?: boolean
  getContainer?: () => HTMLElement
  getAudioInstance?: (instance: ReactJkMusicPlayerInstance) => void
  autoHiddenCover?: boolean
  onBeforeAudioDownload?: (
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => Promise<TransformedDownloadAudioInfo>
  clearPriorAudioLists?: boolean
  autoPlayInitLoadPlayList?: boolean
  spaceBar?: boolean
  onBeforeDestroy?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => Promise<void>
  onDestroyed?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => Promise<void>
  customDownloader?: (downloadAudioInfo: TransformedDownloadAudioInfo) => void
  onCoverClick?: (
    mode: ReactJkMusicPlayerMode,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void
  onPlayIndexChange?: (playIndex: number) => void
  renderAudioTitle?: (
    audioInfo: ReactJkMusicPlayerAudioInfo,
    isMobile: boolean,
  ) => React.ReactNode
  mobileMediaQuery?: string
  volumeFade?: {
    fadeIn?: number
    fadeOut?: number
  }
  restartCurrentOnPrev?: boolean
  sortableOptions?: object
}

export default class ReactJkMusicPlayer extends React.PureComponent<
  ReactJkMusicPlayerProps,
  any
> {}
