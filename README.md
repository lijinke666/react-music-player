<p align="center">
  <img alt="logo" src="https://github.com/lijinke666/react-music-player/blob/master/assetsImg/logo.png" width="100" max-width="100%">
</p>

<h1 align="center">
react-jinke-music-player
</h1>

<h4 align="center">
:musical_note: Maybe the best beautiful HTML5 responsive player component for react : )
</h4>

<p align="center">
  <a href="https://www.npmjs.com/package/react-jinke-music-player" title="npm">
    <img src="https://img.shields.io/npm/dm/react-jinke-music-player.svg?style=flat-square" alt="npm">
  </a>
  <a href="https://www.npmjs.com/package/react-jinke-music-player" title="npm">
    <img src="https://img.shields.io/npm/l/react-jinke-music-player.svg?style=flat-square" alt="npm">
  </a>
   <a href="https://travis-ci.org/lijinke666/react-music-player" title="Build Status">
    <img src="https://travis-ci.org/lijinke666/react-music-player.svg?branch=master" alt="Build Status">
  </a>
   <a href="https://badge.fury.io/js/react-jinke-music-playerr" title="npm">
    <img src="https://img.shields.io/npm/v/react-jinke-music-player.svg?style=flat-square" alt="npm version">
  </a>
  <a href="https://codecov.io/gh/lijinke666/react-music-player">
    <img src="https://codecov.io/gh/lijinke666/react-music-player/branch/master/graph/badge.svg" />
  </a>
     <a href="https://app.netlify.com/sites/react-jinke-music-player/deploys" title="Netlify Status">
    <img src="https://api.netlify.com/api/v1/badges/2a5d8639-9d2a-46ee-a504-10b7846a57e4/deploy-status" alt="Coverage Status">
  </a>
</p>



<p align="center">
  <a href="https://github.com/lijinke666/react-music-player/blob/master/CN.md">
    中文文档
  </a>
</p>

## Installation

using `yarn` :

```
yarn add react-jinke-music-player
```

using `npm` :

```
npm install react-jinke-music-player --save
```

## Screenshots

> mini mode <br/>

> ![mini mode](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/mini.png)

> Light Theme <br/>

![light theme](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/light-theme.png)

> Dark Theme <br/>

![dark theme](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/dark-theme.png)

> mobile <br/>

![mobile](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/mobile.jpg)

## Example

