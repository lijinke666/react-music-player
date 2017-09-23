# react-jinke-music-player
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/react-jinke-music-player)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/react-jinke-music-player)
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://www.npmjs.com/package/react-jinke-music-player)
> 也许是最好的一个漂亮的响应式 React HTML5 音频播放器


[English Doc](https://github.com/lijinke666/react-jinke-music-player/blob/master/README.md)

## 安装
```
npm install react-jinke-music-player --save
```

## 预览

![gif](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/example.gif) <br/>

> 白天主题 <br/>

![lightTheme](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/light-theme.png)


> 夜晚主题  <br/>

![darkTheme](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/dark-theme.png)


![mobile](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/mobile.jpg)

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
    /**
        音乐列表
        name 歌曲名字 必填
        singer 歌手名字 非必填
        cover 封面图 必填
        musicSrc 歌曲路径 必填
    */
    audioLists:[{
        name:"Canon (piano version)",
        singer:"未知",
        cover:"http://img2.kuwo.cn/star/starheads/120/26/82/544626559.jpg",
        musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3"
    }],


    //播放器的主题,可选 白天 和 黑夜 两种主题    [ type `string: 'light' or 'drak'  ` default 'drak' ]
    theme:"drak",
    
    //播放器的初始位置 绝对定位 的 top 和left 值   [ type `Object` default '{top:0,left:0}' ]
    defaultPosition:{
        top:120,
        left:120
    },

    //播放模式 自定义文字
    playModeText: {
        order: "顺序播放",
        orderLoop: "列表循环",
        singleLoop: "单曲循环",
        shufflePlay: "随机播放"
    },

    //默认播放模式 选项 'order' 'orderLoop' 'singleLoop' 'shufflePlay'
    defaultPlayMode:"order",

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

    //是否可以 从迷你模式 切换到 完整模式 , 或者 完整模式 切换到 迷你模式 [type `String` default 'true']
    toggleMode:true,

    //在迷你模式时, 是否显示 封面图  [type `Boolean` default 'true']
    showMiniModeCover:true,

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

    //是否显示播放模式 按钮  [type `Boolean` default `treu`]
    showPlayMode: true,

    //音频下载 触发 返回 音频信息
    audioDowload(audioInfo) {
        console.log('audio dowload', audioInfo);
    },

    //音频播放触发 返回 音频信息
    audioPlay(audioInfo) {
        console.log('audio playing', audioInfo);
    },

    //音频暂停触发 返回 音频信息
    audioPause(audioInfo) {
        console.log('audio pause', audioInfo);
    },

    //音频拖动 触发函数 返回 音频信息
    autdioSeeked(audioInfo) {
        console.log('audio seeked', audioInfo);
    },

    //当前音频结束播放触发 返回音频信息
    audioEnded(audioInfo) {
        console.log('audio ended', audioInfo);
    },

    //音频正在播放中 触发 返回音频信息
    audioProgress(audioInfo) {
        console.log('audio progress',audioInfo);
    },

    //音频加载失败 触发
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

## AudioInfo 返回参数
```js
{
    cover:"http://img2.kuwo.cn/star/starheads/120/26/82/544626559.jpg"   //封面图
    currentTime:10.211519                                                //当前播放时长
    duration:164.211519                                                  //歌曲总时长
    musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?  tflag=1502850639pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3" //歌曲链接
    name:"Canon (piano version)"                                                //歌曲名
    volume:100                                                                  //当前音量
}
```

## 参数属性

```jsx
  static PropTypes = {
    audioLists: PropTypes.array.isRequired,
    theme: PropTypes.oneOf(['dark', 'light']),
    mode: PropTypes.oneOf(['mini', 'full']),
    drag: PropTypes.bool,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    cover: PropTypes.string.isRequired,
    musicSrc: PropTypes.string.isRequired,
    playModeText: PropTypes.object,
    closeText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    openText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    notContentText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    controllerTitle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    defaultPosition: PropTypes.object,
    audioPlay: PropTypes.func,
    audioPause: PropTypes.func,
    audioEnded: PropTypes.func,
    audioAbort: PropTypes.func,
    audioVolumeChange: PropTypes.func,
    loadAudioError: PropTypes.func,
    audioProgress: PropTypes.func,
    autdioSeeked: PropTypes.func,
    audioDowload: PropTypes.func,
    showDowload: PropTypes.bool,
    showPlay: PropTypes.bool,
    showReload: PropTypes.bool,
    showPlayMode: PropTypes.bool,
    showThemeSwitch: PropTypes.bool,
    showMiniModeCover: PropTypes.bool,
    toggleMode: PropTypes.bool,
    checkedText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    unCheckedText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  }
```


## 许可证
[MIT](https://github.com/lijinke666/react-jinke-music-player/blob/master/LICENCE)
