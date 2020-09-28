import React from 'react'
import { mount } from 'enzyme'
import ReactJkMusicPlayer from '../../src'
import { MODE } from '../../src/config/mode'

describe('Drag test', () => {
  it('should open full mode player if only click mini mode and disable drag', () => {
    const wrapper = mount(<ReactJkMusicPlayer mode="mini" drag={false} />)
    wrapper.find('.music-player-controller').simulate('click')
    expect(wrapper.find('.music-player-panel')).toHaveLength(1)
  })

  it("should open full mode player if call drag event but don't move", () => {
    const onModeChange = jest.fn()
    const onCoverClick = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="mini"
        onModeChange={onModeChange}
        onCoverClick={onCoverClick}
        audioLists={[{ cover: 'xx' }]}
      />,
    )
    wrapper.instance().onControllerDragStart(null, { x: 0, y: 0 })
    wrapper.instance().onControllerDrag(null, { x: 0, y: 0 })
    expect(wrapper.instance().isDrag).toBeFalsy()
    wrapper.instance().onControllerDragStop({ target: null }, { x: 0, y: 0 })
    wrapper.update()

    expect(wrapper.find('.music-player-panel')).toHaveLength(1)
    expect(onModeChange).toHaveBeenCalledWith(MODE.FULL)
    expect(onCoverClick).toHaveBeenCalled()
  })

  it('should not open full mode player if drag and moved', () => {
    const onModeChange = jest.fn()
    const onCoverClick = jest.fn()
    const wrapper = mount(
      <ReactJkMusicPlayer
        mode="mini"
        onModeChange={onModeChange}
        onCoverClick={onCoverClick}
        audioLists={[{ cover: 'xx' }]}
      />,
    )
    wrapper.instance().onControllerDragStart(null, { x: 0, y: 0 })
    wrapper.instance().onControllerDrag(null, { x: 10, y: 10 })
    wrapper
      .instance()
      .onControllerDragStop({ target: null }, { x: 100, y: 100 })
    wrapper.update()

    expect(wrapper.find('.music-player-panel')).toHaveLength(0)
    expect(onModeChange).not.toHaveBeenCalled()
    expect(onCoverClick).not.toHaveBeenCalled()
  })
})
