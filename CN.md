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
  <a href="https://github.com/lijinke666/react-music-player/actions">
    <img src="https://github.com/lijinke666/react-music-player/workflows/Node%20CI/badge.svg" />
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
import React from 'react'
import ReactDOM from 'react-dom'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

ReactDOM.render(
  <ReactJkMusicPlayer {...options} />,
  document.getElementById('root'),
)
```

## API

> 中文版本文档可能不完整, 请以英文版为准, 维护两个版本太累了

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| className | `string` | `-` | 附加的 className |
| audioLists | `object[]` | `-` | 播放列表 : {name: "YOUR_AUDIO_NAME",singer: "YOUR_AUDIO_SINGER_NAME",cover: "YOUR_AUDIO_COVER",musicSrc: "YOUR_AUDIO_SRC"} |
| theme | `string` | `dark` | 播放器主题 可选 'light'(白天) 和 'dark'(黑夜) 两种 |
| defaultPosition | `object` | `{top:0,left:0}` | 当播放器是迷你模式时的初始位 比如 {top:0,left:0} or {top:'20%',left:"20%"} |
| playModeText | `object` | {order: "order",orderLoop: "orderLoop",singleLoop: "singleLoop",shufflePlay:"shufflePlay"}` | 播放模式对应的文字 |
| playModeShowTime | `number` | `600` | 切换播放模式时提示语的显示时间,单位毫秒 |
| bounds | `object`,`string` | `body` | 拖拽边界 可以是一个具体的字符串,比如 `body`,也可以是具体的值 `left,top,right,bottom` |
| preload | `boolean`,`string` | `false` | 是否在页面加载后立即加载音频。可选值 `auto | metadata | none` `true | false`如果`preload=true` 默认会 设置 preload="auto" |
| remember | `boolean` | `false` | 是否记住当前播放状态,比如音量,播放状态,下次访问时继续播放 |
| glassBg | `boolean` | `false` | 是否显示毛玻璃背景效果 |
| remove | `boolean` | `true` | 音乐是否可以被删除 |
| defaultPlayIndex | `number` | `0` | 默认从第几首歌开始播放, 当值 超过 或低于 可播放数 默认为最大播放数 和 最小播放数 |
| openText | `string \| ReactNode` | `open` | 迷你模式时播放器的打开文案 |
| closeText | `string \| ReactNode` | `close` | 迷你模式时播放器的关闭文案 |
| panelTitle | `string \| ReactNode` | `PlayList` | 播放列表显示的标题 |
| emptyText | `string \| ReactNode` | `no music` | 播放列表为空时显示的文字 |
| checkedText | `string \| ReactNode` | `-` | 播放器主题开关 选中的文字 |
| unCheckedText | `string \| ReactNode` | `-` | 播放器主题开关 未选中的文字 |
| defaultPlayMode | `string` | `order` | 默认的播放模式 可选 `order`,`orderLoop`,`singleLoop`,`shufflePlay` |
| mode | `string` | `mini` | 播放器的默认模式 可选 `mini`,`full` |
| once | `boolean` | `false` | 在默认情况下 'audioPlay' 函数 会在你 每次暂停后再次播放 触发 , 如果 你只想 让 'audioPlay' 在 音乐初始化播放的时候触发一次,你可以设置 为 `true` |
| autoPlay | `boolean` | `true` | 是否在加载完成后随即播放音频 |
| toggleMode | `boolean` | `true` | 是否可以 从迷你模式 切换到 完整模式 , 或者 完整模式 切换到 迷你模式 |
| drag | `boolean` | `true` | 当播放器是迷你模式时 是否可以对其进行拖拽 |
| seeked | `boolean` | `true` | 是否能拖动或点击进度条 调整播放进度 |
| showMiniModeCover | `boolean` | `true` | 在迷你模式时, 是否显示 封面图 |
| showMiniProcessBar | `boolean` | `false` | 在迷你模式时, 是否显示 圆形进度条 |
| showProgressLoadBar | `boolean` | `true` | 显示音频加载进度条 |
| showPlay | `boolean` | `true` | 是否显示播放按钮 |
| showReload | `boolean` | `true` | 是否显示重放按钮 |
| showDownload | `boolean` | `true` | 是否显示下载按钮 |
| showPlayMode | `boolean` | `true` | 是否显示切换播放模式按钮 |
| showThemeSwitch | `boolean` | `true` | 是否显示主题切换开关 |
| extendsContent | `array \| ReactNode \| string \| boolean` | `-` | 如果默认的功能按钮不满足你 你可以自定义扩展 比如 `<><button>按钮1</button> <button>按钮2</button></>` |
| controllerTitle | `string \| ReactNode` | `<FaHeadphones/>` | 播放器模拟模式封面显示的文字 |
| defaultVolume | `number` | `1` | 播放器初始音量, 范围 `0`-`1` |
| loadAudioErrorPlayNext | `number` | `true` | 当前音频加载加载失败时是否尝试播放下一首 |
| onAudioDownload | `function(audioInfo)` | `-` | 音频下载 的 钩子函数 |
| onAudioPlay | `function(audioInfo)` | `-` | 音频播放 的 钩子函数 |
| onAudioPause | `function(audioInfo)` | `-` | 音频暂停 的 钩子函数 |
| onAudioSeeked | `function(audioInfo)` | `-` | 进度条被点击或者拖动改变播放进度的 钩子函数 |
| onAudioVolumeChange | `function(volume)` | `-` | 音量改变的 钩子函数 范围 `0.0`-`1.0` |
| onAudioEnded | `function(currentPlayId,audioLists,audioInfo)` | `-` | 当前音频播放结束的 钩子函数 |
| onAudioAbort | `function(currentPlayId,audioLists,audioInfo)` | `-` | 当前音频播放中断的 钩子函数 |
| onAudioProgress | `function(audioInfo)` | `-` | 音频正在播放中的 钩子函数 |
| onAudioError | `function(errMsg,currentPlayId,audioLists,audioInfo)` | `-` | 音频播放失败的 钩子函数 |
| onAudioReload | `function(audioInfo)` | `-` | 音频重新播放的 钩子函数 |
| onAudioListsChange | `function(currentPlayId,audioLists,audioInfo)` | `-` | 播放列表发生改变时的 钩子函数 |
| onAudioPlayTrackChange | `function(currentPlayId,audioLists,audioInfo)` | `-` | 当前播放的音乐发生改变时的 钩子函数 |
| onAudioPlayModeChange | `function(playMode)` | `-` | 播放模式发生改变时的 钩子函数 |
| onAudioListsPanelChange | `function(panelVisible)` | `-` | 播放列表打开或关闭的 钩子函数 |
| onThemeChange | `function(theme)` | `-` | 主题切换后的 钩子函数 |
| onModeChange | `function(mode)` | `-` | 模式切换发生改变时的 钩子函数 |
| onAudioListsSortEnd | `function(fromIndex,toIndex)` | `-` | 列表歌曲拖拽后 钩子函数 |
| onAudioLyricChange | `function(lineNum, currentLyric)` | `-` | 当前播放的歌词改变回调 |
| getContainer | `() => HTMLElement` \| `Selectors` | `document.body` | 播放器挂载的节点 默认在 body |
| getAudioInstance | `(instance: HTMLAudioElement) => void` | `-` | 获取原始的 audio 实例, 可以用它所有的 api 做你想做的事情 |
| autoHiddenCover | `boolean` | `false` | 当前歌曲没有封面图时是否不渲染对应的 dom 节点 |
| onBeforeAudioDownload | `(audioInfo: ReactJkMusicPlayerAudioInfo) => Promise<TransformedDownloadAudioInfo>` | `-` | 转换下载歌曲的文件名,路径等 |
| clearPriorAudioLists | `boolean` | `false` | 更新歌曲列表时, 是否清除之前的列表 |
| autoPlayInitLoadPlayList | `boolean` | `false` | 歌曲列表更新后, 是否自动播放 |
| spaceBar | `boolean` | `false` | 是否可以通过空格键控制音乐的播放与暂停 |
| showDestroy | `boolean` | `false` | 是否显示销毁按钮 |
| onBeforeDestroy | `function(currentPlayId,audioLists,audioInfo)` | `-` | 销毁之前处理函数 |
| onDestroyed | `function(currentPlayId,audioLists,audioInfo)` | `-` | 销毁之后的回调 |
| customDownloader | `function(downloadInfo: TransformedDownloadAudioInfo)` | `-` | 自定义下载器 |
| audioTitle | `string \| (audioInfo: ReactJkMusicPlayerAudioInfo) => string` | `{name} - {signer}` | 自定义音乐显示名称, 默认歌曲名-歌手 |

