import React from "react"
import ReactDOM from "react-dom"
import ReactJkMusicPlayer from "react-jinke-music-player"

const Demo = ()=>(
    <ReactJkMusicPlayer
        mode="mini"                       //music mode           mini or full
        controllerTitle="jk"                //controller title 
        name="demoName"                    //music name
        cover="http://www.thailandballoonfestival.com/tibf2013/images/HugoSlider1.jpg"                     //music cover
        musicSrc="http://tegos.kz/new/mp3_full/Redfoo_-_New_Thang.mp3"        //music path
    />
)
ReactDOM.render(
    <Demo/>,
    document.getElementById('root')
)
