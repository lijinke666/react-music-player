# react-jinke-music-player
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/react-jinke-music-player)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/react-jinke-music-player)
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://www.npmjs.com/package/react-jinke-music-player)
> Maybe a must beautiful and responsive react music player component :)


[中文文档](https://github.com/lijinke666/react-jinke-music-player/blob/master/CN.md)

## Installation
```
npm install react-jinke-music-player --save
```

## Screenshots

![gif](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/example.gif) <br/>

> Light Theme <br/>

![lightTheme](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/light-theme.png)

> Dark Theme  <br/>

![darkTheme](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/dark-theme.png)


![mobile](https://github.com/lijinke666/react-jinke-music-player/blob/master/assets/mobile.jpg)


## Example
> ONLINE example :  [https://lijinke666.github.io/react-jinke-music-player/](https://lijinke666.github.io/react-jinke-music-player/)


## Development
```
git clone https://github.com/lijinke666/react-jinke-music-player.git
npm install
npm start
```

## Options & Usage

```jsx
import React from "react"
import ReactDOM from "react-dom"
import ReactJkMusicPlayer from "react-jinke-music-player"
import FaHeadphones from "react-icons/lib/fa/headphones"

const options = {
    //audio lists model
    audioLists:[{
        name:"Canon (piano version)",
        singer:"未知",
        cover:"http://img2.kuwo.cn/star/starheads/120/26/82/544626559.jpg",
        musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3"
    },{
        name:"胆小鬼",
        singer:"梁咏琪",
        cover:"http://p3.music.126.net/OLroXJamq8uM44u1Jawpyw==/51677046522535.jpg?param=177y177",
        musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101640205.m4a?tflag=1506065899&pin=ff429b7ee5e0d36bb527c286ef8b09d6&ip=218.88.22.24#.mp3"
    },{
        name:"Beautiful",
        singer:"Chrisina Aguilera",
        cover:"http://p3.music.126.net/biJeqQZ5niniD7Va2w-LHA==/109951163028526512.jpg?param=200y200",
        musicSrc:"http://other.web.ra01.sycdn.kuwo.cn/de37dfd72c9fb9bf7de1a0f9a7fc2c4c/59c4bbc4/resource/n2/320/94/4/1498621112.mp3"
    },{
        name:"悟空",
        singer:"戴荃",
        cover:"http://p4.music.126.net/gn4pPKc_Wk3EyByfi86lUQ==/3333719255417035.jpg?param=177y177",
        musicSrc:"http://mp3.henduoge.com/s/2017-09-22/1506047726.mp3"
    }],

    //color of the music player theme    [ type `string: 'light' or 'drak'  ` default 'drak' ]
    theme:"drak",
    
    //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
    defaultPosition:{
        top:120,
        left:120
    },

    //play mode text config of the audio player
    playModeText: {
        order: "顺序播放",
        orderLoop: "列表循环",
        singleLoop: "单曲循环",
        shufflePlay: "随机播放"
    },

    //audio controller open text  [ type `String | ReactNode` default 'open']
    openText: "OPEN",

    //audio controller close text  [ type `String | ReactNode` default 'close']
    closeText: "CLOSE",

    //audio theme switch checkedText  [ type `String | ReactNode` default '-']
    checkedText:"开",

    //audio theme switch unCheckedText [ type `String | ReactNode` default '-']
    unCheckedText:"关",

    defaultPlayMode:"order",

    //audio mode        mini | full          [type `String`  default `mini`]  
    mode: "mini",

    //Whether you can switch between two modes, full => mini  or mini => full   [type 'Bollean' default 'true']
    toggleMode:true,

    //audio cover is show of the "mini" mode [type `Boolean` default 'true']
    showMiniModeCover:true,

    //audio controller is can be drag of the "mini" mode     [type `Boolean` default `true`]
    drag: true,

    //audio controller title [type `String | ReactNode`  default <FaHeadphones/>]
    controllerTitle: <FaHeadphones />,

    //play button display of the audio player panel   [type `Boolean` default `true`]
    showPlay: true,

    //reload button display of the audio player panel   [type `Boolean` default `true`]
    showReload: true,

    //dowload button display of the audio player panel   [type `Boolean` default `true`]
    showDowload: true,

    //loop button display of the audio player panel   [type `Boolean` default `true`]
    showPlayMode: true,

    //theme toogle switch  display of the audio player panel   [type `Boolean` default `true`]
    showThemeSwitch:true,

    //Music is downloaded handle
    audioDowload(audioInfo) {
        console.log('audio dowload', audioInfo);
    },

    //audio play handle
    audioPlay(audioInfo) {
        console.log('audio playing', audioInfo);
    },

    //audio pause handle
    audioPause(audioInfo) {
        console.log('audio pause', audioInfo);
    },

    //When the user has moved/jumped to a new location in audio
    autdioSeeked(audioInfo) {
        console.log('audio seeked', audioInfo);
    },
    
    //When the volume has changed  min = 0.0  max = 1.0
    audioVolumeChange(currentVolume){
        console.log('audio volume change',currentVolume);
    },

    //The single song is ended handle
    audioEnded(audioInfo) {
        console.log('audio ended', audioInfo);
    },

    //audio load abort The target event like {...,audioName:xx,audioSrc:xx,playMode:xx}
    audioAbort(e){
        console.log('audio abort',e);
    },

    //audio play progress handle
    audioProgress(audioInfo) {
        console.log('audio progress',audioInfo);
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

## AudioInfo
> Like This
```js
{
    cover:"http://img2.kuwo.cn/star/starheads/120/26/82/544626559.jpg"
    currentTime:10.211519
    duration:164.211519
    musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3"
    name:"Canon (piano version)"
    volume:100
}
```

## Properties

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


## License
[MIT](https://github.com/lijinke666/react-jinke-music-player/blob/master/LICENCE)
