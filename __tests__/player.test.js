import React from "react"
import Mobile from "is-mobile"
import Enzyme, { render, shallow } from 'enzyme'
import { expect } from 'chai'

import ReactJkMusicPlayer, { createRandomNum } from "../src"
import PlayerMobile from "../src/playerMobile"
import AudioListsPanel from "../src/audioListsPanel"


const testProps = {
    audioLists: [{
        name: "丑",
        singer: "草东没有派对",
        cover: "http://www.lijinke.cn/music/1387583682387727.jpg",
        musicSrc: "http://www.lijinke.cn/music/201711082.mp3"
    }],
}


describe('<ReactJkMusicPlayer/>', () => {
    it('render a <AudioListsPanel/> components', () => {
        const wrapper = shallow(<ReactJkMusicPlayer {...testProps} />)
        expect(wrapper.find(AudioListsPanel)).to.have.length(1)
    })
    it('render a <PlayerMobile/> components', () => {
        const wrapper = shallow(<ReactJkMusicPlayer {...testProps} />)
        const num = Mobile() ? 1 : 0
        expect(wrapper.find(PlayerMobile)).to.have.length(num)
    })
    it('render full mode', () => {
        const wrapper = render(<ReactJkMusicPlayer {...testProps} mode="full" />);
        expect(wrapper.text()).to.contain('full');
    })
    it('render mini mode', () => {
        const wrapper = render(<ReactJkMusicPlayer {...testProps} mode="mini" />);
        expect(wrapper.text()).to.contain('mini');
    })
    it('render dark theme', () => {
        const wrapper = render(<ReactJkMusicPlayer {...testProps} thme="dark" />);
        expect(wrapper.text()).to.contain('dark');
    })
    it('render range random', () => {
        const repeat = 10
        const result = new Array(repeat).fill().map((_, i) => {
            return createRandomNum(0, i + 1) <= i + 1
        })
        expect(result.filter(v => v)).to.have.length(repeat)
    })

})