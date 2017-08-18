# React-Jk-Music-Player
react music player component 

## Installation
```
npm install react-jinke-music-player --save
```

## Example
### [LIVE DEMO](https://lijinke666.github.io/React-Jk-Music-Player/)
```
git clone https://github.com/lijinke666/React-Jk-Music-Player.git
```

- `yarn`
- `npm run demo`   run example

## Options

```javascript
import React from "react"
import ReactDOM from "react-dom"
import ReactJkMusicPlayer from "react-jinke-music-player"
import FaHeadphones from "react-icons/lib/fa/headphones"

const options = {
    //audio controller open text  [ type `String` default 'open']
    openText:"OPEN",           

    //audio controller close text  [ type `String` default 'close']
    closeText:"CLOSE",       

    //audio mode        mini | full          [type `String`  default `mini`]  
    mode:"mini"   ,            

    //audio name     [type `String`  default `name`]
    name:"music Name"  ,       

    //audio controller title [type `String | ReactNode`  default <FaHeadphones/>]
    controllerTitle: <FaHeadphones/>, 

    //audio cover    [type `String`  default `-`]
    cover: "http://www.thailandballoonfestival.com/tibf2013/images/HugoSlider1.jpg",    

    //audio path     [type `String`  default `-`]   
    musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3", 
    
    //audio play handle
    audioPlay(currentTime,duration){
        console.log(currentTime,duration);
    },

    //audio pause handle
    audioPause(currentTime,duration){
        console.log(currentTime,duration);
    },

    //audio ended handle
    audioEnded(duration){
        console.log(duration);
    },

    //audio play progress handle
    audioProgress(currentTime,duration){
        console.log(currentTime,duration);
    },
    
    //audio load faild error handle
    loadAudioError(e){
        console.log('err',e);
    }
}

const Demo = ()=>(
    <ReactJkMusicPlayer {...options}/>
)
ReactDOM.render(
    <Demo/>,
    document.getElementById('root')
)

```

###  Because the first time the NPM package is formatted for reference  https://github.com/smronju/React-Music-Player

##### Thank you here
