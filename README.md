# react-jinke-music-player

[![npm](https://img.shields.io/npm/dm/react-jinke-music-player.svg?style=flat-square)](https://www.npmjs.com/package/react-jinke-music-player)
[![npm](https://img.shields.io/npm/l/react-jinke-music-player.svg?style=flat-square)](https://www.npmjs.com/package/react-jinke-music-player)
[![Build Status](https://travis-ci.org/lijinke666/react-music-player.svg?branch=master)](https://travis-ci.org/lijinke666/react-music-player)
[![npm version](https://img.shields.io/npm/v/react-jinke-music-player.svg?style=flat-square)](https://badge.fury.io/js/react-jinke-music-player)
[![Coverage Status](https://coveralls.io/repos/github/lijinke666/react-music-player/badge.svg?branch=master)](https://coveralls.io/github/lijinke666/react-music-player?branch=master)
[![Dependency Status](https://beta.gemnasium.com/badges/github.com/lijinke666/react-music-player.svg?style=flat-square)](https://beta.gemnasium.com/projects/github.com/lijinke666/react-music-player)
[![jest](https://facebook.github.io/jest/img/jest-badge.svg)](https://github.com/facebook/jest)

:musical_note: Maybe the best beautiful HTML5 responsive player component for react :)

[中文文档](https://github.com/lijinke666/react-music-player/blob/master/CN.md)

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

> live example : [https://lijinke666.github.io/react-music-player/](https://lijinke666.github.io/react-music-player/)

> practical application : [Jinke.Li's House](http://www.lijinke.cn/)

> local example : [http://localhost:8081/](http://localhost:8081/)

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

| Name              | Type                  | Default           | Description |
| ------------ | ------- | ------- | ----------- |
| className         | `string`              | `-`               | Additional CSS class for the root DOM node                                                                                           |
| audioLists        | `string[]`            | `-`               | audio lists model : {name: "YOUR_AUDIO_NAME",singer: "YOUR_AUDIO_SINGER_NAME",cover: "YOUR_AUDIO_COVER",musicSrc: "YOUR_AUDIO_SRC"}  |
| theme             | `string`              | `dark`            | color of the music player theme  `dark` | `light`                                                                                                    |
| defaultPosition   | `object`              | `{top:0,left:0}`  | audio controller initial position with `left,top,right,and bottom` |
| playModeText | `object` | {order: "order",orderLoop: "orderLoop",singleLoop: "singleLoop",shufflePlay:"shufflePlay"}` | play mode text config of the audio player |
| playModeShowTime          | `number`  | `600`            |  play mode toggle show time (ms) |
| bounds          | `object` | `number`  | `body`            |  specifies movement boundaries. Accepted values:  `parent` restricts movement within the node's offsetParent    (nearest node with position relative or absolute), or a selector, restricts movement within the targeted node An object with `left, top, right, and bottom` properties. These indicate how far in each direction the draggable can be moved. |
| preload          | `boolean | string`  | `false`            |  Whether to load audio immediately after the page loads. can be set to `auto|metadata|none` `true|false` if `preload=true` preload="auto" |
| openText          | `string`  | `open`            | audio controller open text  |
| closeText         | `string`  | `close`           | audio controller close text |
| panelTitle        | `string`  | `PlayList`        | audio list panel title |
| notContentText    | `string`  | `no music`        | audio list panel show text of the playlist has no songs  |
| checkedText       | `string`  | `-`               | audio theme switch checkedText    |
| unCheckedText     | `string`  | `-`               | audio theme switch unCheckedText  |
| defaultPlayMode   | `string`              | `order`           | default play mode of the audio player options can be set to `order`,`orderLoop`,`singleLoop`,`shufflePlay` or omitted                |
| mode              | `string`              | `mini`            | audio theme switch checkedText can be set to `mini`,`full` or omitted  |
| once              | `boolean`             | `false`           | The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true' |
| autoPlay          | `boolean`             | `true`            | Whether the audio is played after loading is completed.  |
| toggleMode        | `boolean`             | `true`            | Whether you can switch between two modes, full => mini or mini => full   |                                                                                           
| drag              | `boolean`             | `true`            | audio controller is can be drag of the "mini" mode   |
| seeked            | `boolean`             | `true`            | Whether you can drag or click the progress bar to play in the new progress.  |
| showMiniModeCover | `boolean`             | `true`            | audio cover is show of the "mini" mode |
| showMiniProcessBar | `boolean`             | `false`            | audio progress circle bar is show of the "mini" mode |
| showProgressLoadBar | `boolean`             | `true`            | Displays the audio load progress bar. |
| showPlay | `boolean`             | `true`            | play button display of the audio player panel |
| showReload | `boolean`             | `true`            | reload button display of the audio player panel  |
| showDownload | `boolean`             | `true`            | download button display of the audio player panel  |
| showPlayMode | `boolean`             | `true`            | play mode toggle button display of the audio player panel |
| showThemeSwitch | `boolean`             | `true`            | theme toggle switch display of the audio player panel |
| extendsContent | `array`             | `-`            | Extensible custom content like `[<button>button1</button>,<button>button2</button>]` |
| controllerTitle | `string`             | `<FaHeadphones/>`            | audio controller title |
| defaultVolume | `number`             | `100`            | default volume of the audio player , range `0`-`100` |
| loadAudioErrorPlayNext | `boolean`             | `true`            | Whether to try playing the next audio when the current audio playback fails |
| audioDownload | `function(audioInfo)` | `-`            | audio is downloaded handle |
| audioPlay     | `function(audioInfo)` | `-`            | audio play handle |
| audioPause    | `function(audioInfo)` | `-`          | audio pause handle |
| audioSeeked   | `function(audioInfo)` | `-`          | When the user has moved/jumped to a new location in audio handle |
| audioVolumeChange   | `function(audioInfo)` | `-`          |  When the volume has changed handle min = 0.0 max = 1.0  |
| audioEnded   | `function(audioInfo)` | `-`          |  The single song is ended handle |
| audioAbort   | `function(audioInfo)` | `-`          |  audio load abort The target event like {...,audioName:xx,audioSrc:xx,playMode:xx}|
| audioProgress   | `function(audioInfo)` | `-`          |  audio play progress handle |
| loadAudioError   | `function(audioInfo)` | `-`          |  audio load failed error handle |


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

## License

[MIT](https://github.com/lijinke666/react-music-player/blob/master/LICENCE)
