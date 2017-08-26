import React from "react"
import ReactDOM from "react-dom"
import ReactJkMusicPlayer from "react-jinke-music-player"
import Message from "rc-message"
import FaHeadphones from "react-icons/lib/fa/headphones"

import "./example.less"

const options = {
    //audio controller open text  [ type `String` default 'open']
    openText: "OPEN",

    //audio controller close text  [ type `String` default 'close']
    closeText: "CLOSE",

    //audio mode        mini | full          [type `String`  default `mini`]  
    mode: "mini",

    //audio controller is can be drag of the "mini" mode
    drag: true,

    //audio name     [type `String`  default `name`]
    name: "押尾コータロー-風の詩",

    //audio controller title [type `String | ReactNode`  default <FaHeadphones/>]
    controllerTitle: <FaHeadphones />,

    //audio cover    [type `String`  default `-`]
    cover: "http://imge.kugou.com/stdmusic/20150717/20150717134451909720.jpg",

    //audio path     [type `String`  default `-`]   
    musicSrc: "http://fs.web.kugou.com/e7c6f55063f1671bfd989dfb99eedb89/59a17c74/G004/M07/09/09/pIYBAFT_9QKAGw-eADsE6OIQ0nQ828.mp3",

    //play button display of the audio player panel   [type `Boolean` default `true`]
    showPlay: true,

    //reload button display of the audio player panel   [type `Boolean` default `true`]
    showReload: true,

    //dowload button display of the audio player panel   [type `Boolean` default `true`]
    showDowload: true,

    //loop button display of the audio player panel   [type `Boolean` default `true`]
    showLoop: false,

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
        // console.log(currentTime,duration);
    },

    //audio load faild error handle
    loadAudioError(e) {
        Message.error({ content: "audio load error" })
        console.log('audio load err', e);
    }
}

const Demo = () => (
    <ReactJkMusicPlayer {...options}/>
)
ReactDOM.render(
    <Demo />,
    document.getElementById('root')
)
