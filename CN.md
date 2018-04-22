# react-jinke-music-player

[![npm](https://img.shields.io/npm/dm/react-jinke-music-player.svg?style=flat-square)](https://www.npmjs.com/package/react-jinke-music-player)
[![npm](https://img.shields.io/npm/l/react-jinke-music-player.svg?style=flat-square)](https://www.npmjs.com/package/react-jinke-music-player)
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg?style=flat-square)](https://www.npmjs.com/package/react-jinke-music-player)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?style=flat-square)](https://github.com/facebook/jest)
[![Coverage Status](https://coveralls.io/repos/github/lijinke666/react-music-player/badge.svg?branch=master?style=flat-square)](https://coveralls.io/github/lijinke666/react-music-player?branch=master)
[![npm version](https://badge.fury.io/js/react-jinke-music-player.svg?style=flat-square)](https://badge.fury.io/js/react-jinke-music-player)

也许是最好的一个漂亮的响应式 React HTML5 音频播放器

[English Doc](https://github.com/lijinke666/react-music-player/blob/master/README.md)

## 安装

```
npm install react-jinke-music-player --save
```

## 预览

> 白天主题 <br/>

![lightTheme](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/light-theme.png)

> 夜晚主题 <br/>

![darkTheme](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/dark-theme.png)

![mobile](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/mobile.jpg)

## 例子

> 在线例子 : [https://lijinke666.github.io/react-music-player/](https://lijinke666.github.io/react-music-player/)

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

## 参数

```js
import FaHeadphones from "react-icons/lib/fa/headphones";

const options = {
  /**
   * @description 播放列表
   * @param {Array} audioLists
   * @param {String | ReactNode } audioLists.name  音乐名 [ 必填 ]
   * @param {String | ReactNode } audioLists.singer  歌手名  [ 非必填 ]
   * @param {String } audioLists.cover  封面图  [ 必填 ]
   * @param {String } audioLists.musicSrc  音乐文件地址  [ 必填 ]
   * @required true
   */
  audioLists: [
    {
      name: "YOUR_AUDIO_NAME",
      singer: "YOUR_AUDIO_SINGER_NAME",
      cover: "YOUR_AUDIO_COVER",
      musicSrc: "YOUR_AUDIO_SRC"
    }
  ],

  /**
   * @description 播放器主题 可选 'light'(白天) 和 'dark'(黑夜) 两种
   * @param {String} theme 'light' | 'dark'
   * @default 'dark'
   * @required false
   */
  theme: "dark",

  /**
   * @description 当播放器是迷你模式时的初始位置
   * @param {Object} defaultPosition
   * @param {Number | String } defaultPosition.top   
   * @param {Number | String } defaultPosition.left
   * @default {top:0,left:0}
   * @required false
   * 比如 
   * {top:0,left:0} or  {top:'20%',left:"20%"}
   */
  defaultPosition: {
    top: 120,
    left: 120
  },

  /**
   * @description 播放模式对应的文字
   * @param {Object} playModeText
   * @param {String } playModeText.order        顺序播放
   * @param {String } playModeText.orderLoop    列表循环
   * @param {String } playModeText.singleLoop   单曲循环
   * @param {String } playModeText.shufflePlay  随机播放
   * @default {order:"order",orderLoop:"orderLoop",singleLoop:"singleLoop",shufflePlay:"shufflePlay"}
   * @required false
   */
  playModeText: {
    order: "顺序播放",
    orderLoop: "列表循环",
    singleLoop: "单曲循环",
    shufflePlay: "随机播放"
  },

  /**
   * @description 迷你模式时播放器的打开文案
   * @param {String | ReactNode} openText
   * @default 'open'
   * @required false
   */
  openText: "打开",

  /**
   * @description 迷你模式时播放器的关闭文案
   * @param {String | ReactNode} closeText
   * @default 'close'
   * @required false
   */
  closeText: "关闭",

  /**
   * @description 播放列表显示的标题
   * @param {String | ReactNode} panelTitle
   * @default 'PlayList'
   * @required false
   */
  panelTitle: "播放列表",

  /**
   * @description 播放列表为空时显示的文字
   * @param {String | ReactNode} notContentText
   * @default 'no music'
   * @required false
   */
  notContentText: "没有音乐",

  /**
   * @description 播放器主题开关 选中的文字
   * @param {String | ReactNode} checkedText
   * @default '--'
   * @required false
   */
  checkedText: "",

  /**
   * @description 播放器主题开关 未选中的文字
   * @param {String | ReactNode} unCheckedText
   * @default '--'
   * @required false
   */
  unCheckedText: "",

  /**
   * @description 默认的播放模式
   * @param {String} defaultPlayMode
   * @default 'order'
   * @required false
   */
  defaultPlayMode: "order",

  /**
   * @description 播放器的默认模式
   * @param {String} mode 'mini'(迷你) | 'full'(完整)
   * @default 'mini'
   * @required false
   */
  mode: "mini",

  /**
   * @description 在默认情况下 'audioPlay' 函数 会在你 每次暂停后再次播放  触发 , 如果 你只想 让 'audioPlay' 在 音乐初始化播放的时候触发一次,你可以设置 为 `true`
   * @param {Boolean} once 是否只触发一次
   * @default 'false'
   * @required false
   */
  once: false,

  /**
   * @description 是否可以 从迷你模式 切换到 完整模式 , 或者 完整模式 切换到 迷你模式
   * @param {Boolean} toggleMode
   * @default 'true'
   * @required false
   */
  toggleMode: true,

  /**
   * @description 在迷你模式时, 是否显示 封面图
   * @param {Boolean} showMiniModeCover
   * @default 'true'
   * @required false
   */
  showMiniModeCover: true,

  /**
   * @description 当播放器是迷你模式时  是否可以对其进行拖拽
   * @param {Boolean} drag
   * @default 'true'
   * @required false
   */
  drag: true,

  /**
   * @description 播放器控制器的文字
   * @param {String | ReactNode} controllerTitle
   * @default '<FaHeadphones/>'
   * @required false
   */
  controllerTitle: <FaHeadphones />,

  /**
   * @description 是否显示播放按钮
   * @param {Boolean} showPlay
   * @default 'true'
   * @required false
   */
  showPlay: true,

  /**
   * @description 是否显示重放按钮
   * @param {Boolean} showReload
   * @default 'true'
   * @required false
   */
  showReload: true,

  /**
   * @description 是否显示下载按钮 
   * @param {Boolean} showDownload
   * @default 'true'
   * @required false
   */
  showDownload: true,

  /**
   * @description 是否显示播放模式 按钮
   * @param {Boolean} showPlayMode
   * @default 'true'
   * @required false
   */
  showPlayMode: true,

  /**
   * @description 是否显示主题切换开关
   * @param {Boolean} showThemeSwitch
   * @default 'true'
   * @required false
   */
  showThemeSwitch: true,

  /**
   * @description 如果默认的功能按钮不满足你 你可以自定义扩展
   * @param {Array} extendsContent
   * @default '[]'
   * @required false
   * 比如
   * extendsContent:[
   *    <button>按钮1</button>,
   *    <button>按钮2</button>
   * ]
   */
  extendsContent: [],

  /**
   * @description 播放器初始音量
   * @param {Number} defaultVolume  range 0-100
   * @default '100'
   * @required false
   */
  defaultVolume: 100,

  //音频下载 触发 返回 音频信息
  audioDownload(audioInfo) {
    console.log("audio download", audioInfo);
  },

  //音频播放触发 返回 音频信息
  audioPlay(audioInfo) {
    console.log("audio playing", audioInfo);
  },

  //音频暂停触发 返回 音频信息
  audioPause(audioInfo) {
    console.log("audio pause", audioInfo);
  },

  //音频拖动 触发函数 返回 音频信息
  audioSeeked(audioInfo) {
    console.log("audio seeked", audioInfo);
  },

  //当前音频结束播放触发 返回音频信息
  audioEnded(audioInfo) {
    console.log("audio ended", audioInfo);
  },

  //音频正在播放中 触发 返回音频信息
  audioProgress(audioInfo) {
    console.log("audio progress", audioInfo);
  },

  //音频加载失败 触发
  loadAudioError(e) {
    console.log("audio load err", e);
  }
};

const Demo = () => <ReactJkMusicPlayer {...options} />;
ReactDOM.render(<Demo />, document.getElementById("root"));
```

## 开发

```
git clone https://github.com/lijinke666/react-music-player.git
npm install
npm start
```

## 单元测试

```
npm run test
```

## AudioInfo 返回参数

```js
{
    cover:"xx.jpg"
    currentTime:10.211519
    duration:164.211519
    musicSrc:"xx.mp3"
    name:"Canon (piano version)"     //音乐名
    volume:100,      //当前音量
    muted:false,     //是否静音
    networkState:1,  //当前网络状态
    readyState:4,    //当前就绪状态
    paused:false,    //是否暂停
    ended:false,     //是否结束
    startDate:null,  //当前时间偏移的 Date 对象
    played:{length:1}     //已播放部分的 TimeRanges 对象
}
```

## 参数属性

```jsx
  static propTypes = {
    audioLists: PropTypes.array.isRequired,
    theme: PropTypes.oneOf(['dark', 'light']),
    mode: PropTypes.oneOf(['mini', 'full']),
    drag: PropTypes.bool,
    playModeText: PropTypes.object,
    closeText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    openText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    panelTitle:PropTypes.string,
    notContentText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    controllerTitle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    defaultPosition: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number
    }),
    audioPlay: PropTypes.func,
    audioPause: PropTypes.func,
    audioEnded: PropTypes.func,
    audioAbort: PropTypes.func,
    audioVolumeChange: PropTypes.func,
    loadAudioError: PropTypes.func,
    audioProgress: PropTypes.func,
    audioSeeked: PropTypes.func,
    audioDownload: PropTypes.func,
    showDownload: PropTypes.bool,
    showPlay: PropTypes.bool,
    showReload: PropTypes.bool,
    showPlayMode: PropTypes.bool,
    showThemeSwitch: PropTypes.bool,
    showMiniModeCover: PropTypes.bool,
    toggleMode: PropTypes.bool,
    once: PropTypes.bool,
    extendsContent: PropTypes.array,
    checkedText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    unCheckedText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    defaultVolume:PropTypes.number
  }
```

## 许可证

[MIT](https://github.com/lijinke666/react-music-player/blob/master/LICENCE)
