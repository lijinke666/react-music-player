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
  [key: string]: any
}

export type ReactJkMusicPlayerTheme = 'dark' | 'light'
export type ReactJkMusicPlayerMode = 'mini' | 'full'
export type ReactJkMusicPlayerPlayMode =
  | 'order'
  | 'orderLoop'
  | 'singleLoop'
  | 'shufflePlay'

export interface ReactJkMusicPlayerAudioListProps {
  name: string | React.ReactNode
  singer?: string | React.ReactNode
  cover?: string
  musicSrc: (() => Promise<string>) | string
  lyric?: string
  [key: string]: any
}

export interface ReactJkMusicPlayerInstance extends HTMLAudioElement {
  destroy: () => void
}

export interface ReactJkMusicPlayerProps {
  audioLists: Array<ReactJkMusicPlayerAudioListProps>
  theme?: ReactJkMusicPlayerTheme
  mode?: ReactJkMusicPlayerMode
  defaultPlayMode?: ReactJkMusicPlayerPlayMode
  drag?: boolean
  seeked?: boolean
  autoPlay?: boolean
  playModeText?: {
    order: string | React.ReactNode
    orderLoop: string | React.ReactNode
    singleLoop: string | React.ReactNode
    shufflePlay: string | React.ReactNode
  }
  panelTitle?: string | React.ReactNode
  closeText?: string | React.ReactNode
  openText?: string | React.ReactNode
  notContentText?: string | React.ReactNode
  controllerTitle?: string | React.ReactNode
  defaultPosition?: {
    top: number | string
    left: number | string
    right: number | string
    bottom: number | string
  }
  onAudioPlay?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void
  onAudioPause?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void
  onAudioEnded?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo
  ) => void
  onAudioAbort?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo
  ) => void
  onAudioVolumeChange?: (volume: number) => void
  onAudioLoadError?: (
    errMsg: any,
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo
  ) => void
  onAudioProgress?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void
  onAudioSeeked?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void
  onAudioDownload?: (
    audioInfo: ReactJkMusicPlayerAudioInfo,
    transformedDownloadAudioInfo: TransformedDownloadAudioInfo
  ) => void
  onAudioReload?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void
  onThemeChange?: (theme: ReactJkMusicPlayerTheme) => void
  onAudioListsChange?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo
  ) => void
  onPlayModeChange?: (playMode: ReactJkMusicPlayerPlayMode) => void
  onModeChange?: (mode: ReactJkMusicPlayerMode) => void
  onAudioListsPanelChange?: (panelVisible: boolean) => void
  onAudioPlayTrackChange?: (fromIndex: number, endIndex: number) => void
  onAudioListsDragEnd?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo
  ) => void
  showDownload?: boolean
  showPlay?: boolean
  showReload?: boolean
  showPlayMode?: boolean
  showThemeSwitch?: boolean
  showMiniModeCover?: boolean
  showDestroy?: boolean
  toggleMode?: boolean
  once?: boolean
  extendsContent?:
    | (Array<React.ReactNode | string>)
    | React.ReactNode
    | boolean
    | string
  checkedText?: string | React.ReactNode
  unCheckedText?: string | React.ReactNode
  defaultVolume?: number
  playModeShowTime?: number
  bounds?: string | React.ReactNode
  showMiniProcessBar?: boolean
  loadAudioErrorPlayNext?: boolean
  preload?: boolean | 'auto' | 'metadata' | 'none'
  glassBg?: boolean
  remember?: boolean
  remove?: boolean
  defaultPlayIndex?: number
  playIndex?: number
  lyricClassName?: string
  emptyLyricPlaceholder?: string | React.ReactNode
  showLyric?: boolean
  getContainer?: () => HTMLElement
  getAudioInstance?: (instance: ReactJkMusicPlayerInstance) => void
  autoHiddenCover?: boolean
  onBeforeAudioDownload?: (
    audioInfo: ReactJkMusicPlayerAudioInfo
  ) => Promise<TransformedDownloadAudioInfo>
  clearPriorAudioLists?: boolean
  autoPlayInitLoadPlayList?: boolean
  spaceBar?: boolean
  onBeforeDestroy?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo
  ) => Promise<void>
  onDestroyed?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo
  ) => Promise<void>
  customDownloader?: (downloadAudioInfo: TransformedDownloadAudioInfo) => void
  audioTitle?: ((audioInfo: ReactJkMusicPlayerAudioInfo) => string) | string
}

export interface TransformedDownloadAudioInfo {
  src: string
  filename?: string
  mimeType?: string
}

export default class ReactJkMusicPlayer extends React.PureComponent<
  ReactJkMusicPlayerProps,
  any
> {}
