import Mobile from "is-mobile"

describe('ReactJkMusicPlayer',()=>{
    it('test',()=>{
        const ISMOBILE = Object.is(typeof Mobile(),"boolean")
        expect(ISMOBILE).toEqual(true)
    })
})