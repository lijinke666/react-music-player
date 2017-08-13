import React from "react"
import ReactDOM from "react-dom"
import ReactJkMusicPlayer from "../src/index"
import FaHeadphones from "react-icons/lib/fa/headphones"

const Demo = ()=>(
    <ReactJkMusicPlayer
        openText="OPEN"
        closeText="CLOSE"
        mode="full"                       //music mode           mini | full
        name="demoName"                    //music name
        controllerTitle= {<FaHeadphones/>}
        cover="http://www.thailandballoonfestival.com/tibf2013/images/HugoSlider1.jpg"                     //music cover
        musicSrc="http://tegos.kz/new/mp3_full/Redfoo_-_New_Thang.mp3"        //music path
    />
)
ReactDOM.render(
    <Demo/>,
    document.getElementById('root')
)
