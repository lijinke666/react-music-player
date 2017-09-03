
import React, { PureComponent, PropTypes } from "react"
import ReactDOM from "react-dom"
import classNames from "classnames"
import Mobile from "is-mobile"
import Slider from 'rc-slider/lib/Slider'
import Switch from "rc-switch"
import AudioListsPanel from "./audioListsPanel"

import SettingIcon from "react-icons/lib/fa/cog"
import FaCircleONotch from "react-icons/lib/fa/circle-o-notch"
import FaHeadphones from "react-icons/lib/fa/headphones"
import FaMinusSquareO from "react-icons/lib/fa/minus-square-o"
import FaPlayCircle from "react-icons/lib/fa/play-circle"
import FaPauseCircle from "react-icons/lib/fa/pause-circle"
import Reload from "react-icons/lib/fa/refresh"
import MdVolumeDown from "react-icons/lib/md/volume-down"
import MdVolumeMute from "react-icons/lib/md/volume-mute"
import Download from "react-icons/lib/fa/cloud-download"
import LoadIcon from "react-icons/lib/fa/spinner"
import PlayLists from "react-icons/lib/fa/list-ul"


import 'rc-slider/assets/index.css'
import 'rc-switch/assets/index.css'
import "./styles.less"


/**
 * TODO V3.0.0 支持多首歌曲播放
 * 待完成
 * 1.获取列表每首歌的时长 
 * 2.增加列表循环 随机播放 功能
 * 
 */

const ISMOBILE = Mobile()

const Load = () => (
  <span className='loading group' key="loading"><LoadIcon /></span>
)


