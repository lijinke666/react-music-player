
import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import SettingIcon from "react-icons/lib/fa/cog"
import FaCircleONotch from "react-icons/lib/fa/circle-o-notch"
import FaHeadphones from "react-icons/lib/fa/headphones"
import FaMinusSquareO from "react-icons/lib/fa/minus-square-o"
import FaPlayCircle from "react-icons/lib/fa/play-circle"
import FaPauseCircle from "react-icons/lib/fa/pause-circle"
import Reload from "react-icons/lib/fa/refresh"
import MdVolumeDown from "react-icons/lib/md/volume-down"
import MdVolumeMute from "react-icons/lib/md/volume-mute"
import classNames from "classnames"
import Slider from 'rc-slider/lib/Slider'


import 'rc-slider/assets/index.css'
import "./styles.less"


export default class MusicPlayer extends React.PureComponent {
  state = {
    toggle: false,
    playing: false,
    duration: 0,
    currentTime: 0,
    isLoop: false,
    isMute: false,
    soundValue: 100,
    isDown: false,
    moveX: 0,
    moveY: 0,
    currentAudioVolume: 0,         //当前音量  静音后恢复到之前记录的音量
  }
  static defaultProps = {
    mode: "mini",
    controllerTitle: <FaHeadphones />,
    isUploadAudio: false,
    name: "name",
    closeText: "close",
    openText: "open",
    drag: true
  }
  static PropTypes = {
    mode: PropTypes.oneOf(['mini', 'full']),
    drag: PropTypes.bool,
    name: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    musicSrc: PropTypes.string.isRequired,
    closeText: PropTypes.string,
    openText: PropTypes.string,
    controllerTitle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    audioPlay: PropTypes.func,
    audioPause: PropTypes.func,
    audioEnded: PropTypes.func,
    loadAudioError: PropTypes.func,
    audioProgress: PropTypes.func,
    autdioSeeked: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.audio = null       //当前播放器
    this.defaultMusciName = "music"
    this.mouseX = this.mouseY = 0
    this.mouseDown = false
  }
  render() {
    const {
      musicSrc,
      name,
      cover,
      mode,
      className,
      controllerTitle,
      closeText,
      openText,
      drag,
      style
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
      moveY
    } = this.state

    const bindEvents = drag
      ? {
        onMouseDown: this.controllerMouseDown,
        onMouseMove: this.controllerMouseMove,
        onMouseUp: this.controllerMouseUp,
        onMouseOut: this.controllerMouseOut
      }
      : {
        onClick: this.openPanel
      }

    return (
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
                className="scale music-player-controller"
                ref={node => this.controller = node}
                style={{
                  left: moveX,
                  top: moveY
                }}
                {...bindEvents}
              >
                <span className="controller-title" key="controller-title">{controllerTitle}</span>
                <div key="setting" className="music-player-controller-setting">{toggle ? closeText : openText}</div>
              </div>
            )
        }
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
                        {this.formatTime(currentTime)}
                      </span>
                      <div className="progressbar" key="progressbar">
                        <Slider
                          min={0}
                          max={Math.ceil(duration)}
                          step={0.01}
                          defaultValue={0}
                          value={currentTime}
                          onChange={this.onHandleProgress}
                          onAfterChange={this.autdioSeeked}
                          trackStyle={{ backgroundColor: "#31c27c" }}
                          handleStyle={{ backgroundColor: "#31c27c", "border": "2px solid #fff" }}
                        />
                      </div>
                      <span key="duration" className="duration">
                        {this.formatTime(duration)}
                      </span>
                    </section>
                  </div>
                  <div className="player-content" key="player-content">
                    <span className="play-btn" key="play-btn" onClick={this.onPlay} title="play">
                      {
                        playing
                          ? <span><FaPauseCircle /></span>
                          : <span><FaPlayCircle /></span>
                      }
                    </span>
                    <span className="roload-btn" onClick={this.audioReload} key="roload-btn" title="roload"><Reload /></span>
                    <span className={classNames("loop-btn", { "active": isLoop })} onClick={this.audioLoop} key="loop-btn" title="loop of the song"><FaCircleONotch /></span>
                    <span className="play-sounds" key="play-sound">
                      {
                        isMute
                          ? <span onClick={this.onSound}><MdVolumeMute /></span>
                          : <span onClick={this.onMute}><MdVolumeDown /></span>
                      }
                      <input type="range" value={soundValue} step="0.01" max="1.0" min="0" className="sound-operation" key="range" onChange={this.audioSoundChange} />
                    </span>
                    {
                      mode === 'full'
                        ? undefined
                        : <span className="hide-panel" key="hide-panel-btn" onClick={this.onHidePanel}>
                          <FaMinusSquareO />
                        </span>
                    }
                  </div>
                </section>
              </div>
            )
            : undefined
        }
        <audio key="audio" className="music-player-audio" src={musicSrc}></audio>
      </div>
    )
  }
  controllerMouseDown = (e) => {
    e.preventDefault()
    const { left, top } = this.getBoundingClientRect(this.controller)
    this.mouseX = e.pageX - left
    this.mouseY = e.pageY - top
    this.mouseDown = true
    // this.setState(({isDown})=>({isDown:true}))
  }
  controllerMouseMove = (e) => {
    e.preventDefault()
    let currentMouseX = e.pageX
    let currentMouseY = e.pageY
    let [moveX, moveY] = [0, 0]
    if (this.mouseDown === true) {
      moveX = currentMouseX - this.mouseX
      moveY = currentMouseY - this.mouseY

      let pageWidth = document.documentElement.clientWidth //页面最大宽度
      let pageHeight = document.documentElement.clientHeight //页面最大高度
      let maxMoveX = pageWidth - this.controller.offsetWidth
      let maxMoveY = pageHeight - this.controller.offsetHeight
      maxMoveX = Math.min(maxMoveX, Math.max(0, moveX))
      maxMoveY = Math.min(maxMoveY, Math.max(0, moveY))
      this.setState(() => ({ moveX: maxMoveX, moveY: maxMoveY }))
    }
  }
  controllerMouseUp = (e) => {
    e.preventDefault()
    this.mouseDown = false
  }
  controllerMouseOut = (e) => {
    e.preventDefault()
    this.mouseDown = false
  }
  onHandleProgress = (value) => {
    this.audio.currentTime = value
  }
  onSound = () => {
    this.setAudioVolume(this.state.currentAudioVolume)
  }
  audioSoundChange = (e) => {
    this.setAudioVolume(e.target.value)
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
  progressClick = (e) => {
    this.stopAll(e)
    const { left } = this.getBoundingClientRect()
    this.audio.currentTime = ~~(e.pageX - left)
  }
  onProgressDown = (e) => {
    this.stopAll(e)
    this.setState({ isDown: true })
    const { left } = this.getBoundingClientRect()
    this.mouseX = (e.pageX - left) >> 0
  }
  onProgressUp = (e) => {
    this.stopAll(e)
    this.setState({ isDown: false })
  }
  onProgressMove = (e) => {
    this.stopAll(e)
    const { isDown } = this.state
    let moveX = 0
    const { left } = this.getBoundingClientRect()
    if (isDown === true) {
      moveX = (e.pageX - left - this.mouseX) >> 0
      this.audio.currentTime += moveX
    }
  }
  onProgressOut = (e) => {
    this.stopAll(e)
    this.setState({ isDown: false })
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
    this.setState({ toggle: !this.state.toggle })
  }
  //收起播放器
  onHidePanel = () => {
    this.openPanel()
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
    this.setState({ playing: false })
  }
  pauseAudio = () => {
    this.props.audioPause && this.props.audioPause(this.audio.currentTime, this.audio.duration)
  }

  //加载音频
  loadAudio = () => {
    if (this.audio.readyState == 4 && this.audio.networkState != 3) {
      this.setState({ playing: true }, () => this.audio.play())
    }
  }
  //获取音频长度
  getAudioLength = () => {
    this.setState({
      duration: this.audio.duration
    })
  }
  loadAudioError = (e) => {
    this.setState({ playing: false })
    this.props.loadAudioError && this.props.loadAudioError(e)
  }
  //音频播放结束
  audioEnd = () => {
    this.props.audioEnded && this.props.audioEnded(this.audio.duration)

    this.setState(({ playing, isLoop }) => {
      if (isLoop === true) {
        this.onPlay()
        return { playing: true }
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
  audioSoundChange = (e) => {
    this.setAudioVolume(e.target.value)
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
  unBindEvnets = (...options) => {
    this.bindEvents(...options)
  }
  bindEvents = (
    target = this.audio,
    eventsNames = {
      warning: this.loadAudio,
      canplay: this.onPlay,
      error: this.loadAudioError,
      ended: this.audioEnd,
      seeked: this.autdioSeeked,
      pause: this.pauseAudio,
      timeupdate: this.audioTimeUpdate,
      volumechange: this.audioVolumeChange
    },
    bind = true
  ) => {
    Object.entries(eventsNames).forEach(([name, _events]) => {
      bind
        ? target.addEventListener(name, _events)
        : target.removeEventListener(name, _events)
    })
  }
  componentWillUnmount() {
    this.unBindEvnets(this.audio, undefined, false)
  }
  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this)
    this.progress = this.dom.querySelector('.progress')
    this.audio = this.dom.querySelector('audio')
    this.toggleMode(this.props.mode)
    this.bindEvents(this.audio)
  }
}