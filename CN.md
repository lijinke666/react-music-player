<p align="center">
  <img alt="logo" src="https://github.com/lijinke666/react-music-player/blob/master/assetsImg/logo.png" width="100" max-width="100%">
</p>

<h1 align="center">
react-jinke-music-player
</h1>

<h4 align="center">
:musical_note: 也许是颜值最高,最好用的一个响应式 React HTML5 音频播放器组件 : )
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
  <a href="https://github.com/lijinke666/react-music-player/blob/master/README.md">
    English Doc
  </a>
</p>



## 安装

使用 `yarn`:

```
yarn add react-jinke-music-player
```

或者 `npm`

```
npm install react-jinke-music-player --save
```

## 预览

> 迷你模式 <br/>

> ![mini mode](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/mini.png)

> 白天主题 <br/>

![light theme](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/light-theme.png)

> 黑夜主题 <br/>

![dark theme](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/dark-theme.png)

> 移动端 <br/>

![mobile](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/mobile.jpg)

## 例子

> 在线访问 : [https://lijinke666.github.io/react-music-player/](https://lijinke666.github.io/react-music-player/)

> 实际应用 : [李金珂的小屋](http://www.lijinke.cn/)

> 本地访问 : [http://localhost:8081/](http://localhost:8081/)

[例子示例代码](https://github.com/lijinke666/react-music-player/blob/master/example/example.js)

## 使用

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

| 属性                    | 类型                                              | 默认值                                                                                      | 说明                                                                                                                                           |
| ----------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| className               | `string`                                          | `-`                                                                                         | 附加的 className                                                                                                                               |
| audioLists              | `object[]`                                        | `-`                                                                                         | 播放列表 : {name: "YOUR_AUDIO_NAME",singer: "YOUR_AUDIO_SINGER_NAME",cover: "YOUR_AUDIO_COVER",musicSrc: "YOUR_AUDIO_SRC"}                     |
| theme                   | `string`                                          | `dark`                                                                                      | 播放器主题 可选 'light'(白天) 和 'dark'(黑夜) 两种                                                                                             |
| defaultPosition         | `object`                                          | `{top:0,left:0}`                                                                            | 当播放器是迷你模式时的初始位 比如 {top:0,left:0} or {top:'20%',left:"20%"}                                                                     |
| playModeText            | `object`                                          | {order: "order",orderLoop: "orderLoop",singleLoop: "singleLoop",shufflePlay:"shufflePlay"}` | 播放模式对应的文字                                                                                                                             |
| playModeShowTime        | `number`                                          | `600`                                                                                       | 切换播放模式时提示语的显示时间,单位毫秒                                                                                                        |
| bounds                  | `object`,`string`                                 | `body`                                                                                      | 拖拽边界 可以是一个具体的字符串,比如 `body`,也可以是具体的值 `left,top,right,bottom`                                                           |
| preload                 | `boolean`,`string`                                | `false`                                                                                     | 是否在页面加载后立即加载音频。可选值 `auto|metadata|none` `true|false` 如果 `preload=true` 默认会 设置 preload="auto"                          |
| remember                | `boolean`                                         | `false`                                                                                     | 是否记住当前播放状态,比如音量,播放状态,下次访问时继续播放                                                                                      |
| glassBg                 | `boolean`                                         | `false`                                                                                     | 是否显示毛玻璃背景效果                                                                                                                         |
| remove                  | `boolean`                                         | `true`                                                                                      | 音乐是否可以被删除                                                                                                                             |
| defaultPlayIndex        | `number`                                          | `0`                                                                                         | 默认从第几首歌开始播放, 当值 超过 或低于 可播放数 默认为最大播放数 和 最小播放数                                                               |
| openText                | `string | ReactNode`                              | `open`                                                                                      | 迷你模式时播放器的打开文案                                                                                                                     |
| closeText               | `string | ReactNode`                              | `close`                                                                                     | 迷你模式时播放器的关闭文案                                                                                                                     |
| panelTitle              | `string | ReactNode`                              | `PlayList`                                                                                  | 播放列表显示的标题                                                                                                                             |
| notContentText          | `string | ReactNode`                              | `no music`                                                                                  | 播放列表为空时显示的文字                                                                                                                       |
| checkedText             | `string | ReactNode`                              | `-`                                                                                         | 播放器主题开关 选中的文字                                                                                                                      |
| unCheckedText           | `string | ReactNode`                              | `-`                                                                                         | 播放器主题开关 未选中的文字                                                                                                                    |
| defaultPlayMode         | `string`                                          | `order`                                                                                     | 默认的播放模式 可选 `order`,`orderLoop`,`singleLoop`,`shufflePlay`                                                                             |
| mode                    | `string`                                          | `mini`                                                                                      | 播放器的默认模式 可选 `mini`,`full`                                                                                                            |
| once                    | `boolean`                                         | `false`                                                                                     | 在默认情况下 'audioPlay' 函数 会在你 每次暂停后再次播放 触发 , 如果 你只想 让 'audioPlay' 在 音乐初始化播放的时候触发一次,你可以设置 为 `true` |
| autoPlay                | `boolean`                                         | `true`                                                                                      | 是否在加载完成后随即播放音频                                                                                                                   |
| toggleMode              | `boolean`                                         | `true`                                                                                      | 是否可以 从迷你模式 切换到 完整模式 , 或者 完整模式 切换到 迷你模式                                                                            |
| drag                    | `boolean`                                         | `true`                                                                                      | 当播放器是迷你模式时 是否可以对其进行拖拽                                                                                                      |
| seeked                  | `boolean`                                         | `true`                                                                                      | 是否能拖动或点击进度条 调整播放进度                                                                                                            |
| showMiniModeCover       | `boolean`                                         | `true`                                                                                      | 在迷你模式时, 是否显示 封面图                                                                                                                  |
| showMiniProcessBar      | `boolean`                                         | `false`                                                                                     | 在迷你模式时, 是否显示 圆形进度条                                                                                                              |
| showProgressLoadBar     | `boolean`                                         | `true`                                                                                      | 显示音频加载进度条                                                                                                                             |
| showPlay                | `boolean`                                         | `true`                                                                                      | 是否显示播放按钮                                                                                                                               |
| showReload              | `boolean`                                         | `true`                                                                                      | 是否显示重放按钮                                                                                                                               |
| showDownload            | `boolean`                                         | `true`                                                                                      | 是否显示下载按钮                                                                                                                               |
| showPlayMode            | `boolean`                                         | `true`                                                                                      | 是否显示切换播放模式按钮                                                                                                                       |
| showThemeSwitch         | `boolean`                                         | `true`                                                                                      | 是否显示主题切换开关                                                                                                                           |
| extendsContent          | `array`                                           | `-`                                                                                         | 如果默认的功能按钮不满足你 你可以自定义扩展 比如 `[<button>按钮1</button>,<button>按钮2</button>]`                                             |
| controllerTitle         | `string | ReactNode`                              | `<FaHeadphones/>`                                                                           | 播放器模拟模式封面显示的文字                                                                                                                   |
| defaultVolume           | `number`                                          | `100`                                                                                       | 播放器初始音量, 范围 `0`-`100`                                                                                                                 |
| loadAudioErrorPlayNext  | `number`                                          | `100`                                                                                       | 当前音频加载加载失败时是否尝试播放下一首                                                                                                       |
| onAudioDownload         | `function(audioInfo)`                             | `-`                                                                                         | 音频下载 的 钩子函数                                                                                                                           |
| onAudioPlay             | `function(audioInfo)`                             | `-`                                                                                         | 音频播放 的 钩子函数                                                                                                                           |
| onAudioPause            | `function(audioInfo)`                             | `-`                                                                                         | 音频暂停 的 钩子函数                                                                                                                           |
| onAudioSeeked           | `function(audioInfo)`                             | `-`                                                                                         | 进度条被点击或者拖动改变播放进度的 钩子函数                                                                                                    |
| onAudioVolumeChange     | `function(audioInfo)`                             | `-`                                                                                         | 音量改变的 钩子函数 范围 `0.0`-`1.0`                                                                                                           |
| onAudioEnded            | `function(audioInfo)`                             | `-`                                                                                         | 当前音频播放结束的 钩子函数                                                                                                                    |
| onAudioAbort            | `function(audioInfo)`                             | `-`                                                                                         | 当前音频播放中断的 钩子函数                                                                                                                    |
| onAudioProgress         | `function(audioInfo)`                             | `-`                                                                                         | 音频正在播放中的 钩子函数                                                                                                                      |
| onAudioLoadError        | `function(audioInfo)`                             | `-`                                                                                         | 音频播放失败的 钩子函数                                                                                                                        |
| onAudioReload           | `function(audioInfo)`                             | `-`                                                                                         | 音频重新播放的 钩子函数                                                                                                                        |
| onAudioListsChange      | `function(currentPlayIndex,audioLists,audioInfo)` | `-`                                                                                         | 播放列表发生改变时的 钩子函数                                                                                                                  |
| onAudioPlayTrackChange  | `function(currentPlayIndex,audioLists,audioInfo)` | `-`                                                                                         | 当前播放的音乐发生改变时的 钩子函数                                                                                                            |
| onAudioPlayModeChange   | `function(playMode)`                              | `-`                                                                                         | 播放模式发生改变时的 钩子函数                                                                                                                  |
| onAudioListsPanelChange | `function(panelVisible)`                          | `-`                                                                                         | 播放列表打开或关闭的 钩子函数                                                                                                                  |
| onThemeChange           | `function(theme)`                                 | `-`                                                                                         | 主题切换后的 钩子函数                                                                                                                          |
| onModeChange            | `function(mode)`                                  | `-`                                                                                         | 模式切换发生改变时的 钩子函数                                                                                                                  |
| onAudioListsDragEnd     | `function(fromIndex,toIndex)`                     | `-`                                                                                         | 列表歌曲拖拽后 钩子函数                                                                                                                        |
| onAudioLyricChange      | `function(lineNum, currentLyric)`                 | `-`                                                                                         | 当前播放的歌词改变回调                                                                                                                         |
| getContainer            | `() => HTMLElement` \| ` Selectors `              | `document.body`                                                                             | 播放器挂载的节点 默认在 body                                                                                                                   |
| getAudioInstance        | `(instance: HTMLAudioElement) => void`            | `-`                                                                                         | 获取原始的 audio 实例, 可以用它所有的 api 做你想做的事情                                                                                       |
| autoHiddenCover         | `boolean`                                         | `false`                                                                                     | 当前歌曲没有封面图时是否不渲染对应的 dom 节点                                                                                                  |



## 开发

```
git clone https://github.com/lijinke666/react-music-player.git
yarn | npm install
yarn start | npm start
访问 `http://localhost:8081/`
```

## 单元测试

```
npm run test
```

## 音乐列表 数据结构

> Like This

```ts
interface ReactJkMusicPlayerAudioList {
  name: string | React.ReactNode,
  singer?: string | React.ReactNode,
  cover: string,
  musicSrc: string | () => Promise<string>,
  lyric?: string,
}>
```

## 返回的音乐信息

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
}
```

## 参数

```ts
interface ReactJkMusicPlayerProps {
  audioLists: Array<ReactJkMusicPlayerAudioList>,
  theme?: ReactJkMusicPlayerTheme,
  mode?: ReactJkMusicPlayerMode,
  defaultPlayMode?: ReactJkMusicPlayerPlayMode
  drag?: boolean,
  seeked?: boolean,
  autoPlay?: boolean,
  playModeText?: {
    order: string | React.ReactNode,
    orderLoop: string | React.ReactNode,
    singleLoop: string | React.ReactNode,
    shufflePlay: string | React.ReactNode
  },
  panelTitle?: string | React.ReactNode,
  closeText?: string | React.ReactNode,
  openText?: string | React.ReactNode,
  notContentText?: string | React.ReactNode,
  controllerTitle?: string | React.ReactNode,
  defaultPosition?: {
    top: number | string,
    left: number | string,
    right: number | string,
    bottom: number | string
  },
  onAudioPlay?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onAudioPause?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onAudioEnded?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onAudioAbort?: (data: any) => void,
  onAudioVolumeChange?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onAudioLoadError?: (data: any) => void,
  onAudioProgress?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onAudioSeeked?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onAudioDownload?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onAudioReload?: (audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onThemeChange?: (theme: ReactJkMusicPlayerTheme) => void,
  onAudioListsChange?: (currentPlayId: string, audioLists: Array<ReactJkMusicPlayerAudioList>, audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  onPlayModeChange?: (playMode: ReactJkMusicPlayerPlayMode) => void,
  onModeChange?: (mode: ReactJkMusicPlayerMode) => void,
  onAudioListsPanelChange?: (panelVisible: boolean) => void,
  onAudioPlayTrackChange?: (fromIndex: number, endIndex: number) => void,
  onAudioListsDragEnd?: (currentPlayId: string, audioLists: Array<ReactJkMusicPlayerAudioList>, audioInfo: ReactJkMusicPlayerAudioInfo) => void,
  showDownload?: boolean,
  showPlay?: boolean,
  showReload?: boolean,
  showPlayMode?: boolean,
  showThemeSwitch?: boolean,
  showMiniModeCover?: boolean,
  toggleMode?: boolean,
  once?: boolean,
  extendsContent?: Array<React.ReactNode | string>,
  checkedText?: string | React.ReactNode,
  unCheckedText?: string | React.ReactNode,
  defaultVolume?: number,
  playModeShowTime?: number,
  bounds?: string | React.ReactNode,
  showMiniProcessBar?: boolean,
  loadAudioErrorPlayNext?: boolean,
  preload?: boolean | "auto" | "metadata" | "none",
  glassBg?: boolean,
  remember?: boolean,
  remove?: boolean,
  defaultPlayIndex?: number,
  playIndex?: number,
  lyricClassName?: string,
  emptyLyricPlaceholder?: string | React.ReactNode,
  showLyric?: boolean,
  getContainer?: () => HTMLElement
  getAudioInstance?: (instance: HTMLAudioElement) => void
  autoHiddenCover?: boolean
}
```

## 许可证

[MIT](https://github.com/lijinke666/react-music-player/blob/master/LICENCE)
