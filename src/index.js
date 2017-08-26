
import React, { PureComponent, PropTypes } from "react"
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
import Download from "react-icons/lib/fa/cloud-download"
import classNames from "classnames"
import Slider from 'rc-slider/lib/Slider'


import 'rc-slider/assets/index.css'
import "./styles.less"


export default class ReactJkMusicPlayer extends PureComponent {
  state = {
    toggle: false,
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
    currentAudioVolume: 0,         //当前音量  静音后恢复到之前记录的音量
  }
  static defaultProps = {
    mode: "mini",
    controllerTitle: <FaHeadphones />,
    isUploadAudio: false,
    name: "",
    closeText: "close",
    openText: "open",
    isMove: false,
    drag: true,
    showDowload: true,
    showPlay: true,
    showReload: true,
    showLoop: true,
  }
  static PropTypes = {
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
    controllerTitle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
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
  }
  constructor(props) {
    super(props)
    this.audio = null       //当前播放器
    this.defaultMusciName = "music"
    this.targetId = "music-player-controller"
    this.openPanelPeriphery = 5             //移动差值 在 这之间 认为是点击打开panel
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
      style,
      showDowload,
      showPlay,
      showReload,
      showLoop,
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
      isMove
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

    const sliderBaseOptions = {
      min: 0,
      step: 0.01,
      trackStyle: { backgroundColor: "#31c27c" },
      handleStyle: { backgroundColor: "#31c27c", "border": "2px solid #fff" }
    }

    return (
      <div className="react-jinke-music-player">
        <div
          className={classNames("music-player", className)}
          key="music-player"
          style={{
            ...style,
            transform: `translate3d(${moveX}px,${moveY}px,0)`
          }}
        >
          {
            toggle
              ? undefined
              : (
                <div
                  key="controller"
                  id={this.targetId}
                  className="scale music-player-controller"
                  ref={node => this.controller = node}
                  {...bindEvents}
                >
                  <span className="controller-title" key="controller-title">{controllerTitle}</span>
                  <div key="setting" className="music-player-controller-setting">{toggle ? closeText : openText}</div>
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
                        {this.formatTime(currentTime)}
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
                        {this.formatTime(duration)}
                      </span>
                    </section>
                  </div>
                  <div className="player-content" key="player-content">
                    {/*播放按钮*/}
                    {
                      showPlay
                        ? <span className="group play-btn" key="play-btn" onClick={this.onPlay} title="play">
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
                        ? <span className="group roload-btn" onClick={this.audioReload} key="roload-btn" title="roload"><Reload /></span>
                        : undefined
                    }

                    {/*单曲循环*/}
                    {
                      showLoop
                        ? <span className={classNames("group loop-btn", { "active": isLoop })} onClick={this.audioLoop} key="loop-btn" title="loop of the song"><FaCircleONotch /></span>
                        : undefined
                    }

                    {/*下载歌曲*/}
                    {
                      showDowload
                        ? <span className="group audio-download" onClick={() => this.downloadAudio(name, musicSrc)}><Download /></span>
                        : undefined
                    }

                    {/*音量控制*/}
                    <span className="group play-sounds" key="play-sound" title="sounds">
                      {
                        isMute
                          ? <span className="sounds-icon" onClick={this.onSound}><MdVolumeMute /></span>
                          : <span className="sounds-icon" onClick={this.onMute}><MdVolumeDown /></span>
                      }
                      <Slider
                        max={1.0}
                        value={soundValue}
                        onChange={this.audioSoundChange}
                        className="sound-operation"
                        {...sliderBaseOptions}
                      />
                    </span>
                    {
                      mode === 'full'
                        ? undefined
                        : <span className="group hide-panel" key="hide-panel-btn" onClick={this.onHidePanel}>
                          <FaMinusSquareO />
                        </span>
                    }
                  </div>
                </section>
              </div>
            )
            : undefined
        }
      </div>
    )
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
    e.preventDefault()
    const _currentX = e.pageX
    const _currentY = e.pageY
    const { left, top } = this.getBoundingClientRect(this.controller)
    this.setState(({ isDrag }) => {
      return {
        x: _currentX,
        y: _currentY,
        currentX: _currentX - left,
        currentY: _currentY - top,
        isDrag: true
      }
    })
    return false
  }
  controllerMouseMove = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let _currentX = e.pageX
    let _currentY = e.pageY
    let [moveX, moveY] = [0, 0]
    if (!this.state.isDrag) return false

    this.setState(({ x, y, currentX, currentY }) => {
      moveX = _currentX - currentX
      moveY = _currentY - currentY

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
      maxMoveX = Math.min(maxMoveX, Math.max(0, moveX))
      maxMoveY = Math.min(maxMoveY, Math.max(0, moveY))


      const _moveX = _currentX - x
      const _moveY = _currentY - y

      if (Math.abs(_moveX) >= this.openPanelPeriphery || Math.abs(_moveY) >= this.openPanelPeriphery) {
        return{
          isMove: true,
          moveX: maxMoveX,
          moveY: maxMoveY
        }
      } else {
        return{
          isMove:false,
          moveX: maxMoveX,
          moveY: maxMoveY
        }
      }
    })

    return false
  }
  controllerMouseUp = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState(({ isMove }) => {
      //body 和 target 都是绑定了 mouseUp 事件  防止 document.body 触发 openPanel 事件
      const isTarget = this.targetId === e.target.id
      if (!isMove && isTarget) {
        this.openPanel()
      }
      return {
        isMove: false,
        isDrag: false,
        currentX: 0,
        currentY: 0
      }
    })
    return false
  }
  controllerMouseOut = (e) => {
    e.preventDefault()
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
  onHidePanel = () => {
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
  bindMobileTouchStartEvents = () => {
    document.body.addEventListener('touchstart', this.onPlay, false)
  }
  unBindMobileTouchStartEvents = () => {
    document.body.removeEventListener('touchstart', this.onPlay, false)
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
      volumechange: this.audioVolumeChange,
    },
    bind = true
  ) => {
    Object.entries(eventsNames).forEach(([name, _events]) => {
      bind
        ? target.addEventListener(name, _events)
        : target.removeEventListener(name, _events)
    })
  }
  shouldComponentUpdate = (nextProps, { isMove }) => {
    if(this.state.isMove != isMove) return false
    return true
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
    this.bindMobileTouchStartEvents()
    document.body.addEventListener('mousemove', (e) => this.controllerMouseMove(e),false)
    document.body.addEventListener('mouseup', (e) => this.controllerMouseUp(e),false)
  }
}