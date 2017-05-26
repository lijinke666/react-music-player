import React from "react"
import ReactDOM from "react-dom"
import MusicPlayer from "./player"

const Demo = ()=>(
    <MusicPlayer
        mode="mini"                       //music mode           mini or full
        name="demoName"                    //music name
        cover="http://www.thailandballoonfestival.com/tibf2013/images/HugoSlider1.jpg"                     //music cover
        musicSrc="http://tegos.kz/new/mp3_full/Redfoo_-_New_Thang.mp3"        //music path
    />
)
ReactDOM.render(
    <Demo/>,
    document.getElementById('root')
)
