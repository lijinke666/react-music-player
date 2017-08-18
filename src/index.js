
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
        currentAudioVolume: 0,         //当前音量  静音后恢复到之前记录的音量
    }
    static defaultProps = {
        mode: "mini",
        controllerTitle: <FaHeadphones />,
        isUploadAudio: false,
        name: "name",
        closeText: "close",
        openText: "open"
    }
    static PropTypes = {
        mode: PropTypes.oneOf(['mini', 'full']),
        name: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        musicSrc: PropTypes.string.isRequired,
        closeText: PropTypes.string,
        openText: PropTypes.string,
        controllerTitle:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        audioPlay:PropTypes.func,
        audioPause:PropTypes.func,
        audioEnded:PropTypes.func,
        loadAudioError:PropTypes.func,
        audioProgress:PropTypes.func
    }
    constructor(props) {
        super(props)
        this.audio = null       //当前播放器
        this.defaultMusciName = "music"
        this.mouseX = 0
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
            openText
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
        } = this.state

        //当前播放进度
        const progress = ((currentTime / duration) * 100).toFixed(2)

        return (
            <figure className={classNames("music-player", className)} key="music-player">
                {/*控制按钮*/}
                {
                    toggle
                        ? undefined
                        : (
                            <div key="controller" className="scale music-player-controller" onClick={this.openPanel}>
                                <span>{controllerTitle}</span>
                                <div key="setting" className="music-player-controller-setting">{toggle ? closeText : openText}</div>
                            </div>
                        )
                }
                {
                    toggle
                        ? (
                            <div key="panel" className="music-player-panel translate">
                                <section className="panel-content" key="panel-content">
                                    <div className={classNames("img-content", { "img-rotate": playing })} style={{'backgroundImage':`url(${cover})`}} key="img-content">
                                    </div>
                                    <div className="progressbar-content" key="progressbar-content">
                                        <span>{name}</span>
                                        <section>
                                            <span key="current-time" className="current-time">
                                                {this.formatTime(currentTime)}
                                                {/* {
                                                    (~~currentTime) < 60
                                                        ? `00:${(~~currentTime) < 10 ? `0${~~currentTime}` : ~~currentTime}`
                                                        : `0${~~(currentTime / 60)}:${(~~(currentTime % 60) < 10) ? `0${~~(currentTime % 60)}` : ~~(currentTime % 60)}`
                                                } */}

                                            </span>
                                            <div className="progressbar" key="progressbar">
                                                <span key="progress" style={{ width: `${progress}%` }} className="progress">
                                                    <span
                                                        className="progress-change"
                                                        key="progress-change"
                                                        onMouseDown={this.onProgressDown}
                                                        onMouseUp={this.onProgressUp}
                                                        onMouseMove={this.onProgressMove}
                                                        onMouseOut={this.onProgressOut}
                                                    >
                                                    </span>
                                                </span>
                                            </div>
                                            <span key="duration" className="duration">
                                                {this.formatTime(duration)}
                                                {/* {
                                                    (duration / 60) < 10
                                                        ? `0${(duration / 60).toFixed(2)}`
                                                        : `${(duration / 60).toFixed(2)}`
                                                } */}
                                            </span>
                                        </section>
                                    </div>
                                    <div className="player-content" key="player-content">
                                        <span className="play-btn" key="play-btn" onClick={this.onPlay}>
                                            {
                                                playing
                                                    ? <span><FaPauseCircle /></span>
                                                    : <span><FaPlayCircle /></span>
                                            }
                                        </span>
                                        <span className="play-setting" key="play-setting">
                                            <span><SettingIcon /></span>
                                            <ul className="play-setting-items">
                                                <li className={classNames("item", { "active": isLoop })} key="setting1" onClick={this.audioLoop}>
                                                    <span><FaCircleONotch /></span>
                                                </li>
                                                <li className="item reload-btn" key="setting2" onClick={this.audioReload}>
                                                    <span><Reload /></span>
                                                </li>
                                            </ul>
                                        </span>
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
                <audio key="audio" className="music-player-audio" src={musicSrc} controls loop={isLoop}></audio>
            </figure>
        )
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
    formatTime(second){
        var h=0,i=0,s=parseInt(second);
        if(s>60){
            i=parseInt(s/60);
            s=parseInt(s%60);
            if(i > 60) {
                h=parseInt(i/60);
                i = parseInt(i%60);
            }
        }
        // 补零
        const zero=(v)=> (v>>0)<10?"0"+v:v;
        return [zero(h),zero(i),zero(s)].join(":");
    };
    stopAll = (target) => {
        target.stopPropagation()
        target.preventDefault()
    }
    getBoundingClientRect = () => {
        const ele = this.dom.querySelector('.progress')
        const { left } = ele.getBoundingClientRect()
        return {
            left
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
        this.setState({ isLoop: true })
        this.audio.loop = true
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
            this.pauseAudio()
        } else {
            this.getAudioLength();
            this.loadAudio();
            this.props.audioPlay && this.props.audioPlay(this.audio.currentTime,this.audio.duration)
        }
    }
    //暂停
    pauseAudio = () => {
        this.audio.pause()
        this.setState({ playing: false })
        this.props.audioPause && this.props.audioPause(this.audio.currentTime,this.audio.duration)
    }
    //加载音频
    loadAudio = () => {
        if (this.audio.readyState == 4 && this.audio.networkState != 3) {
            this.setState({ playing: true})
            this.audio.play()
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
        this.setState({ playing: false })
        this.props.audioEnded && this.props.audioEnded(this.audio.duration)
    }
    //播放进度更新
    audioTimeUpdate = () => {
        const currentTime = this.audio.currentTime
        this.setState({currentTime})
        this.props.audioProgress && this.props.audioProgress(currentTime,this.audio.duration)
    }
    //音量改变
    audioSoundChange = (e) => {
        this.setAudioVolume(e.target.value)
    }
    audioVolumeChange = () => {
        if (this.audio.volume <= 0) {
            this.setState({isMute: true})
        } else {
            this.setState({isMute: false})
        }
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
    componentDidMount() {
        this.dom = ReactDOM.findDOMNode(this)
        this.progress = this.dom.querySelector('.progress')
        this.audio = this.dom.querySelector('audio')
        this.audio.addEventListener('waiting', this.loadAudio)
        this.audio.addEventListener('canplay', this.onPlay)
        this.audio.addEventListener('error', this.loadAudioError)
        this.audio.addEventListener('ended', this.audioEnd)
        this.audio.addEventListener('timeupdate', this.audioTimeUpdate)
        this.audio.addEventListener('volumechange', this.audioVolumeChange)
        this.toggleMode(this.props.mode)
    }
}