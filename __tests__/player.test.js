import React from "react"
import ReactJkMusicPlayer from "../src"
import renderer from "react-test-renderer"

const _testProps_ = {
    cover: "test.jpg",
    musicSrc: "test.mp3",
}
const Test = ()=>(
    <div>
        <audio></audio>
    </div>
)
describe('ReactJkMusicPlayer',()=>{
    it('test',()=>{
        const component = renderer.create(
            <ReactJkMusicPlayer {..._testProps_}/>
        )
        const {type} = component.toJSON()
        expect(type).toEqual('div')
        
    })
})