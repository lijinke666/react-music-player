
import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import classNames from "classnames"

import "./styles.less"


export default class MusicPlayer extends React.Component {
    state = {
        toggle: false,       
        playing: false,      
        duration: 0,          
        currentTime: 0,        
        isLoop: false,         
        isMute: false,          
        soundValue: 100,
        isDown: false,      
    }
    static defaultProps = {
        mode: "mini",   
        controllerTitle:"Music",
        isUploadAudio:false,
        name:"name"
    }
    static PropTypes = {
        mode: PropTypes.oneOf(['mini', 'full']),     
        name: PropTypes.string,                       
        cover: PropTypes.string,                     
        musicSrc: PropTypes.string.isRequired, 
        controllerTitle:PropTypes.string,      
        isUploadAudio:PropTypes.bool                    
    }
    constructor(props) {
        super(props)
        this.audio = null       //当前播放器
        this.defaultMusciName = "今日音乐"
        this.mouseX = 0
    }
    render() {
        const {
            musicSrc,
            name,
            cover,
            mode,
            className,
            controllerTitle
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
                                <div key="setting" className="music-player-controller-setting">{toggle ? "关闭" : "展开"}</div>
                            </div>
                        )
                }
                {/*播放器*/}
                {
                    toggle
                        ? (
                            <div key="panel" className="music-player-panel translate">
                                <section className="panel-content" key="panel-content">
                                    <div className={classNames("img-content",{"img-rotate":playing})} key="img-content">
                                        <img key="img" src={cover} alt="" />
                                    </div>
                                    <div className="progressbar-content" key="progressbar-content">
                                        <span>{name}</span>
                                        <section>
                                            <span key="current-time" className="current-time">
                                                {/*Consider only the following songs for 10 minutes*/}
                                                {
                                                    (~~currentTime) < 60
                                                        ? `00:${(~~currentTime) < 10 ? `0${~~currentTime}` : ~~currentTime}`
                                                        : `0${~~(currentTime / 60)}:${(~~(currentTime % 60) < 10) ? `0${~~(currentTime % 60)}` : ~~(currentTime % 60)}`
                                                }
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
                                                {
                                                    (duration / 60) < 10
                                                        ? `0${(duration / 60).toFixed(2)}`
                                                        : `${(duration / 60).toFixed(2)}`
                                                }
                                            </span>
                                        </section>
                                    </div>
                                    <div className="player-content" key="player-content">
                                        <span className="play-btn" key="play-btn" onClick={this.onPlay}>
                                            {
                                                playing
                                                    ? <span>暂停</span>
                                                    : <span>播放</span>
                                            }
                                        </span>
                                        <span className="play-setting" key="play-setting">
                                            <span>设置</span>
                                            <ul className="play-setting-items">
                                                <li className={classNames("item", { "active": isLoop })} key="setting1" onClick={this.audioLoop}>
                                                    <span>循环</span>
                                                </li>
                                                <li className="item reload-btn" key="setting2" onClick={this.audioReload}>
                                                    <span>重放</span>
                                                </li>
                                            </ul>
                                        </span>
                                        <span className="play-sounds" key="play-sound">
                                            {
                                                isMute
                                                    ? <span>静音</span>
                                                    : <span>音量</span>
                                            }
                                            <input type="range" value={soundValue} className="sound-operation" key="range" onChange={this.audioSoundChange} />
                                        </span>
                                        {
                                            mode === 'full'
                                                ? undefined
                                                : <span className="hide-panel" key="hide-panel-btn" onClick={this.onHidePanel}>
                                                    收起
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
        }
    }
    //暂停
    pauseAudio = () => {
        this.audio.pause()
        this.setState({ playing: false })
    }
    //加载音频
    loadAudio = () => {
        if (this.audio.readyState == 4 && this.audio.networkState != 3) {
            this.setState({ playing: true })
            this.audio.play()
        }
    }
    //获取音频长度
    getAudioLength = () => {
        this.setState({
            duration: this.audio.duration - 11
        })
    }
    loadAudioError = () => {
        this.setState({ playing: false })
        if(confirm('加载音频失败,请刷新重试')){
           this.onPlay()
        }
    }
    //音频播放结束
    audioEnd = () => {
        this.setState({ playing: false })
    }
    //播放进度更新
    audioTimeUpdate = () => {
        const currentTime = this.audio.currentTime
        this.setState({
            currentTime
        })
    }
    //音量控制
    audioSoundChange = (e) => {
        const value = e.target.value
        this.audio.volume = value / 100
        this.setState({
            soundValue: value
        })
    }
    //音量改变
    audioVolumeChange = () => {
        if (this.audio.volume <= 0) {
            this.setState({
                isMute: true
            })
        } else {
            this.setState({
                isMute: false
            })
        }
    }
    //静音
    onMute = () => {
        this.setState({
            isMute: true,
            soundValue: 0
        })
        this.audio.volume = 0
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