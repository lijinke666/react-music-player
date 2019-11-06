import React, { Fragment } from "react";
import cls from "classnames";

const prefix = "react-jinke-music-player-mobile";

export const PlayModeTip = ({ visible, title, text }) => (
  <div className={cls(`${prefix}-play-model-tip`, { show: visible })}>
    <span className="title">{title}</span>
    <span className="text">{text}</span>
  </div>
);

const PlayerMobile = ({
  name,
  cover,
  singer,
  playing,
  duration,
  currentTime,
  loading,
  loadingIcon,
  themeSwitch,
  progressBar,
  openAudioListsPanel,
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
  playModeTipVisible,
  currentPlayModeName,
  extendsContent,
  onPlay,
  glassBg,
  LyricIcon
}) => (
  <div className={cls(prefix, { "default-bg": !glassBg, "glass-bg": glassBg })}>
    <PlayModeTip
      visible={playModeTipVisible}
      title={playMode}
      text={currentPlayModeName}
    />
    <div className={`${prefix}-header group`}>
      <div className="left item" />
      <div className="title" key="audio-title">
        {name}
      </div>
      <div className="right item" onClick={onClose}>
        {closeIcon}
      </div>
    </div>
    <div className={`${prefix}-singer text-center group`}>
      <span className="name" key="singer-name">
        {singer}
      </span>
    </div>
    <div className={`${prefix}-switch text-center group`}>{themeSwitch}</div>
    <div className={`${prefix}-cover text-center`}>
      <img
        src={cover}
        alt="cover"
        key="cover"
        className={cls("cover", {
          "img-rotate-pause": pause || !playing || !cover
        })}
      />
    </div>
    <div className={`${prefix}-progress group`}>
      <span key="current-time" className="current-time">
        {loading ? "--" : currentTime}
      </span>
      {progressBar}
      <span key="duration" className="duration text-right">
        {loading ? "--" : duration}
      </span>
    </div>
    <div className={`${prefix}-toggle text-center group`}>
      {loading ? (
        loadingIcon
      ) : (
        <Fragment>
          <span
            className="group prev-audio"
            title="Previous track"
            key="prev-audio"
            onClick={audioPrevPlay}
          >
            {prevAudioIcon}
          </span>
          <span
            className="group play-btn"
            title={playing ? "Click to pause" : "Click to play"}
            key="play-btn"
            onClick={onPlay}
          >
            {playing ? pauseIcon : playIcon}
          </span>
          <span
            className="group next-audio"
            title="Next track"
            key="next-audio"
            onClick={audioNextPlay}
          >
            {nextAudioIcon}
          </span>
        </Fragment>
      )}
    </div>
    <div className={`${prefix}-operation group`}>
      <ul className="items">
        {[playMode, downloadIcon, reloadIcon, LyricIcon]
          .filter(Boolean)
          .map((icon, i) => (
            <li className="item" key={i}>
              {icon}
            </li>
          ))}
        {extendsContent &&
          extendsContent.length >= 1 &&
          extendsContent.map((content, i) => {
            return (
              <li className="item" key={i}>
                {content}
              </li>
            );
          })}
        <li
          className="item"
          key="play-lists-icon"
          onClick={openAudioListsPanel}
        >
          {playListsIcon}
        </li>
      </ul>
    </div>
  </div>
);

export default PlayerMobile;
