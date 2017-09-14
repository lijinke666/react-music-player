# react-jinke-music-player
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/react-jinke-music-player)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/react-jinke-music-player)
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://www.npmjs.com/package/react-jinke-music-player)
> 一个漂亮的响应式 React HTML5 音频播放器


[English Doc](https://github.com/lijinke666/react-jinke-music-player/blob/master/README.md)
## 预览

![gif](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/example.gif) <br/>

> 白天主题 <br/>

![lightTheme](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/light-theme.png)

> 夜晚主题  <br/>

![darkTheme](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/dark-theme.png)

## 安装
```
npm install react-jinke-music-player --save
```

## 例子
> 在线例子 :  [https://lijinke666.github.io/react-jinke-music-player/](https://lijinke666.github.io/react-jinke-music-player/)


## 开发
```
git clone https://github.com/lijinke666/react-jinke-music-player.git
npm install
npm start
```

## 参数 & 使用

```jsx
import React from "react"
import ReactDOM from "react-dom"
import ReactJkMusicPlayer from "react-jinke-music-player"
import FaHeadphones from "react-icons/lib/fa/headphones"

const options = {
    //播放器的主题,可选 白天 和 黑夜 两种主题    [ type `string: 'light' or 'drak'  ` default 'drak' ]
    theme:"drak",
    
    //播放器的初始位置 绝对定位 的 top 和left 值   [ type `Object` default '{top:0,left:0}' ]
    defaultPosition:{
        top:120,
        left:120
    },

    //播放器控制器 自定义 打开 文字  [ type `String | ReactNode` default 'open']
    openText: "OPEN",

    //播放器控制器 自定义 关闭 文字  [ type `String | ReactNode` default 'close']
    closeText: "CLOSE",

    //播放器主题开关 自定义 选中 文字  [ type `String | ReactNode` default '-']
    checkedText:"开",

    //播放器主题开关 自定义 未选中 文字 [ type `String | ReactNode` default '-']
    unCheckedText:"关",

    //播放器的模式 迷你(mini) 或者 完整 (full) [type `String`  default `mini`]  
    mode: "mini",

    //当播放器是迷你模式时  是否可以对其进行拖拽 [type `String`  default `true`]
    drag: true,


    //播放器控制器的文字 [type `String | ReactNode`  default <FaHeadphones/>]
    controllerTitle: <FaHeadphones />,


    //是否显示播放按钮  [type `Boolean` default `true`]
    showPlay: true,

    //是否显示重放按钮  [type `Boolean` default `true`]
    showReload: true,

    //是否显示下载按钮   [type `Boolean` default `true`]
    showDowload: true,

    //是否显示主题切换开关  [type `Boolean` default `true`]
    showThemeSwitch:true,

    //音频下载 触发函数 返回 当前音频名字 和 路径
    audioDowload(audioName, audioSrc) {
        console.log('audio dowload', audioName, audioSrc);
    },

    //音频播放 触发函数 返回 音频 当前播放时长 和 总时长
    audioPlay(currentTime, duration) {
        console.log('audio playing', currentTime, duration);
    },

    //音频暂停 触发函数 返回 音频 当前播放时长 和 总时长
    audioPause(currentTime, duration) {
        console.log('audio pause', currentTime, duration);
    },

    //音频拖动 触发函数 返回 音频 当前播放时长 和 总时长
    autdioSeeked(currentTime, duration) {
        console.log('audio seeked', currentTime, duration);
    },

    //当前音频结束播放 触发函数 返回 当前音频 总时长
    audioEnded(duration) {
        console.log('audio ended', duration);
    },

    //音频播放进度 返回当前当前音频播放时长 和总时长
    audioProgress(currentTime, duration) {
        console.log('audio progress',currentTime,duration);
    },

    //音频加载失败 触发函数
    loadAudioError(e) {
        console.log('audio load err', e);
    }
}

const Demo = () => (
    <ReactJkMusicPlayer {...options} />
)
ReactDOM.render(
    <Demo />,
    document.getElementById('root')
)



```