export default class ReactJkMusicPlayer extends PureComponent {
  state = {
    playId: -1,
    name: "",
    cover: "",
    musicSrc: "",
    toggle: false,
    pause: false,
    playing: false,
    duration: 0,
    currentTime: 0,
    isLoop: false,
    isMute: false,
    soundValue: 100,
    isDrag: false,
    currentX: 0,
    currentY: 0,
    moveX: 0,
    moveY: 0,
    isMove: false,
    loading: false,
    audioListsPanelVisible: false,
    theme: this.lightThemeName,
    currentAudioVolume: 0,         //当前音量  静音后恢复到之前记录的音量
  }
  static defaultProps = {
    audioLists: [],
    theme: this.lightThemeName,
    mode: "mini",
    defaultPosition: {
      left: 0,
      top: 0
    },
    controllerTitle: <FaHeadphones />,
    isUploadAudio: false,
    name: "",
    closeText: "close",
    openText: "open",
    notContentText: "暂无音乐",
    checkedText: "",
    unCheckedText: "",
    isMove: false,
    drag: true,
    showDowload: true,
    showPlay: true,
    showReload: true,
    showLoop: true,
    showThemeSwitch: true
  }
  static PropTypes = {
    audioLists: PropTypes.array.isRequired,
    theme: PropTypes.oneOf([this.darkThemeName, this.lightThemeName]),
    mode: PropTypes.oneOf(['mini', 'full']),
    drag: PropTypes.bool,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    cover: PropTypes.string.isRequired,
    musicSrc: PropTypes.string.isRequired,
    closeText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    openText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    notContentText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    controllerTitle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    defaultPosition: PropTypes.object,
    audioPlay: PropTypes.func,
    audioPause: PropTypes.func,
    audioEnded: PropTypes.func,
    loadAudioError: PropTypes.func,
    audioProgress: PropTypes.func,
    autdioSeeked: PropTypes.func,
    audioDowload: PropTypes.func,
    showDowload: PropTypes.bool,
    showPlay: PropTypes.bool,
    showReload: PropTypes.bool,
    showLoop: PropTypes.bool,
    showThemeSwitch: PropTypes.bool,
    checkedText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    unCheckedText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  }
  constructor(props) {
    super(props)
    this.audio = null       //当前播放器
    this.lightThemeName = "light"
    this.darkThemeName = "dark"
    this.targetId = "music-player-controller"
    this.openPanelPeriphery = 1             //移动差值 在 这之间 认为是点击打开panel
    this.x = 0
    this.y = 0
    this.isDrag = false
  }
  render() {
    const {
      mode,
      className,
      controllerTitle,
      closeText,
      openText,
      notContentText,
      drag,
      style,
      showDowload,
      showPlay,
      showReload,
      showLoop,
      showThemeSwitch,
      checkedText,
      unCheckedText,
      audioLists
    } = this.props

    const {
      toggle,
      playing,
      duration,
      audioImg,
      isCanUpload,
      currentTime,
      isLoop,
      isMute,
      soundValue,
      audioFile,
      moveX,
      moveY,
      isMove,
      loading,
      audioListsPanelVisible,
      pause,
      theme,
      name,
      cover,
      musicSrc,
      playId
    } = this.state

    const bindEvents = drag
      ? {
        [ISMOBILE ? "onTouchStart" : "onMouseDown"]: this.controllerMouseDown,
        [ISMOBILE ? "onTouchMove" : "onMouseMove"]: this.controllerMouseMove,
        [ISMOBILE ? "onTouchEnd" : "onMouseUp"]: this.controllerMouseUp,
        [ISMOBILE ? "onTouchCancel" : "onMouseOut"]: this.controllerMouseOut,
      }
      : {
        onClick: this.openPanel
      }

    const sliderBaseOptions = {
      min: 0,
      step: 0.01,
      trackStyle: { backgroundColor: "#31c27c" },
      handleStyle: { backgroundColor: "#31c27c", "border": "2px solid #fff" }
    }

    return (
      <div
        className={
          classNames(
            "react-jinke-music-player",
            { "light-theme": theme === this.lightThemeName }
          )
        }
        key="react-jinke-music-player"
        ref={node => this.controller = node}
        {...bindEvents}
        style={{
          ...style,
          left: moveX,
          top: moveY
        }}
      >
        <div
          className={classNames("music-player", className)}
          key="music-player"
        >
          {
            toggle
              ? undefined
              : (
                <div
                  key="controller"
                  id={this.targetId}
                  className="scale music-player-controller"
                >
                  {
                    loading
                      ? <Load />
                      : (
                        <span>
                          <span className="controller-title" key="controller-title">{controllerTitle}</span>
                          <div key="setting" className="music-player-controller-setting">{toggle ? closeText : openText}</div>
                        </span>
                      )
                  }
                </div>
              )
          }
          <audio key="audio" className="music-player-audio" preload="auto" src={musicSrc}></audio>
        </div>
        {
          toggle
            ? (
              <div key="panel" className="music-player-panel translate">
                <section className="panel-content" key="panel-content">
                  <div className={classNames("img-content", "img-rotate", { "img-rotate-pause": !playing })} style={{ 'backgroundImage': `url(${cover})` }} key="img-content">
                  </div>
                  <div className="progressbar-content" key="progressbar-content">
                    <span className="audio-title">{name}</span>
                    <section className="audio-main">
                      <span key="current-time" className="current-time">
                        {
                          loading
                            ? '--'
                            : this.formatTime(currentTime)
                        }
                      </span>
                      <div className="progressbar" key="progressbar">
                        <Slider
                          max={Math.ceil(duration)}
                          defaultValue={0}
                          value={currentTime}
                          onChange={this.onHandleProgress}
                          onAfterChange={this.autdioSeeked}
                          {...sliderBaseOptions}
                        />
                      </div>
                      <span key="duration" className="duration">
                        {
                          loading
                            ? '--'
                            : this.formatTime(duration)
                        }
                      </span>
                    </section>
                  </div>
                  <div className="player-content" key="player-content">
                    {/*播放按钮*/}
                    {
                      loading
                        ? <span>
                          <Load />
                        </span>
                        : showPlay
                          ? <span
                            className="group play-btn"
                            key="play-btn"
                            ref={node => this.playBtn = node}
                            {...ISMOBILE ? { onTouchStart: this.onPlay } : { onClick: this.onPlay }}
                            title="play"
                          >
                            {
                              playing
                                ? <span><FaPauseCircle /></span>
                                : <span><FaPlayCircle /></span>
                            }
                          </span>
                          : undefined
                    }

                    {/*重播*/}
                    {
                      showReload
                        ? <span
                          className="group roload-btn"
                          {...ISMOBILE ? { onTouchStart: this.audioReload } : { onClick: this.audioReload }}
                          key="roload-btn"
                          title="roload"
                        >
                          <Reload />
                        </span>
                        : undefined
                    }

                    {/*单曲循环*/}
                    {
                      showLoop
                        ? <span
                          className={classNames("group loop-btn", { "active": isLoop })}
                          {...ISMOBILE ? { onTouchStart: this.audioLoop } : { onClick: this.audioLoop }}
                          key="loop-btn"
                          title="loop of the song"
                        >
                          <FaCircleONotch />
                        </span>
                        : undefined
                    }

                    {/*下载歌曲*/}
                    {
                      showDowload
                        ? <span
                          className="group audio-download"
                          {...ISMOBILE ? { onTouchStart: () => this.downloadAudio(name, musicSrc) } : { onClick: () => this.downloadAudio(name, musicSrc) }}
                        >
                          <Download />
                        </span>
                        : undefined
                    }

                    {/* 主题选择 */}
                    {
                      showThemeSwitch
                        ? <span className="group theme-switch">
                          <Switch
                            className="theme-switch"
                            onChange={this.themeChange}
                            checkedChildren={checkedText}
                            unCheckedChildren={unCheckedText}
                            checked={theme === this.lightThemeName}
                          />
                        </span>
                        : undefined
                    }

                    {/*音量控制*/}
                    <span className="group play-sounds" key="play-sound" title="sounds">
                      {
                        isMute
                          ? <span className="sounds-icon" {...ISMOBILE ? { onTouchStart: this.onSound } : { onClick: this.onSound }}><MdVolumeMute /></span>
                          : <span className="sounds-icon" {...ISMOBILE ? { onTouchStart: this.onMute } : { onClick: this.onMute }}><MdVolumeDown /></span>
                      }
                      <Slider
                        max={1}
                        value={soundValue}
                        onChange={this.audioSoundChange}
                        className="sound-operation"
                        {...sliderBaseOptions}
                      />
                    </span>

                    {/*TODO 播放列表*/}
                    <span className="group audio-lists-btn" key="audio-lists-btn" title="play lists"  {...ISMOBILE ? { onTouchStart: this.openAudioListsPanel } : { onClick: this.openAudioListsPanel }}>
                      <span className="audio-lists-icon"><PlayLists /></span>
                      <span className="audio-lists-num">{audioLists.length}</span>
                    </span>

                    {/*收起面板*/}
                    {
                      mode === 'full'
                        ? undefined
                        : <span className="group hide-panel" key="hide-panel-btn"{...ISMOBILE ? { onTouchStart: this.onHidePanel } : { onClick: this.onHidePanel }} >
                          <FaMinusSquareO />
                        </span>
                    }
                  </div>
                  {/* 播放列表面板 */}
                  <AudioListsPanel
                    playId={playId}
                    pause={pause}
                    visible={audioListsPanelVisible}
                    audioLists={audioLists}
                    notContentText={notContentText}
                    onPlay={this.audioListsPlay}
                    onCancel={this.closeAudioListsPanel}
                  />
                </section>
              </div>
            )
            : undefined
        }
      </div>
    )
  }
  //音乐列表面板选择歌曲
  audioListsPlay = (playId) => {
    const { audioLists } = this.props
    const { playId: _playId, pause } = this.state
    //如果点击当前项 就暂停
    if (playId === _playId) {
      return pause ? this.audio.play() : this._pauseAudio()
    }
    const {
      name,
      cover,
      musicSrc
    } = audioLists[playId]
    this.setState({
      name,
      cover,
      musicSrc,
      playId,
      currentTime: 0,
      duration: 0,
      playing: false,
      loading: true
    }, () => {
      this.audio.currentTime = 0
      this.audio.load()
    })
  }
  openAudioListsPanel = () => {
    this.setState(({ audioListsPanelVisible }) => ({
      audioListsPanelVisible: !audioListsPanelVisible
    }))
  }
  closeAudioListsPanel = (e) => {
    e.stopPropagation()
    this.setState({ audioListsPanelVisible: false })
  }
  themeChange = (value) => {
    this.setState({
      theme: value ? this.lightThemeName : this.darkThemeName
    })
  }
  downloadAudio = (audioName, audioSrc) => {
    this.downloadNode = document.createElement('a')
    this.downloadNode.setAttribute('download', audioName)
    this.downloadNode.setAttribute('href', audioSrc)
    this.downloadNode.click()
    this.downloadNode = undefined

    this.props.audioDowload && this.props.audioDowload(audioName, audioSrc)
  }
  controllerMouseDown = (e) => {
    e.preventDefault();
    const touch = !ISMOBILE ? e : e.targetTouches[0];
    const _currentX = touch.pageX
    const _currentY = touch.pageY
    this.x = _currentX
    this.y = _currentY
    this.isDrag = true
    return false
  }
  controllerMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation()
    const touch = !ISMOBILE ? e : e.targetTouches[0];
    let _currentX = touch.pageX
    let _currentY = touch.pageY
    let [moveX, moveY] = [0, 0]
    if (!this.isDrag) return false

