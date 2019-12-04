import React, { Fragment } from 'react'
import cls from 'classnames'
import NotContent from 'react-icons/lib/md/library-music'
import ArrowDownIcon from 'react-icons/lib/fa/angle-double-down'
import ReactDragListView from 'react-drag-listview/lib/ReactDragListView'

const AudioListsPanel = ({
  audioLists,
  notContentText,
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
  panelTitle,
  panelToggleAnimate,
  glassBg,
  remove,
  removeId,
  audioListsDragEnd,
  isMobile
}) => (
  <div
    className={cls('audio-lists-panel', panelToggleAnimate, {
      'glass-bg': glassBg
    })}
    key="audio-list-panel"
  >
    <div className="audio-lists-panel-header">
      <h2 className="title">
        <span key="panel-title">{panelTitle} / </span>
        <span className="num" key="num">
          {audioLists.length}
        </span>
        <span
          key="close-btn"
          className="close-btn"
          title="Close"
          onClick={onCancel}
        >
          {isMobile ? <ArrowDownIcon /> : closeIcon}
        </span>
        {remove ? (
          <Fragment>
            <span className="line" key="line" />
            <span
              key="delete-btn"
              className="delete-btn"
              title="Delete audio lists"
              onClick={onDelete()}
            >
              {deleteIcon}
            </span>
          </Fragment>
        ) : (
          undefined
        )}
      </h2>
    </div>
    <div
      className={cls('audio-lists-panel-content', {
        'no-content': audioLists.length < 1
      })}
      key="audio-lists-panel-content"
    >
      {audioLists.length >= 1 ? (
        <ReactDragListView
          nodeSelector="li"
          handleSelector=".player-name"
          lineClassName="audio-lists-panel-drag-line"
          onDragEnd={audioListsDragEnd}
        >
          <ul>
            {audioLists.map((audio, i) => {
              const { name, singer } = audio
              const playing = playId === audio.id
              return (
                <li
                  key={i}
                  title={
                    pause
                      ? 'Click to play'
                      : playing
                      ? 'Click to pause'
                      : 'Click to play'
                  }
                  className={cls(
                    'audio-item',
                    { playing },
                    { pause },
                    { remove: removeId === audio.id }
                  )}
                  onClick={() => onPlay(audio.id)}
                >
                  <span className="group player-status" key="player-status">
                    <span className="player-icons" key={`player-icons-${i}`}>
                      {playing && loading
                        ? loading
                        : playing
                        ? pause
                          ? playIcon
                          : pauseIcon
                        : undefined}
                    </span>
                  </span>
                  <span className="group player-name" key="player-name">
                    {name}
                  </span>
                  <span className="group player-time" key="player-time">
                    {singer}
                  </span>
                  {remove ? (
                    <span
                      className="group player-delete"
                      key="player-delete"
                      title={`Click to delete ${name}`}
                      onClick={onDelete(audio.id)}
                    >
                      {closeIcon}
                    </span>
                  ) : (
                    undefined
                  )}
                </li>
              )
            })}
          </ul>
        </ReactDragListView>
      ) : (
        <Fragment>
          <span key="no-content">
            <NotContent />
          </span>
          <span className="no-data" key="no-data">
            {notContentText}
          </span>
        </Fragment>
      )}
    </div>
  </div>
)

export default AudioListsPanel
