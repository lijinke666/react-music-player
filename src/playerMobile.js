import React, { PureComponent, PropTypes } from "react"
import classNames from "classnames"
import CloseBtn from "react-icons/lib/md/close"
import Switch from "rc-switch"
import Slider from 'rc-slider/lib/Slider'
import { formatTime, sliderBaseOptions } from "./index"

import NextAudioIcon from "react-icons/lib/md/skip-next"
import PrevAudioIcon from "react-icons/lib/md/skip-previous"
import FaPlayCircle from "react-icons/lib/fa/play-circle"
// import FaPlayCircle from "react-icons/lib/md/play-circle-outline"
import FaPauseCircle from "react-icons/lib/fa/pause-circle"
// import FaPauseCircle from "react-icons/lib/md/pause-circle-outline"

import 'rc-switch/assets/index.css'
import 'rc-slider/assets/index.css'
import "./playerMobileStyle.less"


const PlayerMobile = ({
    name,
    cover,
    singer,
    playing,
    duration,
    currentTime,
    loading,
    progressChange,
    progressAfterChange,
    audioPrevPlay,
    audioNextPlay,
    onPlay
    }) => (
        <div className="react-jinke-music-player-mobile">
            <div className="react-jinke-music-player-mobile-header">
                <div className="left item"></div>
                <div className="title" key="audio-title">{name}</div>
                <div className="right item"><CloseBtn /></div>
            </div>
            <div className="react-jinke-music-player-mobile-singer text-center">
                <span className="name" key="singer-name">{singer}</span>
            </div>
            <div className="react-jinke-music-player-mobile-swtich text-center">
                <Switch
                    className="theme-switch"
                />
            </div>
            <div className="react-jinke-music-player-mobile-cover text-center">
                <img src={cover} alt="cover" key="cover" className="cover" />
            </div>
            <div className="react-jinke-music-player-mobile-progress">
                <span key="current-time" className="current-time">
                    {loading ? '--' : formatTime(currentTime)}
                </span>

                <Slider
                    className="progress-bar"
                    max={Math.ceil(duration)}
                    defaultValue={0}
                    value={currentTime}
                    onChange={progressChange}
                    onAfterChange={progressAfterChange}
                    {...sliderBaseOptions}
                />
                <span key="duration" className="duration text-right">
                    {loading ? '--' : formatTime(duration)}
                </span>
            </div>
            <div className="react-jinke-music-player-mobile-toggle text-center">
                <span
                    className="group prev-audio"
                    title="previous track"
                    onTouchStart={audioPrevPlay}
                >
                    <PrevAudioIcon />
                </span>
                <span
                    className="group play-btn"
                    key="play-btn"
                    title="play"
                    onTouchStart={onPlay}
                >
                    {
                        playing
                            ? <span><FaPauseCircle /></span>
                            : <span><FaPlayCircle /></span>
                    }
                </span>
                <span
                    className="group next-audio"
                    title="next track"
                    onTouchStart={audioNextPlay}
                >
                    <NextAudioIcon />
                </span>
            </div>
        </div>
    )

export default PlayerMobile