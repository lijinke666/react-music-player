import isMobile from "is-mobile"
import assert from "power-assert";
/* global describe,it*/
describe('ReactJkMusicPlayer',()=>{
    it('test',()=>{
        const _isMobile = Object.is(typeof isMobile(),"boolean")
        assert(_isMobile === true)
    })
})