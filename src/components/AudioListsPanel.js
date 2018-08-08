import React, { Fragment } from "react";
import cls from "classnames";
import NotContent from "react-icons/lib/md/library-music";
import ReactDragListView from "react-drag-listview/lib/ReactDragListView";

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
  isMobile,
  panelTitle,
  panelToggleAnimate,
  glassBg,
  remove,
  removeId,
  audioListsDragEnd
}) => (
  <div
    className={cls("audio-lists-panel", panelToggleAnimate, {
      "glass-bg": glassBg
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
          {...{ [isMobile ? "onTouchStart" : "onClick"]: onCancel }}
        >
          {closeIcon}
        </span>
        {remove ? (
          <Fragment>
            <span className="line" key="line" />
            <span
              key="delete-btn"
              className="delete-btn"
              title="Delete audio lists"
              {...{ [isMobile ? "onTouchStart" : "onClick"]: onDelete() }}
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
      className={cls("audio-lists-panel-content", {
        "no-content": audioLists.length < 1
      })}
      key="audio-lists-panel-content"
    >
      {audioLists.length >= 1 ? (
        <ReactDragListView
          nodeSelector="li"
          handleSelector=".player-name"
          lineClassName=".audio-lists-panel-drag-line"
          onDragEnd={audioListsDragEnd}
        >
          <ul>
            {audioLists.map((audio, i) => {
              const { name, singer } = audio;
              return (
                <li
                  key={i}
                  title={
                    pause
                      ? "Click to play"
                      : playId === i
                        ? "Click to pause"
                        : "Click to play"
                  }
                  className={cls(
                    "audio-item",
                    { playing: playId === i },
                    { pause },
                    { remove: removeId === i }
                  )}
                  {...{
                    [isMobile ? "onTouchStart" : "onClick"]: () => onPlay(i)
                  }}
                >
                  <span className="group player-status" key="player-status">
                    <span className="player-icons" key={`player-icons-${i}`}>
                      {playId === i && loading
                        ? loading
                        : playId === i
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
                      {...{
                        [isMobile ? "onTouchStart" : "onClick"]: onDelete(i)
                      }}
                    >
                      {closeIcon}
                    </span>
                  ) : (
                    undefined
                  )}
                </li>
              );
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
);

export default AudioListsPanel;
