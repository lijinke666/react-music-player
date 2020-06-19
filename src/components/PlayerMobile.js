import React from 'react'
import cls from 'classnames'
import PlayModeTip from './PlayModeTip'

const prefix = 'react-jinke-music-player-mobile'

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
  LyricIcon,
  onCoverClick,
  autoHiddenCover,
}) => (
  <div className={cls(prefix, { 'default-bg': !glassBg, 'glass-bg': glassBg })}>
    <PlayModeTip
      prefix={prefix}
      visible={playModeTipVisible}
      title={playMode}
      text={currentPlayModeName}
    />
    <div className={`${prefix}-header group`}>
      <div className={`${prefix}-header-left`} />
      <div className={`${prefix}-header-title`}>{name}</div>
      <div className={`${prefix}-header-right`} onClick={onClose}>
        {closeIcon}
      </div>
    </div>
    <div className={`${prefix}-singer text-center group`}>
      <span className={`${prefix}-singer-name`}>{singer}</span>
    </div>
    <div className={`${prefix}-switch text-center group`}>{themeSwitch}</div>
    {/* lgtm [js/trivial-conditional] */}
    {(!autoHiddenCover || (autoHiddenCover && cover)) && (
      <div
        className={`${prefix}-cover text-center`}
        onClick={() => onCoverClick()}
      >
        <img
          src={cover}
          alt="cover"
          className={cls('cover', {
            'img-rotate-pause': pause || !playing || !cover,
          })}
        />
      </div>
    )}
    <div className={`${prefix}-progress group`}>
      <span className="current-time">{loading ? '--' : currentTime}</span>
      {progressBar}
      <span className="duration text-right">{loading ? '--' : duration}</span>
    </div>
    <div className={`${prefix}-toggle text-center group`}>
      {loading ? (
        loadingIcon
      ) : (
        <>
          <span
            className="group prev-audio"
            title="Previous track"
            onClick={audioPrevPlay}
          >
            {prevAudioIcon}
          </span>
          <span
            className="group play-btn"
            title={playing ? 'Click to pause' : 'Click to play'}
            onClick={onPlay}
          >
            {playing ? pauseIcon : playIcon}
          </span>
          <span
            className="group next-audio"
            title="Next track"
            onClick={audioNextPlay}
          >
            {nextAudioIcon}
          </span>
        </>
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
        {extendsContent}
        <li className="item" onClick={openAudioListsPanel}>
          {playListsIcon}
        </li>
      </ul>
    </div>
  </div>
)

export default PlayerMobile