## 自定义操作按钮

如果播放器自带的功能不能满足你的需求, 可以自己实现操作按钮 UI, 会同步播放器对应的状态, 并触发钩子函数, 支持功能:

- `播放`
- `暂停`
- `重新播放`
- `改变当前播放位置`
- `改变播放倍速`
- `改变音量`
- `销毁播放器`

```jsx
class App extends React.Component {
  constructor() {
    this.audioInstance = null
  }
  render() {
    return (
      <>
        <ReactJkMusicPlayer
          getAudioInstance={(instance) => (this.audioInstance = instance)}
        />
        <button onClick={() => this.audioInstance.play()}>播放</button>
        <button onClick={() => this.audioInstance.pause()}>暂停</button>
        <button onClick={() => this.audioInstance.load()}>重新播放</button>
        <button onClick={() => (this.audioInstance.currentTime = 40)}>
          改变当前播放位置
        </button>
        <button onClick={() => (this.audioInstance.playbackRate = 2)}>
          改变播放倍速
        </button>
        <button onClick={() => (this.audioInstance.volume = 0.2)}>
          改变音量
        </button>
        <button onClick={() => this.audioInstance.destroy()}>销毁播放器</button>
      </>
    )
  }
}
```

## 毛玻璃效果

```jsx
<ReactJkMusicPlayer glassBg />
```

