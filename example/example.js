import React from "react"
import ReactDOM from "react-dom"
import ReactJkMusicPlayer from "../src"
import Message from "rc-message"
import FaHeadphones from "react-icons/lib/fa/headphones"

import "../src/index.less"
import "./example.less"

const options = {
    //audio lists model
    audioLists: [{
        name: "Canon (piano version)",
        singer: "未知",
        cover: "http://img2.kuwo.cn/star/starheads/120/26/82/544626559.jpg",
        musicSrc: "http://so1.111ttt.com:8282/2016/1/12m/10/205101300290.m4a?tflag=1502850639&pin=13888f2d75f5f6229a8a3e818f09d195&ip=118.116.109.58#.mp3"
    }, {
        name: "胆小鬼",
        singer: "梁咏琪",
        cover: "http://p3.music.126.net/OLroXJamq8uM44u1Jawpyw==/51677046522535.jpg?param=177y177",
        musicSrc: "http://so1.111ttt.com:8282/2016/1/12m/10/205101640205.m4a?tflag=1506065899&pin=ff429b7ee5e0d36bb527c286ef8b09d6&ip=218.88.22.24#.mp3"
    }, {
        name: "Beautiful",
        singer: "Chrisina Aguilera",
        cover: "http://p3.music.126.net/biJeqQZ5niniD7Va2w-LHA==/109951163028526512.jpg?param=200y200",
        musicSrc: "http://so1.111ttt.com:8282/2017/4/05m/10/298101104389.m4a?tflag=1506098533&pin=3e6a002582055ad2041fde2beaf23cee&ip=222.209.158.174#.mp3"
    }, {
        name: "悟空",
        singer: "戴荃",
        cover: "http://p4.music.126.net/gn4pPKc_Wk3EyByfi86lUQ==/3333719255417035.jpg?param=177y177",
        musicSrc: "http://mp3.henduoge.com/s/2017-09-22/1506047726.mp3"
    }],

    //color of the music player theme    [ type `string: 'light' or 'drak'  ` default 'drak' ]
    theme: "drak",

    //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
    defaultPosition: {
        top: 120,
        left: 120
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
    checkedText: "开",

    //audio theme switch unCheckedText [ type `String | ReactNode` default '-']
    unCheckedText: "关",

    defaultPlayMode: "order",

    //audio mode        mini | full          [type `String`  default `mini`]  
    mode: "mini",

    /**
     * [ type `Boolean` default 'false' ]
     * The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
     */
    once: true,

    //Whether you can switch between two modes, full => mini  or mini => full   [type 'Bollean' default 'true']
    toggleMode: true,

    //audio cover is show of the "mini" mode [type `Boolean` default 'true']
    showMiniModeCover: true,

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
    showThemeSwitch: true,

    //Extensible custom content       [type 'Array' default '[]' ]
    extendsContent: [],

    //Music is downloaded handle
    audioDowload(audioInfo) {
        Message.success({ content: '下载成功' })
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
    audioVolumeChange(currentVolume) {
        console.log('audio volume change', currentVolume);
    },

    //The single song is ended handle
    audioEnded(audioInfo) {
        Message.info({ content: "Music is ended!" })
        console.log('audio ended', audioInfo);
    },

    //audio load abort The target event like {...,audioName:xx,audioSrc:xx,playMode:xx}
    audioAbort(e) {
        console.log('audio abort', e);
    },

    //audio play progress handle
    audioProgress(audioInfo) {
        // console.log('audio progress',audioInfo);
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
