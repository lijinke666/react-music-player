/* eslint-disable no-console */
import React from 'react'
import { mount } from 'enzyme'
import ReactJkMusicPlayer from '../../src'

describe('Locale test', () => {
  it('should render default locale with en_US', () => {
    // TODO:
    const wrapper = mount(
      <ReactJkMusicPlayer
        className='text-class-name'
        showMiniProcessBar={true}
      />
    )
    console.log('wrapper: ', wrapper)
  })
})
