# React-Jk-Music-Player
react music player component 

## Installation
```
npm install react-jinke-music-player --save
```

## Example
```
git clone https://github.com/lijinke666/react-3d-gallery.git
```

- `yarn`
- `npm run demo`   run example



```javascript
import React from "react"
import ReactDOM from "react-dom"
import ReactJkMusicPlayer from "../src/index"
import FaHeadphones from "react-icons/lib/fa/headphones"

const Demo = ()=>(
    <ReactJkMusicPlayer
        openText="OPEN"                    //contorller open text   type 'string' default 'open'
        closeText="CLOSE"                  //contorller open text   type 'string' default 'close'
        mode="full"                       //music mode           mini | full
        name="demoName"                    //music name
        controllerTitle= {<FaHeadphones/>}   //contoller cover Title  type 'string || ReactNode' default '<FaHeadphones/>'
        cover="http://www.thailandballoonfestival.com/tibf2013/images/HugoSlider1.jpg"                     //music cover
        musicSrc="http://tegos.kz/new/mp3_full/Redfoo_-_New_Thang.mp3"        //music path
    />
)
ReactDOM.render(
    <Demo/>,
    document.getElementById('root')
)

```

###  Because the first time the NPM package is formatted for reference  https://github.com/smronju/React-Music-Player

##### Thank you here
