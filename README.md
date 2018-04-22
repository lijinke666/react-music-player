# react-jinke-music-player

[![npm](https://img.shields.io/npm/dm/react-jinke-music-player.svg?style=flat-square)](https://www.npmjs.com/package/react-jinke-music-player)
[![npm](https://img.shields.io/npm/l/react-jinke-music-player.svg?style=flat-square)](https://www.npmjs.com/package/react-jinke-music-player)
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg?style=flat-square)](https://www.npmjs.com/package/react-jinke-music-player)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?style=flat-square)](https://github.com/facebook/jest)
[![Coverage Status](https://coveralls.io/repos/github/lijinke666/react-music-player/badge.svg?branch=master)](https://coveralls.io/github/lijinke666/react-music-player?branch=master)
[![npm version](https://badge.fury.io/js/react-jinke-music-player.svg?style=flat-square)](https://badge.fury.io/js/react-jinke-music-player)

Maybe the best beautiful HTML5 responsive player component for react :)

[中文文档](https://github.com/lijinke666/react-music-player/blob/master/CN.md)

## Installation

```
npm install react-jinke-music-player --save
```

## Screenshots

> Light Theme <br/>

![lightTheme](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/light-theme.png)

> Dark Theme <br/>

![darkTheme](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/dark-theme.png)

![mobile](https://github.com/lijinke666/react-music-player/blob/master/assetsImg/mobile.jpg)

## Example

> ONLINE example : [https://lijinke666.github.io/react-music-player/](https://lijinke666.github.io/react-music-player/)

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

## Options

```js
import FaHeadphones from "react-icons/lib/fa/headphones";

const options = {
  /**
   * @description audio lists model
   * @param {Array} audioLists
   * @param {String | ReactNode } audioLists.name  audio name  [ required ]
   * @param {String | ReactNode } audioLists.singer  singer name of the playing song  [ not required ]
   * @param {String } audioLists.cover  audio cover  [ required ]
   * @param {String } audioLists.musicSrc  audio music source  [ required ]
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
   * @description color of the music player theme
   * @param {String} theme 'light' | 'dark'
   * @default 'dark'
   * @required false
   */
  theme: "dark",

  /**
   * @description audio controller initial position
   * @param {Object} defaultPosition
   * @param {Number | String } defaultPosition.top  
   * @param {Number | String } defaultPosition.left 
   * @default {top:0,left:0}
   * @required false
   * like 
   * {top:0,left:0} or  {top:'20%',left:"20%"}
   */
  defaultPosition: {
    top: 120,
    left: 120
  },

  /**
   * @description play mode text config of the audio player
   * @param {Object} playModeText
   * @param {String } playModeText.order
   * @param {String } playModeText.orderLoop
   * @param {String } playModeText.singleLoop
   * @param {String } playModeText.shufflePlay
   * @default {order:"order",orderLoop:"orderLoop",singleLoop:"singleLoop",shufflePlay:"shufflePlay"}
   * @required false
   */
  playModeText: {
    order: "order",
    orderLoop: "orderLoop",
    singleLoop: "singleLoop",
    shufflePlay: "shufflePlay"
  },

  /**
   * @description audio controller open text
   * @param {String | ReactNode} openText
   * @default 'open'
   * @required false
   */
  openText: "open",

  /**
   * @description audio controller close text
   * @param {String | ReactNode} closeText
   * @default 'close'
   * @required false
   */
  closeText: "close",

  /**
   * @description audio list panel title
   * @param {String | ReactNode} panelTitle
   * @default 'PlayList'
   * @required false
   */
  panelTitle: "PlayList",

  /**
   * @description audio list panel show text of the playlist has no songs
   * @param {String | ReactNode} notContentText
   * @default 'no music'
   * @required false
   */
  notContentText: "no music",

  /**
   * @description audio theme switch checkedText
   * @param {String | ReactNode} checkedText
   * @default '--'
   * @required false
   */
  checkedText: "",

  /**
   * @description audio theme switch unCheckedText
   * @param {String | ReactNode} unCheckedText
   * @default '--'
   * @required false
   */
  unCheckedText: "",

  /**
   * @description default play mode of the audio player options
   * @param {String} defaultPlayMode
   * @default 'order'
   * @required false
   */
  defaultPlayMode: "order",

  /**
   * @description audio mode
   * @param {String} mode 'mini' | 'full'
   * @default 'mini'
   * @required false
   */
  mode: "mini",

  /**
   * @description The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
   * @param {Boolean} once 
   * @default 'false'
   * @required false
   */
  once: false,

  /**
   * @description Whether you can switch between two modes, full => mini  or mini => full 
   * @param {Boolean} toggleMode
   * @default 'true'
   * @required false
   */
  toggleMode: true,

  /**
   * @description audio cover is show of the "mini" mode
   * @param {Boolean} showMiniModeCover
   * @default 'true'
   * @required false
   */
  showMiniModeCover: true,

  /**
   * @description audio controller is can be drag of the "mini" mode 
   * @param {Boolean} drag
   * @default 'true'
   * @required false
   */
  drag: true,

  /**
   * @description audio controller title
   * @param {String | ReactNode} controllerTitle
   * @default '<FaHeadphones/>'
   * @required false
   */
  controllerTitle: <FaHeadphones />,

  /**
   * @description play button display of the audio player panel
   * @param {Boolean} showPlay
   * @default 'true'
   * @required false
   */
  showPlay: true,

  /**
   * @description reload button display of the audio player panel
   * @param {Boolean} showReload
   * @default 'true'
   * @required false
   */
  showReload: true,

  /**
   * @description download button display of the audio player panel 
   * @param {Boolean} showDownload
   * @default 'true'
   * @required false
   */
  showDownload: true,

  /**
   * @description loop button display of the audio player panel
   * @param {Boolean} showPlayMode
   * @default 'true'
   * @required false
   */
  showPlayMode: true,

  /**
   * @description theme toggle switch  display of the audio player panel 
   * @param {Boolean} showThemeSwitch
   * @default 'true'
   * @required false
   */
  showThemeSwitch: true,

  /**
   * @description Extensible custom content 
   * @param {Array} extendsContent
   * @default '[]'
   * @required false
   * like this
   * extendsContent:[
   *    <button>button1</button>,
   *    <button>button2</button>
   * ]
   */
  extendsContent: [],

  /**
   * @description default volume of the audio player
   * @param {Number} defaultVolume  range 0-100
   * @default '100'
   * @required false
   */
  defaultVolume: 100,

  //Music is downloaded handle
  audioDownload(audioInfo) {
    console.log("audio download", audioInfo);
  },

  //audio play handle
  audioPlay(audioInfo) {
    console.log("audio playing", audioInfo);
  },

  //audio pause handle
  audioPause(audioInfo) {
    console.log("audio pause", audioInfo);
  },

  //When the user has moved/jumped to a new location in audio
  audioSeeked(audioInfo) {
    console.log("audio seeked", audioInfo);
  },

  //When the volume has changed  min = 0.0  max = 1.0
  audioVolumeChange(currentVolume) {
    console.log("audio volume change", currentVolume);
  },

  //The single song is ended handle
  audioEnded(audioInfo) {
    console.log("audio ended", audioInfo);
  },

  //audio load abort The target event like {...,audioName:xx,audioSrc:xx,playMode:xx}
  audioAbort(e) {
    console.log("audio abort", e);
  },

  //audio play progress handle
  audioProgress(audioInfo) {
    console.log("audio progress", audioInfo);
  },

  //audio load failed error handle
  loadAudioError(e) {
    console.log("audio load err", e);
  }
};
```

## Development

```
git clone https://github.com/lijinke666/react-music-player.git
npm install
npm start
```

## Test case

```
npm run test
```

## AudioInfo

> Like This

```js
{
    cover:"xx.jpg"
    currentTime:10.211519
    duration:164.211519
    musicSrc:"xx.mp3"
    name:"Canon (piano version)"
    volume:100,
    muted:false,
    networkState:1,
    readyState:4,
    paused:false,
    ended:false,
    startDate:null,
    played:{length:1}
}
```

## Properties

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

## License

[MIT](https://github.com/lijinke666/react-music-player/blob/master/LICENCE)