![glass-1](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/glass-1.png)

![glass-2](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/glass-2.png)

## 自定义下载器

> eg. <https://www.npmjs.com/package/file-saver>

```jsx
const customDownloader = (downloadInfo) => {
  const link = document.createElement('a')
  link.href = downloadInfo.src // a.mp3
  link.download = downloadInfo.filename || 'test'
  document.body.appendChild(link)
  link.click()
}
;<ReactJkMusicPlayer
  audioLists={[{ src: 'a.mp3' }]}
  customDownloader={customDownloader}
/>

// 配合 onBeforeAudioDownload 使用
const onBeforeAudioDownload = () => {
  return Promise.resolve({
    src: '1.mp3',
  })
}

const customDownloader = (downloadInfo) => {
  console.log(downloadInfo.src) // 1.mp3
}
;<ReactJkMusicPlayer customDownloader={customDownloader} />
```

## 关闭/销毁 播放器

```jsx
const onBeforeDestroy = (currentPlayId, audioLists, audioInfo) => {
  return new Promise((resolve, reject) => {
    // 返回一个 Promise, 这里可以做一些自定义的校验
    if (window.confirm('是否关闭?')) {
      // 调用 resolve, 播放器正常关闭/销毁
      resolve()
    } else {
      // 调用 reject, 本次操作无效.
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
  />,
)
```

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
  lyric?: string
  [key: string]: any
}>
```

## 返回的音乐信息

> Like This

```ts
interface ReactJkMusicPlayerAudioInfo {
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
```

## 参数

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
  emptyText?: string | React.ReactNode
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
    audioLists: Array<ReactJkMusicPlayerAudioList>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void
  onAudioAbort?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioList>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void
  onAudioVolumeChange?: (volume: number) => void
  onAudioError?: (
    errMsg: any,
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioList>,
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
    audioLists: Array<ReactJkMusicPlayerAudioList>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => void
  onPlayModeChange?: (playMode: ReactJkMusicPlayerPlayMode) => void
  onModeChange?: (mode: ReactJkMusicPlayerMode) => void
  onAudioListsPanelChange?: (panelVisible: boolean) => void
  onAudioPlayTrackChange?: (fromIndex: number, endIndex: number) => void
  onAudioListsSortEnd?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioList>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
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
    | Array<React.ReactNode | string>
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
  emptyLyricText?: string | React.ReactNode
  showLyric?: boolean
  getContainer?: () => HTMLElement
  getAudioInstance?: (instance: HTMLAudioElement) => void
  autoHiddenCover?: boolean
  onBeforeAudioDownload?: (
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => Promise<TransformedDownloadAudioInfo>
  clearPriorAudioLists?: boolean
  autoPlayInitLoadPlayList?: boolean
  spaceBar?: boolean
  onBeforeDestroy?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioList>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
  ) => Promise<void>
  onDestroyed?: (
    currentPlayId: string,
    audioLists: Array<ReactJkMusicPlayerAudioList>,
    audioInfo: ReactJkMusicPlayerAudioInfo,
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

## 许可证

[MIT](https://github.com/lijinke666/react-music-player/blob/master/LICENCE)
