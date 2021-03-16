import cls from 'classnames'
import React, { memo } from 'react'
import { PLAYER_KEY } from '../config/player'
import SORTABLE_CONFIG from '../config/sortable'

const AudioListsPanel = ({
  audioLists,
  onCancel,
  onDelete,
  onPlay,
  playId,
  loading,
  panelToggleAnimate,
  glassBg,
  remove,
  removeId,
  isMobile,
  locale,
  icon,
  playing,
}) => (
  <div
    className={cls('audio-lists-panel', panelToggleAnimate, {
      'audio-lists-panel-mobile': isMobile,
      'glass-bg': glassBg,
    })}
  >
    <div className="audio-lists-panel-header">
      <h2 className="audio-lists-panel-header-title">
        <span>{locale.playListsText} / </span>
        <span className="audio-lists-panel-header-num">
          {audioLists.length}
        </span>
        <span className="audio-lists-panel-header-actions">
          {remove && (
            <>
              <span
                className="audio-lists-panel-header-delete-btn"
                title={locale.removeAudioListsText}
                onClick={onDelete()}
              >
                {icon.delete}
              </span>
              <span className="audio-lists-panel-header-line" />
            </>
          )}
          <span
            className="audio-lists-panel-header-close-btn"
            title={locale.closeText}
            onClick={onCancel}
          >
            {isMobile ? icon.packUpPanelMobile : icon.close}
          </span>
        </span>
      </h2>
    </div>
    <div
      className={cls('audio-lists-panel-content', {
        'no-content': audioLists.length < 1,
      })}
    >
      {audioLists.length >= 1 ? (
        <ul className={SORTABLE_CONFIG.selector}>
          {audioLists.map((audio) => {
            const { name, singer } = audio
            const audioId = audio[PLAYER_KEY]
            const isCurrentPlaying = playId === audioId
            return (
              <li
                key={audioId}
                title={
                  !playing
                    ? locale.clickToPlayText
                    : isCurrentPlaying
                    ? locale.clickToPauseText
                    : locale.clickToPlayText
                }
                className={cls(
                  'audio-item',
                  { playing: isCurrentPlaying },
                  { pause: !playing },
                  { remove: removeId === audioId },
                )}
                onClick={() => onPlay(audioId)}
              >
                <span className="group player-status">
                  <span className="player-icons">
                    {isCurrentPlaying && loading
                      ? icon.loading
                      : isCurrentPlaying
                      ? playing
                        ? icon.pause
                        : icon.play
                      : undefined}
                  </span>
                </span>
                <span className="group player-name" title={name}>
                  {name}
                </span>
                <span className="group player-singer" title={singer}>
                  {singer}
                </span>
                {remove && (
                  <span
                    className="group player-delete"
                    title={locale.clickToDeleteText(name)}
                    onClick={onDelete(audioId)}
                  >
                    {icon.close}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      ) : (
        <>
          <span>{icon.empty}</span>
          <span className="no-data">
            {locale.emptyText || locale.notContentText}
          </span>
        </>
      )}
    </div>
  </div>
)

export default memo(AudioListsPanel)
