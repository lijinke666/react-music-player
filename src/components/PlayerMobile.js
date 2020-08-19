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
  themeSwitch,
  progressBar,
  openAudioListsPanel,
  audioPrevPlay,
  audioNextPlay,
  playMode,
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
  icon,
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
        {icon.close}
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
        icon.loading
      ) : (
        <>
          <span
            className="group prev-audio"
            title="Previous track"
            onClick={audioPrevPlay}
          >
            {icon.prev}
          </span>
          <span
            className="group play-btn"
            title={playing ? 'Click to pause' : 'Click to play'}
            onClick={onPlay}
          >
            {playing ? icon.pause : icon.play}
          </span>
          <span
            className="group next-audio"
            title="Next track"
            onClick={audioNextPlay}
          >
            {icon.next}
          </span>
        </>
      )}
    </div>
    <div className={`${prefix}-operation group`}>
      <ul className="items">
        {[playMode, icon.download, icon.reload, LyricIcon]
          .filter(Boolean)
          .map((item) => (
            <li className="item" key={item.props.className}>
              {item}
            </li>
          ))}
        {extendsContent}
        <li className="item" onClick={openAudioListsPanel}>
          {icon.playLists}
        </li>
      </ul>
    </div>
  </div>
)

PlayerMobile.defaultProps = {
  icon: {},
}

export default PlayerMobile
