# react-jinke-music-player

[![npm](https://img.shields.io/npm/dm/react-jinke-music-player.svg?style=flat-square)](https://www.npmjs.com/package/react-jinke-music-player)
[![npm](https://img.shields.io/npm/l/react-jinke-music-player.svg?style=flat-square)](https://www.npmjs.com/package/react-jinke-music-player)
[![Build Status](https://travis-ci.org/lijinke666/react-music-player.svg?branch=master)](https://travis-ci.org/lijinke666/react-music-player)
[![npm version](https://img.shields.io/npm/v/react-jinke-music-player.svg?style=flat-square)](https://badge.fury.io/js/react-jinke-music-player)
[![Coverage Status](https://coveralls.io/repos/github/lijinke666/react-music-player/badge.svg?branch=master)](https://coveralls.io/github/lijinke666/react-music-player?branch=master)
[![Dependency Status](https://beta.gemnasium.com/badges/github.com/lijinke666/react-music-player.svg?style=flat-square)](https://beta.gemnasium.com/projects/github.com/lijinke666/react-music-player)
[![jest](https://facebook.github.io/jest/img/jest-badge.svg)](https://github.com/facebook/jest)

:musical_note: 也许是颜值最高,最好用的一个响应式 React HTML5 音频播放器组件

[English Doc](https://github.com/lijinke666/react-music-player/blob/master/README.md)

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

| 属性                | 类型                  | 默认值                                                                                                           | 说明                                                                                                                                           |
| ------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| className           | `string`              | `-`                                                                                                              | 附加的 className                                                                                                                               |
| audioLists          | `string[]`            | `-`                                                                                                              | 播放列表 : {name: "YOUR_AUDIO_NAME",singer: "YOUR_AUDIO_SINGER_NAME",cover: "YOUR_AUDIO_COVER",musicSrc: "YOUR_AUDIO_SRC"}                     |
| theme               | `string`              | `dark`                                                                                                           | 播放器主题 可选 'light'(白天) 和 'dark'(黑夜) 两种                                                                                             |
| defaultPosition     | `object`              | `{top:0,left:0}`                                                                                                 | 当播放器是迷你模式时的初始位 比如 {top:0,left:0} or {top:'20%',left:"20%"}                                                                     |
| playModeText        | `object`              | {order: "order",orderLoop: "orderLoop",singleLoop: "singleLoop",shufflePlay:"shufflePlay"}` | 播放模式对应的文字 |
| playModeShowTime          | `number`  | `600`            |  切换播放模式时提示语的显示时间,单位毫秒 |
| bounds          | `object` | `string`  | `body`            |  拖拽边界 可以是一个具体的字符串,比如 `body`,也可以是具体的值 `left,top,right,bottom`|
| preload          | `boolean | string`  | `false`            |  是否在页面加载后立即加载音频。可选值 `auto|metadata|none` `true|false` 如果 `preload=true` 默认会 设置 preload="auto" |
| openText            | `string | ReactNode`  | `open`                                                                                                           | 迷你模式时播放器的打开文案                                                                                                                     |
| closeText           | `string | ReactNode`  | `close`                                                                                                          | 迷你模式时播放器的关闭文案                                                                                                                     |
| panelTitle          | `string | ReactNode`  | `PlayList`                                                                                                       | 播放列表显示的标题                                                                                                                             |
| notContentText      | `string | ReactNode`  | `no music`                                                                                                       | 播放列表为空时显示的文字                                                                                                                       |
| checkedText         | `string | ReactNode`  | `-`                                                                                                              | 播放器主题开关 选中的文字                                                                                                                      |
| unCheckedText       | `string | ReactNode`  | `-`                                                                                                              | 播放器主题开关 未选中的文字                                                                                                                    |
| defaultPlayMode     | `string`              | `order`                                                                                                          | 默认的播放模式 可选 `order`,`orderLoop`,`singleLoop`,`shufflePlay`                                                                             |
| mode                | `string`              | `mini`                                                                                                           | 播放器的默认模式 可选 `mini`,`full`                                                                                                            |
| once                | `boolean`             | `false`                                                                                                          | 在默认情况下 'audioPlay' 函数 会在你 每次暂停后再次播放 触发 , 如果 你只想 让 'audioPlay' 在 音乐初始化播放的时候触发一次,你可以设置 为 `true` |
| autoPlay            | `boolean`             | `true`                                                                                                           | 是否在加载完成后随即播放音频                                                                                                                   |
| toggleMode          | `boolean`             | `true`                                                                                                           | 是否可以 从迷你模式 切换到 完整模式 , 或者 完整模式 切换到 迷你模式                                                                            |
| drag                | `boolean`             | `true`                                                                                                           | 当播放器是迷你模式时 是否可以对其进行拖拽                                                                                                      |
| seeked              | `boolean`             | `true`                                                                                                           | 是否能拖动或点击进度条 调整播放进度                                                                                                            |
| showMiniModeCover   | `boolean`             | `true`                                                                                                           | 在迷你模式时, 是否显示 封面图                                                                                                                  |
| showMiniProcessBar   | `boolean`             | `false`                                                                                                           | 在迷你模式时, 是否显示 圆形进度条                                                                                                                |
| showProgressLoadBar | `boolean`             | `true`                                                                                                           | 显示音频加载进度条                                                                                                                             |
| showPlay            | `boolean`             | `true`                                                                                                           | 是否显示播放按钮                                                                                                                               |
| showReload          | `boolean`             | `true`                                                                                                           | 是否显示重放按钮                                                                                                                               |
| showDownload        | `boolean`             | `true`                                                                                                           | 是否显示下载按钮                                                                                                                               |
| showPlayMode        | `boolean`             | `true`                                                                                                           | 是否显示切换播放模式按钮                                                                                                                       |
| showThemeSwitch     | `boolean`             | `true`                                                                                                           | 是否显示主题切换开关                                                                                                                           |
| extendsContent      | `array`               | `-`                                                                                                              | 如果默认的功能按钮不满足你 你可以自定义扩展 比如 `[<button>按钮1</button>,<button>按钮2</button>]`                                             |
| controllerTitle     | `string | ReactNode`  | `<FaHeadphones/>`                                                                                                | 播放器模拟模式封面显示的文字                                                                                                                   |
| defaultVolume       | `number`              | `100`                                                                                                            | 播放器初始音量, 范围 `0`-`100`                                                                                                                 |
| loadAudioErrorPlayNext       | `number`              | `100`                                                                                                            | 当前音频加载加载失败时是否尝试播放下一首                                                                                                              |
| audioDownload       | `function(audioInfo)` | `-`                                                                                                              | 音频下载 的 handler                                                                                                                            |
| audioPlay           | `function(audioInfo)` | `-`                                                                                                              | 音频播放 的 handler                                                                                                                            |
| audioPause          | `function(audioInfo)` | `-`                                                                                                              | 音频暂停 的 handler                                                                                                                            |
| audioSeeked         | `function(audioInfo)` | `-`                                                                                                              | 进度条被点击或者拖动改变播放进度的 handler                                                                                                     |
| audioVolumeChange   | `function(audioInfo)` | `-`                                                                                                              | 音量改变的 handler 范围 `0.0`-`1.0`                                                                                                            |
| audioEnded          | `function(audioInfo)` | `-`                                                                                                              | 当前音频播放结束的 handler                                                                                                                     |
| audioAbort          | `function(audioInfo)` | `-`                                                                                                              | 当前音频播放中断的 handler                                                                                                                     |
| audioProgress       | `function(audioInfo)` | `-`                                                                                                              | 音频正在播放中的 handler                                                                                                                       |
| loadAudioError      | `function(audioInfo)` | `-`                                                                                                              | 音频播放失败的 handler                                                                                                                         |

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
    seeked: PropTypes.bool,
    autoPlay: PropTypes.bool,
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
    showProgressLoadBar:PropTypes.bool,
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
    defaultVolume:PropTypes.number,
    playModeShowTime: PropTypes.number,
    bounds: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    showMiniProcessBar: PropTypes.bool,
    loadAudioErrorPlayNext: PropTypes.bool,
    preload: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(["auto", "metadata", "none"])
    ])
  }
```

## 许可证

[MIT](https://github.com/lijinke666/react-music-player/blob/master/LICENCE)
