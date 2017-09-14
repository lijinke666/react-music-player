# react-jinke-music-player
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/react-jinke-music-player)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/react-jinke-music-player)
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://www.npmjs.com/package/react-jinke-music-player)
> A beautiful and responsive react music player component :)


[中文文档](https://github.com/lijinke666/react-jinke-music-player/blob/master/CN.md)
## Screenshots

![gif](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/example.gif) <br/>

> Light Theme <br/>

![lightTheme](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/light-theme.png)

> Dark Theme  <br/>

![darkTheme](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/dark-theme.png)

## Installation
```
npm install react-jinke-music-player --save
```

## Example
> ONLINE example :  [https://lijinke666.github.io/react-jinke-music-player/](https://lijinke666.github.io/react-jinke-music-player/)


## Development
```
git clone https://github.com/lijinke666/react-jinke-music-player.git
npm install
npm start
```

## Options

```jsx
import React from "react"
import ReactDOM from "react-dom"
import ReactJkMusicPlayer from "react-jinke-music-player"
import FaHeadphones from "react-icons/lib/fa/headphones"

const options = {
    //color of the music player theme    [ type `string: 'light' or 'drak'  ` default 'drak' ]
    theme:"drak",
    
    //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
    defaultPosition:{
        top:120,
        left:120
    },

    //audio controller open text  [ type `String | ReactNode` default 'open']
    openText: "OPEN",

    //audio controller close text  [ type `String | ReactNode` default 'close']
    closeText: "CLOSE",

    //audio theme switch checkedText  [ type `String | ReactNode` default '-']
    checkedText:"开",

    //audio theme switch unCheckedText [ type `String | ReactNode` default '-']
    unCheckedText:"关",

    //audio mode        mini | full          [type `String`  default `mini`]  
    mode: "mini",

    //audio controller is can be drag of the "mini" mode
    drag: true,

    //audio name     [type `String | ReactNode `  default `name`]
    name: "Canon (piano version)",

    //audio controller title [type `String | ReactNode`  default <FaHeadphones/>]
    controllerTitle: <FaHeadphones />,

    //audio cover    [type `String`  default `-`]
    cover: "http://img2.kuwo.cn/star/starheads/120/26/82/544626559.jpg",

    //audio path     [type `String`  default `-`]   
    musicSrc: "http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3",

    //play button display of the audio player panel   [type `Boolean` default `true`]
    showPlay: true,

    //reload button display of the audio player panel   [type `Boolean` default `true`]
    showReload: true,

    //dowload button display of the audio player panel   [type `Boolean` default `true`]
    showDowload: true,

    //loop button display of the audio player panel   [type `Boolean` default `true`]
    showLoop: true,

    //theme toogle switch  display of the audio player panel   [type `Boolean` default `true`]
    showThemeSwitch:true,

    //Music is downloaded handle
    audioDowload(audioName, audioSrc) {
        console.log('audio dowload', audioName, audioSrc);
    },

    //audio play handle
    audioPlay(currentTime, duration) {
        console.log('audio playing', currentTime, duration);
    },

    //audio pause handle
    audioPause(currentTime, duration) {
        console.log('audio pause', currentTime, duration);
    },

    //When the user has moved/jumped to a new location in audio
    autdioSeeked(currentTime, duration) {
        console.log('audio seeked', currentTime, duration);
    },

    //audio ended handle
    audioEnded(duration) {
        console.log('audio ended', duration);
    },

    //audio play progress handle
    audioProgress(currentTime, duration) {
        console.log('audio progress',currentTime,duration);
    },

    //audio load faild error handle
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
