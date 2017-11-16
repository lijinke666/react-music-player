import React from "react"
import Mobile from "is-mobile"
import Enzyme,{render,shallow} from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'

import ReactJkMusicPlayer from "../src"
import PlayerMobile from "../src/playerMobile"
import AudioListsPanel from "../src/audioListsPanel"

Enzyme.configure({ adapter: new Adapter() })

const testProps = {
    audioLists: [{
        name: "丑",
        singer: "草东没有派对",
        cover: "http://www.lijinke.cn/music/1387583682387727.jpg",
        musicSrc: "http://www.lijinke.cn/music/201711082.mp3"
    }],
}


describe('<ReactJkMusicPlayer/>',()=>{
    it('render a <AudioListsPanel/> components',()=>{
        const wrapper = shallow(<ReactJkMusicPlayer {...testProps}/>)
        expect(wrapper.find(AudioListsPanel)).to.have.length(1)
    })
    it('render a <PlayerMobile/> components',()=>{
        const wrapper = shallow(<ReactJkMusicPlayer {...testProps}/>)
        const num = Mobile() ? 1 : 0
        expect(wrapper.find(PlayerMobile)).to.have.length(num)
    })
    it('render full mode',()=>{
        const wrapper = render(<ReactJkMusicPlayer {...testProps} mode="full" />);
        expect(wrapper.text()).to.contain('full');
    })
    it('render mini mode',()=>{
        const wrapper = render(<ReactJkMusicPlayer {...testProps} mode="mini" />);
        expect(wrapper.text()).to.contain('mini');
    })
    it('render dark theme',()=>{
        const wrapper = render(<ReactJkMusicPlayer {...testProps} thme="dark" />);
        expect(wrapper.text()).to.contain('dark');
    })

})