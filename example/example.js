import React from "react"
import ReactDOM from "react-dom"
import ReactJkMusicPlayer from "../src"
import Message from "rc-message"
import FaHeadphones from "react-icons/lib/fa/headphones"

import "./example.less"

const options = {
    audioLists:[{
        name:"Canon (piano version)",
        cover:"http://img2.kuwo.cn/star/starheads/120/26/82/544626559.jpg",
        musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3"
    },{
        name:"aaaaa",
        cover:"http://p1.music.126.net/0TcWI1dFAC1tG_bC621mKQ==/18922595114347800.jpg?param=140y140",
        musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3"
    },{
        name:"bbbbbbbbbbb",
        cover:"http://p1.music.126.net/0TcWI1dFAC1tG_bC621mKQ==/18922595114347800.jpg?param=140y140",
        musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3"
    },{
        name:"ccccccccc",
        cover:"http://p1.music.126.net/0TcWI1dFAC1tG_bC621mKQ==/18922595114347800.jpg?param=140y140",
        musicSrc:"http://sc1.111ttt.com/2017/1/05/09/298092204432.mp3"
    },{
        name:"ddddddddd",
        cover:"http://p1.music.126.net/0TcWI1dFAC1tG_bC621mKQ==/18922595114347800.jpg?param=140y140",
        musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3"
    },{
        name:"eeeeeeee",
        cover:"http://p1.music.126.net/0TcWI1dFAC1tG_bC621mKQ==/18922595114347800.jpg?param=140y140",
        musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3"
    },{
        name:"是对方的说法",
        cover:"http://p1.music.126.net/0TcWI1dFAC1tG_bC621mKQ==/18922595114347800.jpg?param=140y140",
        musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3"
    },{
        name:"阿斯蒂芬的",
        cover:"http://p1.music.126.net/0TcWI1dFAC1tG_bC621mKQ==/18922595114347800.jpg?param=140y140",
        musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3"
    },{
        name:"啊啊",
        cover:"http://p1.music.126.net/0TcWI1dFAC1tG_bC621mKQ==/18922595114347800.jpg?param=140y140",
        musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3"
    },{
        name:"sfsfsfsf",
        cover:"http://p1.music.126.net/0TcWI1dFAC1tG_bC621mKQ==/18922595114347800.jpg?param=140y140",
        musicSrc:"http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3"
    }],
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
    musicSrc: "",

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
        Message.success({ content: audioName })
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
        Message.info({ content: "Music is over!" })
        console.log('audio ended', duration);
    },

    //audio play progress handle
    audioProgress(currentTime, duration) {
        // console.log('audio progress',currentTime,duration);
    },

    //audio load faild error handle
    loadAudioError(e) {
        Message.error({ content: "audio load error" })
        console.log('audio load err', e);
    }
}

const Demo = () => (
    <div>
        <h2 className="example-title">Click or Drag to try</h2>
        <ReactJkMusicPlayer {...options} />
    </div>
)
ReactDOM.render(
    <Demo />,
    document.getElementById('root')
)
