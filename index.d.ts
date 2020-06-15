import * as React from 'react'

export interface ReactJkMusicPlayerAudioInfo {
  cover: string,
  currentTime: number,
  duration: number,
  ended: boolean,
  musicSrc: string,
  muted: boolean,
  name: string,
  networkState: number,
  paused: boolean,
  played: any,
  readyState: number,
  startDate: any,
  volume: number,
  lyric: string,
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
  name: string | React.ReactNode,
  musicSrc: (() => Promise<string>) | string,
  singer?: string | React.ReactNode,
  cover?: string,
  lyric?: string,
  duration?: number,
  [key: string]: any
}

export interface ReactJkMusicPlayerInstance extends HTMLAudioElement {
  destroy: () => void
}

export interface ReactJkMusicPlayerCustomLocale {
  playModeText: {
    order: string | React.ReactNode,
    orderLoop: string | React.ReactNode,
    singleLoop: string | React.ReactNode,
    shufflePlay: string | React.ReactNode
  },
  openText: string | React.ReactNode,
  closeText: string | React.ReactNode,
  notContentText: string | React.ReactNode,
  clickToPlayText: string | React.ReactNode,
  clickToPauseText: string | React.ReactNode,
  nextTrackText: string | React.ReactNode,
  previousTrackText: string | React.ReactNode,
  reloadText: string | React.ReactNode,
  volumeText: string | React.ReactNode,
  playListsText: string | React.ReactNode,
  toggleLyricText: string | React.ReactNode,
  toggleMiniModeText: string | React.ReactNode,
  destroyText: string | React.ReactNode,
  downloadText: string | React.ReactNode,
  lightThemeText: string | React.ReactNode,
  darkThemeText: string | React.ReactNode,
  switchThemeText: string | React.ReactNode,
  removeAudioListsText: string | React.ReactNode,
  clickToDeleteText: (name: string) => string | React.ReactNode,
  controllerTitle: string | React.ReactNode,
  emptyLyricText: string | React.ReactNode
}

export type ReactJkMusicPlayerLocale = 'zh_CN' | 'en_US' | ReactJkMusicPlayerCustomLocale

export interface TransformedDownloadAudioInfo {
  src: string,
  filename?: string,
  mimeType?: string
}

export interface ReactJkMusicPlayerProps {
  audioLists: Array<ReactJkMusicPlayerAudioListProps>,
  locale?: ReactJkMusicPlayerLocale,
  theme?: ReactJkMusicPlayerTheme,
  mode?: ReactJkMusicPlayerMode,
  defaultPlayMode?: ReactJkMusicPlayerPlayMode,
  playMode?: ReactJkMusicPlayerPlayMode,
  drag?: boolean,
  seeked?: boolean,
  autoPlay?: boolean,
  defaultPosition?: {
    top?: number | string,
    left?: number | string,
    right?: number | string,
    bottom?: number | string,
  },
  responsive?: boolean,
  onAudioPlay?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onAudioPause?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onAudioEnded?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void,
  onAudioAbort?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void,
  onAudioVolumeChange?: (volume: number) => void,
  onAudioError?: (
    error: any,
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void,
  onAudioProgress?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onAudioSeeked?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onAudioDownload?: (
    audioInfo: ReactJkMusicPlayerAudioInfo,
    transformedDownloadAudioInfo: TransformedDownloadAudioInfo,
  ) => void,
  onAudioReload?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onThemeChange?: (theme: ReactJkMusicPlayerTheme) => void,
  onAudioListsChange?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void,
  onPlayModeChange?: (playMode: ReactJkMusicPlayerPlayMode) => void,
  onModeChange?: (mode: ReactJkMusicPlayerMode) => void,
  onAudioListsPanelChange?: (panelVisible: boolean) => void,
  onAudioPlayTrackChange?: (fromIndex: number, endIndex: number) => void,
  onAudioListsDragEnd?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
    showDownload?: boolean
  ) => void,
  showPlay?: boolean,
  showReload?: boolean,
  showPlayMode?: boolean,
  showThemeSwitch?: boolean,
  showMiniModeCover?: boolean,
  showDestroy?: boolean,
  showMediaSession?: boolean,
  toggleMode?: boolean,
  once?: boolean,
  extendsContent?: string | React.ReactNode,
  defaultVolume?: number,
  playModeShowTime?: number,
  bounds?: string | React.ReactNode,
  showMiniProcessBar?: boolean,
  loadAudioErrorPlayNext?: boolean,
  preload?: boolean | 'auto' | 'metadata' | 'none',
  glassBg?: boolean,
  remember?: boolean,
  remove?: boolean,
  defaultPlayIndex?: number,
  playIndex?: number,
  lyricClassName?: string,
  showLyric?: boolean,
  getContainer?: () => HTMLElement,
  getAudioInstance?: (instance: ReactJkMusicPlayerInstance) => void,
  autoHiddenCover?: boolean,
  onBeforeAudioDownload?: (
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => Promise<TransformedDownloadAudioInfo>,
  clearPriorAudioLists?: boolean,
  autoPlayInitLoadPlayList?: boolean,
  spaceBar?: boolean,
  onBeforeDestroy?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => Promise<void>,
  onDestroyed?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => Promise<void>,
  customDownloader?: (downloadAudioInfo: TransformedDownloadAudioInfo) => void,
  onCoverClick?: (
    mode: ReactJkMusicPlayerMode,
    audioLists: Array<ReactJkMusicPlayerAudioListProps>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void
}

export default class ReactJkMusicPlayer extends React.PureComponent<
  ReactJkMusicPlayerProps,
  any
> {}