    const { top, left } = this.getBoundingClientRect(this.controller)
    moveX = _currentX - this.x
    moveY = _currentY - this.y


    const dragX = moveX + left
    const dragY = moveY + top
    let pageWidth = Math.max(        //页面最大宽度
      document.body.clientWidth,
      document.documentElement.clientWidth
    )
    let pageHeight = Math.max(        //页面最大宽度
      document.body.clientHeight,
      document.documentElement.clientHeight
    )
    let maxMoveX = pageWidth - this.controller.offsetWidth
    let maxMoveY = pageHeight - this.controller.offsetHeight
    maxMoveX = Math.min(maxMoveX, Math.max(0, dragX))
    maxMoveY = Math.min(maxMoveY, Math.max(0, dragY))
    const peripheryX = _currentX - this.x
    const peripheryY = _currentY - this.y

    const isMove = Math.abs(peripheryX) >= this.openPanelPeriphery || Math.abs(peripheryY) >= this.openPanelPeriphery

    this.setState({
      isMove,
      moveX: maxMoveX,
      moveY: maxMoveY
    })

    this.x = _currentX
    this.y = _currentY
    return false
  }
  controllerMouseUp = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.isDrag = false
    if (!this.state.isMove) {
      this.openPanel()
    }
    this.setState({ isMove: false })
    return false
  }
  controllerMouseOut = (e) => {
    e.preventDefault()
    this.isDrag = false
  }
  onHandleProgress = (value) => {
    this.audio.currentTime = value
  }
  onSound = () => {
    this.setAudioVolume(this.state.currentAudioVolume)
  }
  setAudioVolume = (value) => {
    this.audio.volume = value
    this.setState({
      currentAudioVolume: value,
      soundValue: value
    })
  }
  //秒转换成 时间格式
  formatTime(second) {
    var h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
      i = parseInt(s / 60);
      s = parseInt(s % 60);
      if (i > 60) {
        h = parseInt(i / 60);
        i = parseInt(i % 60);
      }
    }
    // 补零
    const zero = (v) => (v >> 0) < 10 ? "0" + v : v;
    return [zero(h), zero(i), zero(s)].join(":");
  };
  stopAll = (target) => {
    target.stopPropagation()
    target.preventDefault()
  }
  getBoundingClientRect = (ele) => {
    const { left, top } = ele.getBoundingClientRect()
    return {
      left,
      top
    }
  }
  //循环播放
  audioLoop = () => {
    this.setState(({ isLoop }) => {
      return {
        isLoop: !isLoop
      }
    })
  }
  //重新播放
  audioReload = () => {
    this.audio.load()
    this.onPlay()
  }
  openPanel = () => {
    this.setState({ toggle: true })
  }
  //收起播放器
  onHidePanel = (e) => {
    this.setState({ toggle: false })
  }
  //播放
  onPlay = () => {
    //是否在播放
    const { playing } = this.state
    if (playing === true) {
      this._pauseAudio()
    } else {
      this.getAudioLength()
      this.loadAudio();
      this.props.audioPlay && this.props.audioPlay(this.audio.currentTime, this.audio.duration)
    }
  }
  //暂停
  _pauseAudio = () => {
    this.audio.pause()
    this.setState({ playing: false, pause: true })
  }
  pauseAudio = () => {
    this.props.audioPause && this.props.audioPause(this.audio.currentTime, this.audio.duration)
  }

  //加载音频
  loadAudio = () => {
    this.setState({ loading: true })
    if (this.audio.readyState == 4 && this.audio.networkState != 3) {
      this.setState({ playing: true, loading: false, pause: false }, () => this.audio.play())
    }
  }
  //获取音频长度
  getAudioLength = () => {
    this.setState({
      duration: this.audio.duration
    })
  }
  loadAudioError = (e) => {
    this.setState({ playing: false, loading: true })
    this.props.loadAudioError && this.props.loadAudioError(e)
  }
  //音频播放结束
  audioEnd = () => {
    this.props.audioEnded && this.props.audioEnded(this.audio.duration)

    this.setState(({ playing, isLoop }) => {
      if (isLoop === true) {
        return this.loadAudio()
      }
      return { playing: false }
    })

  }
  //播放进度更新
  audioTimeUpdate = () => {
    const currentTime = this.audio.currentTime
    this.setState({ currentTime })
    this.props.audioProgress && this.props.audioProgress(currentTime, this.audio.duration)
  }
  //音量改变
  audioSoundChange = (value) => {
    this.setAudioVolume(value)
  }
  audioVolumeChange = () => {
    if (this.audio.volume <= 0) {
      this.setState({ isMute: true })
    } else {
      this.setState({ isMute: false })
    }
  }
  //进度条跳跃
  autdioSeeked = () => {
    this.loadAudio()
    this.props.autdioSeeked && this.props.autdioSeeked(this.audio.currentTime, this.audio.duration)
  }
  //静音
  onMute = () => {
    this.setState({
      isMute: true,
      soundValue: 0,
      currentAudioVolume: this.audio.volume
    }, () => {
      this.audio.volume = 0
    })
  }
  toggleMode = (mode) => {
    if (mode === "full") {
      this.setState({ toggle: true })
    }
  }
  bindMobileAutoPlayerEvents = () => {
    document.addEventListener('DOMContentLoaded', () => {
      this.audio.play()
    })
  }
  unBindEvnets = (...options) => {
    this.bindEvents(...options)
  }
  bindEvents = (
    target = this.audio,
    eventsNames = {
      waiting: this.loadAudio,
      canplay: this.onPlay,
      error: this.loadAudioError,
      ended: this.audioEnd,
      seeked: this.autdioSeeked,
      pause: this.pauseAudio,
      timeupdate: this.audioTimeUpdate,
      volumechange: this.audioVolumeChange,
      stalled: this.audioStalled
    },
    bind = true
  ) => {
    for (let name in eventsNames) {
      const _events = eventsNames[name]
      bind
        ? target.addEventListener(name, _events)
        : target.removeEventListener(name, _events)
    }
  }
  fixDragBug() {
    //解决拖拽速度过快产生的bug  绑定了但是会导致 Slider 组件拖拽事件无效 暂未想到好的解决办法
    document.addEventListener(ISMOBILE ? 'touchmove' : 'mousemove', (e) => this.controllerMouseMove(e), false)
    document.addEventListener(ISMOBILE ? 'touchend' : 'mouseup', (e) => this.controllerMouseUp(e), false)
  }
  audioStalled = () => {
    this.setState({ loading: true })
  }
  shouldComponentUpdate(nextProps, { musicSrc }) {
    if (this.state.musicSrc === musicSrc || this.state.musicSrc !== musicSrc) return true
    return true
  }
  //合并state 更新初始位置
  componentWillMount() {
    const {
      defaultPosition: { left, top },
      theme,
      audioLists
     } = this.props

    const { name, cover, musicSrc } = audioLists[0]

    this.setState(({ playId }) => {
      return {
        playId: ++playId,
        name,
        cover,
        musicSrc,
        theme,
        moveX: left || 0,
        moveY: top || 0
      }
    })
  }
  componentWillUnmount() {
    this.unBindEvnets(this.audio, undefined, false)
    this.unBindMobileTouchStartEvents()
  }
  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this)
    this.progress = this.dom.querySelector('.progress')
    this.audio = this.dom.querySelector('audio')
    this.toggleMode(this.props.mode)
    this.bindEvents(this.audio)
  }
}