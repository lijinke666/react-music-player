import React from 'react'
import { mount } from 'enzyme'
import ReactJkMusicPlayer from '../../src'
import lyric from '../../example/lyric'

const PauseIcon = () => <div>1</div>
const PlayIcon = () => <div>1</div>
const DestroyIcon = () => <div>1</div>
const CloseIcon = () => <div>1</div>
const DeleteIcon = () => <div>1</div>
const DownloadIcon = () => <div>1</div>
const ToggleIcon = () => <div>1</div>
const LyricIcon = () => <div>1</div>
const VolumeIcon = () => <div>1</div>
const MuteIcon = () => <div>1</div>
const NextIcon = () => <div>1</div>
const PrevIcon = () => <div>1</div>
const PlayListsIcon = () => <div>1</div>
const ReloadIcon = () => <div>1</div>
const LoopIcon = () => <div>1</div>
const OrderIcon = () => <div>1</div>
const OrderLoopIcon = () => <div>1</div>
const ShuffleIcon = () => <div>1</div>
const LoadingIcon = () => <div>1</div>

const createPlayer = (props) => (
  <ReactJkMusicPlayer
    mode="full"
    audioLists={[
      {
        musicSrc: 'xx',
        name: 'audioName',
        lyric,
      },
      {
        musicSrc: 'xx2',
        name: 'audioName2',
      },
    ]}
    icon={{
      pause: <PauseIcon />,
      play: <PlayIcon />,
      destroy: <DestroyIcon />,
      close: <CloseIcon />,
      delete: <DeleteIcon />,
      download: <DownloadIcon />,
      toggle: <ToggleIcon />,
      lyric: <LyricIcon />,
      volume: <VolumeIcon />,
      mute: <MuteIcon />,
      next: <NextIcon />,
      prev: <PrevIcon />,
      playLists: <PlayListsIcon />,
      reload: <ReloadIcon />,
      loop: <LoopIcon />,
      order: <OrderIcon />,
      orderLoop: <OrderLoopIcon />,
      shuffle: <ShuffleIcon />,
      loading: <LoadingIcon />,
    }}
    {...props}
  />
)

describe('Player custom icon test', () => {
  it('should render custom icon', () => {
    const wrapper = mount(createPlayer())
    wrapper.find('.audio-lists-btn').simulate('click')
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('should render custom icon in mobile mode', () => {
    const wrapper = mount(createPlayer())
    wrapper.setState({ isMobile: true })
    expect(wrapper.render()).toMatchSnapshot()
  })
})