> live example :
- [https://lijinke666.github.io/react-music-player/](https://lijinke666.github.io/react-music-player/)
- [https://react-jinke-music-player.netlify.com/](https://react-jinke-music-player.netlify.com/)

> practical application : [Jinke.Li's House](http://www.lijinke.cn/)

> local example : [http://localhost:8081/](http://localhost:8081/)

[Source Code](https://github.com/lijinke666/react-music-player/blob/master/example/example.js)

## Usage

```jsx
import React from "react";
import ReactDOM from "react-dom";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

ReactDOM.render(
  <ReactJkMusicPlayer {...options} />,
  document.getElementById("root")
);
```

## API

| Name                     | Type                                                                                | Default                                                                                     | Description                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className                | `string`                                                                            | `-`                                                                                         | Additional CSS class for the root DOM node                                                                                                                                                                                                                                                                                                                  |
| audioLists               | `object[]`                                                                          | `-`                                                                                         | [detail](#AudioList)                                                                                                                                                                                                                                                                                                                                        |
| theme                    | `string`                                                                            | `dark`                                                                                      | color of the music player theme  `dark`                                                                                                                                                                                                                                                                                                                     | `light` |
| defaultPosition          | `object`                                                                            | `{top:0,left:0}`                                                                            | audio controller initial position with `left,top,right,and bottom`                                                                                                                                                                                                                                                                                          |
| playModeText             | `object`                                                                            | {order: "order",orderLoop: "orderLoop",singleLoop: "singleLoop",shufflePlay:"shufflePlay"}` | play mode text config of the audio player                                                                                                                                                                                                                                                                                                                   |
| playModeShowTime         | `number`                                                                            | `600`                                                                                       | play mode toggle show time (ms)                                                                                                                                                                                                                                                                                                                             |
| bounds                   | `object`,`number`                                                                   | `body`                                                                                      | specifies movement boundaries. Accepted values:  `parent` restricts movement within the node's offsetParent    (nearest node with position relative or absolute), or a selector, restricts movement within the targeted node An object with `left, top, right, and bottom` properties. These indicate how far in each direction the draggable can be moved. |
| preload                  | `boolean`,`string`                                                                  | `false`                                                                                     | Whether to load audio immediately after the page loads. can be set to `auto|metadata|none` `true|false` if `preload=true` preload="auto"                                                                                                                                                                                                                    |
| remember                 | `boolean`                                                                           | `false`                                                                                     | The next time you access the player, do you keep the last state                                                                                                                                                                                                                                                                                             |
| glassBg                  | `boolean`                                                                           | `false`                                                                                     | Whether the player's background displays frosted glass effect                                                                                                                                                                                                                                                                                               |
| remove                   | `boolean`                                                                           | `true`                                                                                      | The Audio Can be deleted                                                                                                                                                                                                                                                                                                                                    |
| defaultPlayIndex         | `number`                                                                            | `0`                                                                                         | Default play index of the audio player                                                                                                                                                                                                                                                                                                                      |
| playIndex                | `number`                                                                            | `0`                                                                                         | play index of the audio player                                                                                                                                                                                                                                                                                                                              |
| openText                 | `string`                                                                            | `open`                                                                                      | audio controller open text                                                                                                                                                                                                                                                                                                                                  |
| closeText                | `string`                                                                            | `close`                                                                                     | audio controller close text                                                                                                                                                                                                                                                                                                                                 |
| panelTitle               | `string`                                                                            | `PlayList`                                                                                  | audio list panel title                                                                                                                                                                                                                                                                                                                                      |
| notContentText           | `string`                                                                            | `no music`                                                                                  | audio list panel show text of the playlist has no songs                                                                                                                                                                                                                                                                                                     |
| checkedText              | `string`                                                                            | `-`                                                                                         | audio theme switch checkedText                                                                                                                                                                                                                                                                                                                              |
| unCheckedText            | `string`                                                                            | `-`                                                                                         | audio theme switch unCheckedText                                                                                                                                                                                                                                                                                                                            |
| defaultPlayMode          | `string`                                                                            | `order`                                                                                     | default play mode of the audio player options can be set to `order`,`orderLoop`,`singleLoop`,`shufflePlay` or omitted                                                                                                                                                                                                                                       |
| mode                     | `string`                                                                            | `mini`                                                                                      | audio theme switch checkedText can be set to `mini`,`full` or omitted                                                                                                                                                                                                                                                                                       |
| once                     | `boolean`                                                                           | `false`                                                                                     | The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'                                                                                                                                                                                                                        |
| autoPlay                 | `boolean`                                                                           | `true`                                                                                      | Whether the audio is played after loading is completed.                                                                                                                                                                                                                                                                                                     |
| toggleMode               | `boolean`                                                                           | `true`                                                                                      | Whether you can switch between two modes, full => mini or mini => full                                                                                                                                                                                                                                                                                      |
| drag                     | `boolean`                                                                           | `true`                                                                                      | audio controller is can be drag of the "mini" mode                                                                                                                                                                                                                                                                                                          |
| seeked                   | `boolean`                                                                           | `true`                                                                                      | Whether you can drag or click the progress bar to play in the new progress.                                                                                                                                                                                                                                                                                 |
| showMiniModeCover        | `boolean`                                                                           | `true`                                                                                      | audio cover is show of the "mini" mode                                                                                                                                                                                                                                                                                                                      |
| showMiniProcessBar       | `boolean`                                                                           | `false`                                                                                     | audio progress circle bar is show of the "mini" mode                                                                                                                                                                                                                                                                                                        |
| showProgressLoadBar      | `boolean`                                                                           | `true`                                                                                      | Displays the audio load progress bar.                                                                                                                                                                                                                                                                                                                       |
| showPlay                 | `boolean`                                                                           | `true`                                                                                      | play button display of the audio player panel                                                                                                                                                                                                                                                                                                               |
| showReload               | `boolean`                                                                           | `true`                                                                                      | reload button display of the audio player panel                                                                                                                                                                                                                                                                                                             |
| showDownload             | `boolean`                                                                           | `true`                                                                                      | download button display of the audio player panel                                                                                                                                                                                                                                                                                                           |
| showPlayMode             | `boolean`                                                                           | `true`                                                                                      | play mode toggle button display of the audio player panel                                                                                                                                                                                                                                                                                                   |
| showThemeSwitch          | `boolean`                                                                           | `true`                                                                                      | theme toggle switch display of the audio player panel                                                                                                                                                                                                                                                                                                       |
| showLyric                | `boolean`                                                                           | `false`                                                                                     | audio lyric button display of the audio player panel                                                                                                                                                                                                                                                                                                        |
| lyricClassName           | `string`                                                                            | `-`                                                                                         | audio lyric class name                                                                                                                                                                                                                                                                                                                                      |
| emptyLyricPlaceholder    | `string`                                                                            | `-`                                                                                         | audio lyric empty lyric placeholder                                                                                                                                                                                                                                                                                                                         |
| extendsContent           | `array \| ReactNode \| boolean \| string`                                           | `-`                                                                                         | Extensible custom content like `<><button>button1</button> <button>button2</button></>`                                                                                                                                                                                                                                                                     |
| controllerTitle          | `string`                                                                            | `<FaHeadphones/>`                                                                           | audio controller title                                                                                                                                                                                                                                                                                                                                      |
| defaultVolume            | `number`                                                                            | `100`                                                                                       | default volume of the audio player , range `0`-`100`                                                                                                                                                                                                                                                                                                        |
| loadAudioErrorPlayNext   | `boolean`                                                                           | `true`                                                                                      | Whether to try playing the next audio when the current audio playback fails                                                                                                                                                                                                                                                                                 |
| onAudioDownload          | `function(audioInfo)`                                                               | `-`                                                                                         | audio is downloaded handle                                                                                                                                                                                                                                                                                                                                  |
| onAudioPlay              | `function(audioInfo)`                                                               | `-`                                                                                         | audio play handle                                                                                                                                                                                                                                                                                                                                           |
| onAudioPause             | `function(audioInfo)`                                                               | `-`                                                                                         | audio pause handle                                                                                                                                                                                                                                                                                                                                          |
| onAudioSeeked            | `function(audioInfo)`                                                               | `-`                                                                                         | When the user has moved/jumped to a new location in audio handle                                                                                                                                                                                                                                                                                            |
| onAudioVolumeChange      | `function(audioInfo)`                                                               | `-`                                                                                         | When the volume has changed handle min = 0.0 max = 1.0                                                                                                                                                                                                                                                                                                      |
| onAudioEnded             | `function(audioInfo)`                                                               | `-`                                                                                         | The single song is ended handle                                                                                                                                                                                                                                                                                                                             |
| onAudioAbort             | `function(audioInfo)`                                                               | `-`                                                                                         | audio load abort The target event like {...,audioName:xx,audioSrc:xx,playMode:xx}                                                                                                                                                                                                                                                                           |
| onAudioProgress          | `function(audioInfo)`                                                               | `-`                                                                                         | audio play progress handle                                                                                                                                                                                                                                                                                                                                  |
| onAudioLoadError         | `function(audioInfo)`                                                               | `-`                                                                                         | audio load failed error handle                                                                                                                                                                                                                                                                                                                              |
| onAudioReload            | `function(audioInfo)`                                                               | `-`                                                                                         | audio reload handle                                                                                                                                                                                                                                                                                                                                         |
| onAudioListsChange       | `function(currentPlayIndex,audioLists,audioInfo)`                                   | `-`                                                                                         | audio lists change handle                                                                                                                                                                                                                                                                                                                                   |
| onAudioPlayTrackChange   | `function(currentPlayIndex,audioLists,audioInfo)`                                   | `-`                                                                                         | audio current play track change handle                                                                                                                                                                                                                                                                                                                      |
| onAudioPlayModeChange    | `function(playMode)`                                                                | `-`                                                                                         | play mode change handle                                                                                                                                                                                                                                                                                                                                     |
| onAudioListsPanelChange  | `function(panelVisible)`                                                            | `-`                                                                                         | audio lists panel change handle                                                                                                                                                                                                                                                                                                                             |
| onThemeChange            | `function(theme)`                                                                   | `-`                                                                                         | theme change handle                                                                                                                                                                                                                                                                                                                                         |
| onModeChange             | `function(mode)`                                                                    | `-`                                                                                         | mode change handle                                                                                                                                                                                                                                                                                                                                          |
| onAudioListsDragEnd      | `function(fromIndex,endIndex)`                                                      | `-`                                                                                         | audio lists drag end handle                                                                                                                                                                                                                                                                                                                                 |
| onAudioLyricChange       | `function(lineNum, currentLyric)`                                                   | `-`                                                                                         | audio lyric change handle                                                                                                                                                                                                                                                                                                                                   |
| getContainer             | `() => HTMLElement` \| ` Selectors `                                                | `document.body`                                                                             | Return the mount node for Music player                                                                                                                                                                                                                                                                                                                      |
| getAudioInstance         | `(instance: HTMLAudioElement) => void`                                              | `-`                                                                                         | get origin audio element instance , you can use it do everything                                                                                                                                                                                                                                                                                            |
| autoHiddenCover          | `boolean`                                                                           | `false`                                                                                     | Auto hide the cover photo if no cover photo is available                                                                                                                                                                                                                                                                                                    |
| onBeforeAudioDownload    | `(audioInfo: ReactJkMusicPlayerAudioInfo) => Promise<TransformedDownloadAudioInfo>` | `-`                                                                                         | transform download audio info before                                                                                                                                                                                                                                                                                                                        |
| clearPriorAudioLists     | `boolean`                                                                           | `false`                                                                                     | Replace a new playlist with the first loaded playlist,                                                                                                                                                                                                                                                                                                      |
| autoPlayInitLoadPlayList | `boolean`                                                                           | `false`                                                                                     | Play your new play list right after your new play list is loaded turn false.                                                                                                                                                                                                                                                                                |
| spaceBar                 | `boolean`                                                                           | `false`                                                                                     | Play and pause audio through space bar （Desktop effective）.                                                                                                                                                                                                                                                                                               |
| showDestroy              | `boolean`                                                                           | `false`                                                                                     | Destroy player button display                                                                                                                                                                                                                                                                                                                               |
| onBeforeDestroy          | `function(currentPlayIndex,audioLists,audioInfo)`                                   | `-`                                                                                         | custom destroy handler before                                                                                                                                                                                                                                                                                                                               |
| onDestroyed              | `function(currentPlayIndex,audioLists,audioInfo)`                                   | `-`                                                                                         | player destroyed handle                                                                                                                                                                                                                                                                                                                                     |
| customDownloader         | `function(downloadInfo: TransformedDownloadAudioInfo)`                              | `-`                                                                                         | custom download handle                                                                                                                                                                                                                                                                                                                                      |
| audioTitle               | `string \| (audioInfo: ReactJkMusicPlayerAudioInfo) => string`                       | `{name} - {signer}`                                                                         | custom audio title                                                                                                                                                                                                                                                                                                                                          |

## Custom operation ui

Support feature:

- `play`
- `pause`
- `reload`
- `change play time`
- `change playbackRate`
- `change volume`
- `destroy audio player`

```jsx
class App extends React.Component{
  constructor() {
    this.audioInstance = null
  }
  render() {
    return (
      <>
        <ReactJkMusicPlayer getAudioInstance={instance => this.audioInstance = instance}/>
        <button onClick={() => this.audioInstance.play()}>play</button>
        <button onClick={() => this.audioInstance.pause()}>pause</button>
        <button onClick={() => this.audioInstance.load()}>reload</button>
        <button onClick={() => (this.audioInstance.currentTime = 40)}>
          change current play time
        </button>
        <button onClick={() => (this.audioInstance.playbackRate = 2)}>
          change play back rate
        </button>
        <button onClick={() => (this.audioInstance.volume = 0.2)}>change volume</button>
        <button onClick={() => this.audioInstance.destroy()}>destory player</button>
      </>
    )
  }
}
```

## Glass bg

```jsx
<ReactJkMusicPlayer glassBg/>
```

![glass-1](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/glass-1.png)

![glass-2](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/glass-2.png)

## Custom downloader

> eg. <https://www.npmjs.com/package/file-saver>

```jsx
const customDownloader = (downloadInfo) => {
  const link = document.createElement('a')
  link.href = downloadInfo.src // a.mp3
  link.download = downloadInfo.filename || 'test'
  document.body.appendChild(link)
  link.click()
}
<ReactJkMusicPlayer audioLists={[{src: "a.mp3"}]} customDownloader={customDownloader}/>

// use onBeforeAudioDownload
const onBeforeAudioDownload = () => {
  return Promise.resolve({
    src: '1.mp3',
  })
}

const customDownloader = (downloadInfo) => {
  console.log(downloadInfo.src) // 1.mp3
}
<ReactJkMusicPlayer customDownloader={customDownloader}/>
```

## Destory player

```jsx
  const onBeforeDestroy = (currentPlayId, audioLists, audioInfo) => {
    return new Promise((resolve, reject) => {
      // your custom validate
      if (window.confirm('Are you confirm destroy the player?')) {
        // if resolve, player destroyed
        resolve()
      } else {
        // if reject, skip.
        reject()
      }
    })
  }

  const onDestroyed = (currentPlayId, audioLists, audioInfo) => {
    console.log('onDestroyed:', currentPlayId, audioLists, audioInfo)
  }

  ReactDOM.render(
    <ReactJkMusicPlayer
      showDestroy
      onBeforeDestroy={onBeforeDestroy}
      onDestroyed={onDestroyed}
    />
  )
```

## Development

```
git clone https://github.com/lijinke666/react-music-player.git
yarn | npm install
yarn start | npm start
open `http://localhost:8081/`
```

## Test case

```
npm run test
```

## AudioList

> Like This

```ts
interface ReactJkMusicPlayerAudioList {
  name: string | React.ReactNode,
  singer?: string | React.ReactNode,
  cover: string,
  musicSrc: string | () => Promise<string>,
  lyric?: string,
  [key: string]: any
}>
```

## AudioInfo

> Like This

```ts
interface ReactJkMusicPlayerAudioInfo {
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
  startDate: any
  volume: number,
  lyric: string,
  [key: string]: any
}
```

## Properties

```ts
export interface ReactJkMusicPlayerProps {
  audioLists: Array<ReactJkMusicPlayerAudioList>
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
  onAudioEnded?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void
  onAudioAbort?: (data: any) => void
  onAudioVolumeChange?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void
  onAudioLoadError?: (data: any) => void
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
    audioLists: Array<ReactJkMusicPlayerAudioList>,
    audioInfo: ReactJkMusicPlayerAudioInfo
  ) => void
  onPlayModeChange?: (playMode: ReactJkMusicPlayerPlayMode) => void
  onModeChange?: (mode: ReactJkMusicPlayerMode) => void
  onAudioListsPanelChange?: (panelVisible: boolean) => void
  onAudioPlayTrackChange?: (fromIndex: number, endIndex: number) => void
  onAudioListsDragEnd?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioList>,
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
  getAudioInstance?: (instance: HTMLAudioElement) => void
  autoHiddenCover?: boolean
  onBeforeAudioDownload?: (
    audioInfo: ReactJkMusicPlayerAudioInfo
  ) => Promise<TransformedDownloadAudioInfo>
  clearPriorAudioLists?: boolean
  autoPlayInitLoadPlayList?: boolean
  spaceBar?: boolean
  onBeforeDestroy?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioList>,
    audioInfo: ReactJkMusicPlayerAudioInfo
  ) => Promise<void>
  onDestroyed?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioList>,
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

export interface ReactJkMusicPlayerInstance extends HTMLAudioElement {
  destroy: () => void
}
```

## License

[MIT](https://github.com/lijinke666/react-music-player/blob/master/LICENCE)
