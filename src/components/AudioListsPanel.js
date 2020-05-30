import React from 'react'
import cls from 'classnames'
import ReactDragListView from 'react-drag-listview/lib/ReactDragListView'
import { NotContentIcon, ArrowDownIcon } from './Icon'

const AudioListsPanel = ({
  audioLists,
  onCancel,
  onDelete,
  onPlay,
  pause,
  playId,
  loading,
  playIcon,
  pauseIcon,
  closeIcon,
  deleteIcon,
  panelToggleAnimate,
  glassBg,
  remove,
  removeId,
  audioListsDragEnd,
  isMobile,
  locale,
}) => (
  <div
    className={cls('audio-lists-panel', panelToggleAnimate, {
      'glass-bg': glassBg,
    })}
  >
    <div className="audio-lists-panel-header">
      <h2 className="audio-lists-panel-header-title">
        <span>{locale.playListsText} / </span>
        <span className="audio-lists-panel-header-num">
          {audioLists.length}
        </span>
        <span
          className="audio-lists-panel-header-close-btn"
          title={locale.closeText}
          onClick={onCancel}
        >
          {isMobile ? <ArrowDownIcon /> : closeIcon}
        </span>
        {remove && (
          <>
            <span className="audio-lists-panel-header-line" />
            <span
              className="audio-lists-panel-header-delete-btn"
              title={locale.removeAudioListsText}
              onClick={onDelete()}
            >
              {deleteIcon}
            </span>
          </>
        )}
      </h2>
    </div>
    <div
      className={cls('audio-lists-panel-content', {
        'no-content': audioLists.length < 1,
      })}
    >
      {audioLists.length >= 1 ? (
        <ReactDragListView
          nodeSelector="li"
          handleSelector=".player-name"
          lineClassName="audio-lists-panel-drag-line"
          onDragEnd={audioListsDragEnd}
        >
          <ul>
            {audioLists.map((audio) => {
              const { name, singer } = audio
              const playing = playId === audio.id
              return (
                <li
                  key={audio.id}
                  title={
                    pause
                      ? locale.clickToPlayText
                      : playing
                      ? locale.clickToPauseText
                      : locale.clickToPlayText
                  }
                  className={cls(
                    'audio-item',
                    { playing },
                    { pause },
                    { remove: removeId === audio.id },
                  )}
                  onClick={() => onPlay(audio.id)}
                >
                  <span className="group player-status">
                    <span className="player-icons">
                      {playing && loading
                        ? loading
                        : playing
                        ? pause
                          ? playIcon
                          : pauseIcon
                        : undefined}
                    </span>
                  </span>
                  <span className="group player-name">{name}</span>
                  <span className="group player-singer">{singer}</span>
                  {remove && (
                    <span
                      className="group player-delete"
                      title={locale.clickToDeleteText(name)}
                      onClick={onDelete(audio.id)}
                    >
                      {closeIcon}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </ReactDragListView>
      ) : (
        <>
          <span>
            <NotContentIcon />
          </span>
          <span className="no-data">{locale.notContentText}</span>
        </>
      )}
    </div>
  </div>
)

export default AudioListsPanel
