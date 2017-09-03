import React from "react"
import CloseBtn from "react-icons/lib/md/close"
import NotContent from "react-icons/lib/md/library-music"
import PlayIcon from "react-icons/lib/md/play-arrow"
import PauseIcon from "react-icons/lib/md/pause"
import classNames from "classnames"

const AudioListsPanel = ({ 
    audioLists, 
    visible, 
    notContentText, 
    onCancel,
    onPlay,
    pause,
    playId
 }) => (
    <div
      className={classNames("audio-lists-panel", { "show": visible })} key="audio-list-panel"
    >
      <div className="audio-lists-panel-header">
        <h2 className="title">
          <span>播放列表/</span>
          <span className="num" key="num">{audioLists.length}</span>
          <span className="close-btn" onClick={onCancel}><CloseBtn /></span>
        </h2>
      </div>
      <div 
        className={classNames("audio-lists-panel-content",{"no-content":audioLists.length < 1}) } 
        key="audio-lists-panel-content"
      >
        {
          audioLists.length >= 1
            ? <ul>
                {
                    audioLists.map((audio,i)=>{
                        const {
                          name,
                        } = audio
                        return (
                            <li title={pause ? ' Click to play' : 'Click to pause'} className={classNames("audio-item",{"playing":playId === i},{"pause":pause})} key={i} onClick={()=>onPlay(i)}>
                                <span className="group player-status" key="player-status">
                                  <span className="player-icons" key={`player-icons-${i}`}>
                                  {
                                    playId === i
                                    ? pause ? <PauseIcon/> : <PlayIcon/>
                                    : undefined
                                  }
                                  </span>
                                </span>
                                <span className="group player-name" key="player-name">
                                  {name}
                                </span>
                                <span className="group player-time">
                                  02:89
                                </span>     
                            </li>
                        )
                    })
                }
            </ul>
            : <div>
              <span><NotContent /></span>
              <span className="no-data" key="no-data">{notContentText}</span>
            </div>
        }
      </div>
    </div>
  )

  export default AudioListsPanel