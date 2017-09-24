import React from "react"
import classNames from "classnames"

import "./playerMobileStyle.less"

const PlayModeTip = ({
    visibile,
    title,
    text
})=>(
    <div className={classNames("react-jinke-music-player-mobile-play-model-tip",{"show":visibile})}>
        <span className="title">{title}</span>
        <span className="text">{text}</span>
    </div>
)


const PlayerMobile = ({
    name,
    cover,
    singer,
    playing,
    duration,
    currentTime,
    loading,
    themeSwitch,
    progressBar,
    progressChange,
    openAudioListsPanel,
    progressAfterChange,
    audioPrevPlay,
    audioNextPlay,
    prevAudioIcon,
    nextAudioIcon,
    playIcon,
    pauseIcon,
    playMode,
    downloadIcon,
    reloadIcon,
    playListsIcon,
    closeIcon,
    onClose,
    pause,
    tipIcon,
    playModeTipVisible,
    currentPlayModeName,
    onPlay
    }) => (
        <div className="react-jinke-music-player-mobile">
            <PlayModeTip visibile ={playModeTipVisible} title={tipIcon} text={currentPlayModeName}/>
            <div className="react-jinke-music-player-mobile-header group">
                <div className="left item"></div>
                <div className="title" key="audio-title">{name}</div>
                <div className="right item" onTouchStart={onClose}>{closeIcon}</div>
            </div>
            <div className="react-jinke-music-player-mobile-singer text-center group">
                <span className="name" key="singer-name">{singer}</span>
            </div>
            <div className="react-jinke-music-player-mobile-swtich text-center group">
                {themeSwitch}
            </div>
            <div className="react-jinke-music-player-mobile-cover text-center">
                <img src={cover} alt="cover" key="cover" className={classNames("cover",{"img-rotate-pause":pause})} />
            </div>
            <div className="react-jinke-music-player-mobile-progress group">
                <span key="current-time" className="current-time">
                    {loading ? '--' : currentTime}
                </span>
                {progressBar}
                <span key="duration" className="duration text-right">
                    {loading ? '--' : duration}
                </span>
            </div>
            <div className="react-jinke-music-player-mobile-toggle text-center group">
                <span
                    className="group prev-audio"
                    title="previous track"
                    onTouchStart={audioPrevPlay}
                >
                    {prevAudioIcon}
                </span>
                <span
                    className="group play-btn"
                    key="play-btn"
                    title="play"
                    onTouchStart={onPlay}
                >
                    {
                        playing ? pauseIcon : playIcon
                    }

                </span>
                <span
                    className="group next-audio"
                    title="next track"
                    onTouchStart={audioNextPlay}
                >
                    {nextAudioIcon}
                </span>
            </div>
            <div className="react-jinke-music-player-mobile-operation group">
                <ul className="items">
                    <li className="item">{playMode}</li>
                    <li className="item">{downloadIcon}</li>
                    <li className="item">{reloadIcon}</li>
                    <li className="item" onTouchStart={openAudioListsPanel}>{playListsIcon}</li>
                </ul>
            </div>
        </div>
    )

export default PlayerMobile