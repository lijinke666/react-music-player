/**
 * @version 3.6.0
 * @name react-jinke-music-player
 * @description Maybe the best beautiful HTML5 responsive player component for react :)
 * @author Jinke.Li <1359518268@qq.com>
 * @FIXME: 播放状态记忆功能有bug 播放列表  状态图标不对
 * @TODO: 播放列表可拖拽排序
 * @TODO: 播放列表增加删除功能
 */

import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isMobile from "is-mobile";
import Slider from "rc-slider/lib/Slider";
import Switch from "rc-switch";
import { formatTime, createRandomNum, arrayEqual } from "./utils";
import AudioListsPanel from "./components/AudioListsPanel";
import AudioPlayerMobile from "./components/PlayerMobile";
import Draggable from "react-draggable";

import FaHeadphones from "react-icons/lib/fa/headphones";
import FaMinusSquareO from "react-icons/lib/fa/minus-square-o";
import FaPlayCircle from "react-icons/lib/fa/play-circle";
import FaPauseCircle from "react-icons/lib/fa/pause-circle";
import Reload from "react-icons/lib/fa/refresh";
import MdVolumeDown from "react-icons/lib/md/volume-up";
import MdVolumeMute from "react-icons/lib/md/volume-off";
import Download from "react-icons/lib/fa/cloud-download";
import LoadIcon from "react-icons/lib/fa/spinner";
import LoopIcon from "react-icons/lib/md/repeat-one";
import RepeatIcon from "react-icons/lib/md/repeat";
import ShufflePlayIcon from "react-icons/lib/ti/arrow-shuffle";
import OrderPlayIcon from "react-icons/lib/md/view-headline";
import PlayLists from "react-icons/lib/md/queue-music";
import NextAudioIcon from "react-icons/lib/md/skip-next";
import PrevAudioIcon from "react-icons/lib/md/skip-previous";
import CloseBtn from "react-icons/lib/md/close";

import "rc-slider/assets/index.css";
import "rc-switch/assets/index.css";

const ISMOBILE = isMobile();

const AnimatePlayIcon = () => (
  <FaPlayCircle className="react-jinke-music-player-play-icon" />
);
const AnimatePauseIcon = () => (
  <FaPauseCircle className="react-jinke-music-player-pause-icon" />
);

const Load = () => (
  <span className="loading group" key="loading">
    <LoadIcon />
  </span>
);

const PlayModel = ({ visible, value }) => (
  <div
    className={classNames("play-mode-title", {
      "play-mode-title-visible": visible
    })}
    key="play-mode-title"
  >
    {value}
  </div>
);

//迷你模式进度条
const CircleProcessBar = ({ progress = 0, r = 40 } = {}) => {
  const _progress = progress.toFixed(2);
  const perimeter = Math.PI * 2 * r;
  const strokeDasharray = `${~~(perimeter * _progress)} ${~~(
    perimeter *
    (1 - _progress)
  )}`;
  return (
    <svg className="audio-circle-process-bar">
      <circle
        cx={r}
        cy={r}
        r={r - 1}
        fill="none"
        className="stroke"
        strokeDasharray={strokeDasharray}
      />
      <circle
        cx={r}
        cy={r}
        r={r - 1}
        fill="none"
        className="bg"
        strokeDasharray="0 1000"
      />
    </svg>
  );
};

const sliderBaseOptions = {
  min: 0,
  step: 0.01,
  trackStyle: { backgroundColor: "#31c27c" },
  handleStyle: { backgroundColor: "#31c27c", border: "2px solid #fff" }
};

export default class ReactJkMusicPlayer extends PureComponent {
  initPlayId = -1; //初始播放id
  NETWORK_STATE = {
    NETWORK_EMPTY: 0, //未初始化
    NETWORK_IDLE: 1, //未使用网络 304 缓存
    NETWORK_LOADING: 2, //浏览器正在下载数据
    NETWORK_NO_SOURCE: 3 //未找到资源
  };
  READY_SUCCESS_STATE = 4;
  state = {
    playId: this.initPlayId, //播放id
    name: "", //当前歌曲名
    cover: "", //当前歌曲封面
    singer: "", //当前歌手
    musicSrc: "", //当前歌曲链接
    isMobile: ISMOBILE,
    toggle: false,
    pause: false,
    playing: false,
    duration: 0,
    currentTime: 0,
    isLoop: false,
    isMute: false,
    soundValue: 100,
    isDrag: false, //是否支持拖拽
    currentX: 0,
    currentY: 0,
    moveX: 0,
    moveY: 0,
    isMove: false,
    loading: false,
    audioListsPanelVisible: false,
    playModelNameVisible: false,
    theme: this.lightThemeName,
    extendsContent: [], //自定义扩展功能按钮
    playMode: "", //当前播放模式
    currentAudioVolume: 0, //当前音量  静音后恢复到之前记录的音量
    initAnimate: false,
    isInitAutoplay: false,
    loadProgress: 0
  };
  static defaultProps = {
    audioLists: [],
    theme: "dark",
    mode: "mini",
    playModeText: {
      order: "order",
      orderLoop: "orderLoop",
      singleLoop: "singleLoop",
      shufflePlay: "shufflePlay"
    },
    defaultPlayMode: "order",
    defaultPosition: {
      left: 0,
      top: 0
    },
    controllerTitle: <FaHeadphones />,
    panelTitle: "PlayList",
    closeText: "close",
    openText: "open",
    notContentText: "no music",
    checkedText: "",
    unCheckedText: "",
    once: false, //audioPlay 事件  是否只触发一次
    drag: true,
    toggleMode: true, //能换在迷你 和完整模式下 互相切换
    showMiniModeCover: true, //迷你模式下 是否显示封面图
    showDownload: true,
    showPlay: true,
    showReload: true,
    showPlayMode: true,
    showThemeSwitch: true,
    playModeTipVisible: false, //手机端切换播放模式
    autoPlay: true,
    defaultVolume: 100,
    showProgressLoadBar: true, //音频预加载进度
    seeked: true,
    playModeShowTime: 600, //播放模式提示 显示时间,
    bounds: "body", //移动边界
    showMiniProcessBar: false, //是否在迷你模式 显示进度条
    loadAudioErrorPlayNext: true, // 加载音频失败时 是否尝试播放下一首
    preload: false, //是否在页面加载后立即加载音频
    glassBg: true, //是否是毛玻璃效果
    remember: false //是否记住当前播放状态
  };
  static propTypes = {
    audioLists: PropTypes.array.isRequired,
    theme: PropTypes.oneOf(["dark", "light"]),
    mode: PropTypes.oneOf(["mini", "full"]),
    defaultPlayMode: PropTypes.oneOf([
      "order",
      "orderLoop",
      "singleLoop",
      "shufflePlay"
    ]),
    drag: PropTypes.bool,
    seeked: PropTypes.bool,
    autoPlay: PropTypes.bool,
    playModeText: PropTypes.object,
    panelTitle: PropTypes.string,
    closeText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    openText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    notContentText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    controllerTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    defaultPosition: PropTypes.shape({
      top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      left: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }),
    audioPlay: PropTypes.func,
    audioPause: PropTypes.func,
    audioEnded: PropTypes.func,
    audioAbort: PropTypes.func,
    audioVolumeChange: PropTypes.func,
    loadAudioError: PropTypes.func,
    audioProgress: PropTypes.func,
    audioSeeked: PropTypes.func,
    audioDownload: PropTypes.func,
    showDownload: PropTypes.bool,
    showPlay: PropTypes.bool,
    showReload: PropTypes.bool,
    showPlayMode: PropTypes.bool,
    showThemeSwitch: PropTypes.bool,
    showMiniModeCover: PropTypes.bool,
    toggleMode: PropTypes.bool,
    once: PropTypes.bool,
    extendsContent: PropTypes.array,
    checkedText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    unCheckedText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    defaultVolume: PropTypes.number,
    playModeShowTime: PropTypes.number,
    bounds: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    showMiniProcessBar: PropTypes.bool,
    loadAudioErrorPlayNext: PropTypes.bool,
    preload: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(["auto", "metadata", "none"])
    ]),
    glassBg: PropTypes.bool,
    remember: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.audio = null; //当前播放器
    this.lightThemeName = "light";
    this.darkThemeName = "dark";
    //模式配置
    this.toggleModeName = {
      full: "full",
      mini: "mini"
    };
    this.targetId = "music-player-controller";
    this.openPanelPeriphery = 1; //移动差值 在 这之间 认为是点击打开panel
    this.x = 0;
    this.y = 0;
    this.isDrag = false;

    const {
      playModeText: { order, orderLoop, singleLoop, shufflePlay }
    } = props;
    //播放模式配置
    this.PLAYMODE = {
      order: {
        key: "order",
        value: order
      },
      orderLoop: {
        key: "orderLoop",
        value: orderLoop
      },
      singleLoop: {
        key: "singleLoop",
        value: singleLoop
      },
      shufflePlay: {
        key: "shufflePlay",
        value: shufflePlay
      }
    };
    this._PLAY_MODE_ = Object.values(this.PLAYMODE);
    this._PLAY_MODE_LENGTH_ = this._PLAY_MODE_.length;
  }
  render() {
    const {
      className,
      controllerTitle,
      closeText,
      openText,
      notContentText,
      drag,
      style,
      showDownload,
      showPlay,
      showReload,
      showPlayMode,
      showThemeSwitch,
      panelTitle,
      checkedText,
      unCheckedText,
      audioLists,
      toggleMode,
      showMiniModeCover,
      extendsContent,
      defaultPlayMode,
      seeked,
      showProgressLoadBar,
      bounds,
      defaultPosition,
      showMiniProcessBar,
      preload,
      glassBg
    } = this.props;

    const {
      toggle,
      playing,
      duration,
      currentTime,
      isMute,
      soundValue,
      moveX,
      moveY,
      loading,
      audioListsPanelVisible,
      pause,
      theme,
      name,
      cover,
      singer,
      musicSrc,
      playId,
      isMobile,
      playMode,
      playModeTipVisible,
      playModelNameVisible,
      initAnimate,
      loadProgress
    } = this.state;

    const preloadState =
      preload === false || preload === "none"
        ? {}
        : preload === true
          ? { preload: "auto" }
          : { preload };

    const panelToggleAnimate = initAnimate
      ? { show: audioListsPanelVisible, hide: !audioListsPanelVisible }
      : { show: audioListsPanelVisible };

    const _playMode_ = this.PLAYMODE[playMode || defaultPlayMode];

    const currentPlayMode = _playMode_["key"];
    const currentPlayModeName = _playMode_["value"];

    const isShowMiniModeCover = showMiniModeCover
      ? {
          style: {
            backgroundImage: `url(${cover})`
          }
        }
      : {};

    const _currentTime = formatTime(currentTime);
    const _duration = formatTime(duration);

    const progressHandler = seeked
      ? {
          onChange: this.onHandleProgress,
          onAfterChange: this.audioSeeked
        }
      : {};
    //进度条
    const ProgressBar = (
      <Slider
        max={Math.ceil(duration)}
        defaultValue={0}
        value={currentTime}
        {...progressHandler}
        {...sliderBaseOptions}
      />
    );

    //下载按钮
    const DownloadComponent = showDownload ? (
      <span
        className="group audio-download"
        {...{ [ISMOBILE ? "onTouchStart" : "onClick"]: this.downloadAudio }}
      >
        <Download />
      </span>
    ) : (
      undefined
    );

    //主题开关
    const ThemeSwitchComponent = showThemeSwitch ? (
      <span className="group theme-switch">
        <Switch
          className="theme-switch"
          onChange={this.themeChange}
          checkedChildren={checkedText}
          unCheckedChildren={unCheckedText}
          checked={theme === this.lightThemeName}
        />
      </span>
    ) : (
      undefined
    );

    //重放
    const ReloadComponent = showReload ? (
      <span
        className="group reload-btn"
        {...(ISMOBILE
          ? { onTouchStart: this.audioReload }
          : { onClick: this.audioReload })}
        key="reload-btn"
        title="reload"
      >
        <Reload />
      </span>
    ) : (
      undefined
    );

    //播放模式
    const PlayModeComponent = showPlayMode ? (
      <span
        className={classNames("group loop-btn")}
        {...(ISMOBILE
          ? { onTouchStart: this.togglePlayMode }
          : { onClick: this.togglePlayMode })}
        key="play-mode-btn"
        title={this.PLAYMODE[currentPlayMode]["value"]}
      >
        {this.renderPlayModeIcon(currentPlayMode)}
      </span>
    ) : (
      undefined
    );

    const miniProcessBarR = isMobile ? 30 : 40

    const AudioController = (
      <div
        className={classNames("react-jinke-music-player")}
        key="react-jinke-music-player"
        style={defaultPosition}
      >
        <div className={classNames("music-player")} key="music-player">
          {showMiniProcessBar ? (
            <CircleProcessBar
              progress={currentTime / duration}
              r={miniProcessBarR}
            />
          ) : (
            undefined
          )}
          <div
            key="controller"
            id={this.targetId}
            className="scale music-player-controller"
            {...isShowMiniModeCover}
          >
            {loading ? (
              <Load />
            ) : (
              <Fragment>
                <span className="controller-title" key="controller-title">
                  {controllerTitle}
                </span>
                <div key="setting" className="music-player-controller-setting">
                  {toggle ? closeText : openText}
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );

    return (
      <div
        className={classNames(
          "react-jinke-music-player-main",
          {
            "light-theme": theme === this.lightThemeName,
            "dark-theme": theme === this.darkThemeName
          },
          className
        )}
        style={style}
      >
        {toggle && isMobile ? (
          <AudioPlayerMobile
            playing={playing}
            loading={loading}
            pause={pause}
            name={name}
            singer={singer}
            cover={cover}
            themeSwitch={ThemeSwitchComponent}
            duration={_duration}
            currentTime={_currentTime}
            progressBar={ProgressBar}
            onPlay={this.onPlay}
            currentPlayModeName={this.PLAYMODE[currentPlayMode]["value"]}
            playMode={PlayModeComponent}
            audioNextPlay={this.audioNextPlay}
            audioPrevPlay={this.audioPrevPlay}
            playListsIcon={<PlayLists />}
            reloadIcon={ReloadComponent}
            downloadIcon={DownloadComponent}
            nextAudioIcon={<NextAudioIcon />}
            prevAudioIcon={<PrevAudioIcon />}
            playIcon={<AnimatePlayIcon />}
            pauseIcon={<AnimatePauseIcon />}
            closeIcon={<CloseBtn />}
            loadingIcon={<Load />}
            playModeTipVisible={playModeTipVisible}
            openAudioListsPanel={this.openAudioListsPanel}
            onClose={this.onHidePanel}
            extendsContent={extendsContent}
            glassBg={glassBg}
          />
        ) : (
          undefined
        )}

        {toggle ? (
          undefined
        ) : drag ? (
          <Draggable
            bounds={bounds}
            position={{ x: moveX, y: moveY }}
            onDrag={this.controllerMouseMove}
            onStop={this.controllerMouseUp}
            onStart={this.controllerMouseMove}
          >
            {AudioController}
          </Draggable>
        ) : (
          <Fragment>{AudioController}</Fragment>
        )}
        {toggle ? (
          isMobile ? (
            undefined
          ) : (
            <div key="panel" className="music-player-panel translate">
              <section className="panel-content" key="panel-content">
                <div
                  className={classNames("img-content", "img-rotate", {
                    "img-rotate-pause": pause || !playing || !cover
                  })}
                  style={{ backgroundImage: `url(${cover})` }}
                  key="img-content"
                />
                <div
                  className="progress-bar-content"
                  key="progress-bar-content"
                >
                  <span className="audio-title">
                    {name} {singer ? `- ${singer}` : ""}
                  </span>
                  <section className="audio-main">
                    <span key="current-time" className="current-time">
                      {loading ? "--" : _currentTime}
                    </span>
                    <div className="progress-bar" key="progress-bar">
                      {showProgressLoadBar ? (
                        <div
                          className="progress-load-bar"
                          key="progress-load-bar"
                          style={{ width: `${Math.min(loadProgress, 100)}%` }}
                        />
                      ) : (
                        undefined
                      )}

                      {ProgressBar}
                    </div>
                    <span key="duration" className="duration">
                      {loading ? "--" : _duration}
                    </span>
                  </section>
                </div>
                <div className="player-content" key="player-content">
                  {/*播放按钮*/}
                  {loading ? (
                    <span>
                      <Load />
                    </span>
                  ) : showPlay ? (
                    <span className="group">
                      <span
                        className="group prev-audio"
                        title="previous track"
                        {...(ISMOBILE
                          ? { onTouchStart: this.audioPrevPlay }
                          : { onClick: this.audioPrevPlay })}
                      >
                        <PrevAudioIcon />
                      </span>
                      <span
                        className="group play-btn"
                        key="play-btn"
                        ref={node => (this.playBtn = node)}
                        {...(ISMOBILE
                          ? { onTouchStart: this.onPlay }
                          : { onClick: this.onPlay })}
                        title="play"
                      >
                        {playing ? (
                          <span>
                            <AnimatePauseIcon />
                          </span>
                        ) : (
                          <span>
                            <AnimatePlayIcon />
                          </span>
                        )}
                      </span>
                      <span
                        className="group next-audio"
                        title="next track"
                        {...(ISMOBILE
                          ? { onTouchStart: this.audioNextPlay }
                          : { onClick: this.audioNextPlay })}
                      >
                        <NextAudioIcon />
                      </span>
                    </span>
                  ) : (
                    undefined
                  )}

                  {/*重播*/}
                  {ReloadComponent}
                  {/*下载歌曲*/}
                  {DownloadComponent}
                  {/* 主题选择 */}
                  {ThemeSwitchComponent}

                  {/* 自定义扩展按钮 */}
                  {extendsContent && extendsContent.length >= 1
                    ? extendsContent.map((content, i) => content)
                    : undefined}

                  {/*音量控制*/}
                  <span
                    className="group play-sounds"
                    key="play-sound"
                    title="sounds"
                  >
                    {isMute ? (
                      <span
                        className="sounds-icon"
                        {...(ISMOBILE
                          ? { onTouchStart: this.onSound }
                          : { onClick: this.onSound })}
                      >
                        <MdVolumeMute />
                      </span>
                    ) : (
                      <span
                        className="sounds-icon"
                        {...(ISMOBILE
                          ? { onTouchStart: this.onMute }
                          : { onClick: this.onMute })}
                      >
                        <MdVolumeDown />
                      </span>
                    )}
                    <Slider
                      max={1}
                      value={soundValue}
                      onChange={this.audioSoundChange}
                      className="sound-operation"
                      {...sliderBaseOptions}
                    />
                  </span>

                  {/*播放模式*/}
                  {PlayModeComponent}

                  {/*播放列表按钮*/}
                  <span
                    className="group audio-lists-btn"
                    key="audio-lists-btn"
                    title="play lists"
                    {...(ISMOBILE
                      ? { onTouchStart: this.openAudioListsPanel }
                      : { onClick: this.openAudioListsPanel })}
                  >
                    <span className="audio-lists-icon">
                      <PlayLists />
                    </span>
                    <span className="audio-lists-num">{audioLists.length}</span>
                  </span>

                  {/*收起面板*/}
                  {toggleMode ? (
                    <span
                      className="group hide-panel"
                      key="hide-panel-btn"
                      {...(ISMOBILE
                        ? { onTouchStart: this.onHidePanel }
                        : { onClick: this.onHidePanel })}
                    >
                      <FaMinusSquareO />
                    </span>
                  ) : (
                    undefined
                  )}
                </div>
                {/* 播放模式提示框 */}
                <PlayModel
                  visible={playModelNameVisible}
                  value={currentPlayModeName}
                />
              </section>
            </div>
          )
        ) : (
          undefined
        )}
        {/* 播放列表面板 */}
        <AudioListsPanel
          playId={playId}
          pause={pause}
          loading={loading ? <Load /> : undefined}
          visible={audioListsPanelVisible}
          audioLists={audioLists}
          notContentText={notContentText}
          onPlay={this.audioListsPlay}
          onCancel={this.closeAudioListsPanel}
          playIcon={<AnimatePlayIcon />}
          pauseIcon={<AnimatePauseIcon />}
          closeIcon={<CloseBtn />}
          panelTitle={panelTitle}
          isMobile={ISMOBILE}
          panelToggleAnimate={panelToggleAnimate}
        />
        <audio
          key="audio"
          className="music-player-audio"
          {...preloadState}
          src={musicSrc}
          ref={node => (this.audio = node)}
        />
      </div>
    );
  }
  //播放模式切换
  togglePlayMode = () => {
    this.setState(({ playMode }) => {
      let index = this._PLAY_MODE_.findIndex(({ key }) => key === playMode);
      if (index === this._PLAY_MODE_LENGTH_ - 1) {
        return {
          playMode: this._PLAY_MODE_[0]["key"],
          playModelNameVisible: true,
          playModeTipVisible: true
        };
      } else {
        return {
          playMode: this._PLAY_MODE_[++index]["key"],
          playModelNameVisible: true,
          playModeTipVisible: true
        };
      }
    });
    clearTimeout(this.playModelTimer);
    this.playModelTimer = setTimeout(() => {
      this.setState({ playModelNameVisible: false, playModeTipVisible: false });
    }, this.props.playModeShowTime);
  };
  //渲染播放模式 对应按钮
  renderPlayModeIcon = playMode => {
    let IconNode = "";
    const animateName = "react-jinke-music-player-mode-icon";
    switch (playMode) {
      case this.PLAYMODE["order"]["key"]:
        IconNode = <OrderPlayIcon className={animateName} />;
        break;
      case this.PLAYMODE["orderLoop"]["key"]:
        IconNode = <RepeatIcon className={animateName} />;
        break;
      case this.PLAYMODE["singleLoop"]["key"]:
        IconNode = <LoopIcon className={animateName} />;
        break;
      case this.PLAYMODE["shufflePlay"]["key"]:
        IconNode = <ShufflePlayIcon className={animateName} />;
        break;
      default:
        IconNode = <OrderPlayIcon className={animateName} />;
    }
    return IconNode;
  };
  /**
   * 音乐列表面板选择歌曲
   * 上一首 下一首
   * 音乐结束
   * 通用方法
   * @tip: ignore 如果 为 true playId相同则不暂停 可是重新播放 适用于 随机播放 重新播放等逻辑
   */
  audioListsPlay = (playId, ignore = false) => {
    const { audioLists } = this.props;
    const { playId: currentPlayId, pause, playing } = this.state;

    if (Array.isArray(audioLists) && audioLists.length === 0) {
      /*eslint-disable no-console*/
      return console.warn("Your playlist has no songs. and cannot play !");
      /*eslint-disable no-console*/
    }
    //如果点击当前项 就暂停 或者播放
    if (playId === currentPlayId && !ignore) {
      this.setState({ pause: !pause, playing: !playing });
      return pause ? this.audio.play() : this._pauseAudio();
    }

    const { name, cover, musicSrc, singer } = audioLists[playId];

    this.setState(
      {
        name,
        cover,
        musicSrc,
        singer,
        playId,
        currentTime: 0,
        duration: 0,
        playing: false,
        loading: true,
        loadProgress: 0
      },
      () => {
        this.audio.load();
      }
    );
  };
  openAudioListsPanel = () => {
    this.setState(({ audioListsPanelVisible, initAnimate }) => ({
      initAnimate: true,
      audioListsPanelVisible: !audioListsPanelVisible
    }));
  };
  closeAudioListsPanel = e => {
    e.stopPropagation();
    this.setState({ audioListsPanelVisible: false });
  };
  themeChange = value => {
    this.setState({
      theme: value ? this.lightThemeName : this.darkThemeName
    });
  };
  downloadAudio = () => {
    const { name, musicSrc } = this.state;
    this.downloadNode = document.createElement("a");
    this.downloadNode.setAttribute("download", name);
    this.downloadNode.setAttribute("name", name);
    this.downloadNode.setAttribute("href", musicSrc);
    this.downloadNode.click();
    this.downloadNode = undefined;

    this.props.audioDownload &&
      this.props.audioDownload(this.getBaseAudioInfo());
  };
  controllerMouseMove = (e, { deltaX, deltaY }) => {
    const isMove =
      Math.abs(deltaX) >= this.openPanelPeriphery ||
      Math.abs(deltaY) >= this.openPanelPeriphery;
    this.setState({
      isMove
    });
  };
  controllerMouseUp = (e, { x, y }) => {
    if (!this.state.isMove) {
      this.openPanel();
    }
    this.setState({ moveX: x, moveY: y });
    return false;
  };
  controllerMouseOut = e => {
    e.preventDefault();
    this.isDrag = false;
  };
  onHandleProgress = value => {
    this.audio.currentTime = value;
  };
  onSound = () => {
    this.setAudioVolume(this.state.currentAudioVolume);
  };
  setAudioVolume = value => {
    this.audio.volume = value;
    this.setState({
      currentAudioVolume: value,
      soundValue: value
    });
  };
  stopAll = target => {
    target.stopPropagation();
    target.preventDefault();
  };
  getBoundingClientRect = ele => {
    const { left, top } = ele.getBoundingClientRect();
    return {
      left,
      top
    };
  };
  //循环播放
  audioLoop = () => {
    this.setState(({ isLoop }) => {
      return {
        isLoop: !isLoop
      };
    });
  };
  //重新播放
  audioReload = () => {
    this.handlePlay(this.PLAYMODE["singleLoop"]["key"]);
  };
  openPanel = () => {
    this.props.toggleMode && this.setState({ toggle: true });
  };
  //收起播放器
  onHidePanel = e => {
    this.setState({ toggle: false, audioListsPanelVisible: false });
  };
  //返回给使用者的 音乐信息
  getBaseAudioInfo() {
    const { cover, name, musicSrc, soundValue } = this.state;
    const {
      currentTime,
      duration,
      muted,
      networkState,
      readyState,
      played,
      paused,
      ended,
      startDate
    } = this.audio;
    return {
      cover,
      name,
      musicSrc,
      volume: soundValue,
      currentTime,
      duration,
      muted,
      networkState,
      readyState,
      played,
      paused,
      ended,
      startDate
    };
  }
  //播放
  onPlay = () => {
    if (this.props.audioLists.length >= 1) {
      //是否在播放
      const { playing } = this.state;
      if (playing === true) {
        this._pauseAudio();
      } else {
        this.getAudioLength();
        this.loadAudio();
      }
    }
  };
  //暂停
  _pauseAudio = () => {
    this.audio.pause();
    this.setState({ playing: false, pause: true });
  };
  pauseAudio = () => {
    this.props.audioPause && this.props.audioPause(this.getBaseAudioInfo());
  };
  loadStart = () => {
    this.setState({ loading: true });
  };
  //加载音频
  loadAudio = () => {
    const { autoPlay } = this.props;
    const { isInitAutoplay, loadProgress } = this.state;
    const { readyState, networkState } = this.audio;
    const maxLoadProgress = 100;
    this.setState({ loading: true });
    if (loadProgress < maxLoadProgress) {
      this.setState({ loadProgress: loadProgress + 1 });
    }
    if (
      readyState === this.READY_SUCCESS_STATE &&
      networkState !== this.NETWORK_STATE.NETWORK_NO_SOURCE
    ) {
      const canPlay = isInitAutoplay || autoPlay === true;
      this.setState(
        {
          playing: true,
          loading: false,
          pause: false,
          loadProgress: maxLoadProgress
        },
        () => {
          if (canPlay) {
            this.audio.play();
          }
          this.setState({ isInitAutoplay: true });
        }
      );
    }
  };
  //获取音频长度
  getAudioLength = () => {
    this.setState({
      duration: this.audio.duration
    });
  };
  //如果当前音乐加载出错 尝试播放下一首
  loadAudioError = e => {
    const { playMode } = this.state;
    const { loadAudioErrorPlayNext } = this.props;
    if (loadAudioErrorPlayNext) {
      this.handlePlay(playMode);
    }

    const info = this.getBaseAudioInfo();
    this.props.loadAudioError &&
      this.props.loadAudioError({
        ...e,
        audioInfo: info,
        errMsg: this.audio.error || null
      });
  };
  //isNext true 下一首  false
  /*eslint-disable no-unused-vars */
  handlePlay = (playMode, isNext = true) => {
    let IconNode = "";
    let { playId } = this.state;
    const audioListsLen = this.props.audioLists.length;
    switch (playMode) {
      //顺序播放
      case this.PLAYMODE["order"]["key"]:
        IconNode = <OrderPlayIcon />;
        if (playId === audioListsLen - 1) return this._pauseAudio();
        this.audioListsPlay(isNext ? ++playId : --playId);
        break;

      //列表循环
      case this.PLAYMODE["orderLoop"]["key"]:
        IconNode = <RepeatIcon />;
        if (isNext) {
          if (playId === audioListsLen - 1) playId = this.initPlayId;
          this.audioListsPlay(++playId);
        } else {
          if (playId - 1 === this.initPlayId) playId = audioListsLen;
          this.audioListsPlay(--playId);
        }
        break;

      //单曲循环
      case this.PLAYMODE["singleLoop"]["key"]:
        IconNode = <LoopIcon />;
        this.audio.currentTime = 0;
        this.audioListsPlay(playId, true);
        break;

      //随机播放
      case this.PLAYMODE["shufflePlay"]["key"]:
        {
          IconNode = <ShufflePlayIcon />;
          let randomPlayId = createRandomNum(0, audioListsLen - 1);
          this.audioListsPlay(randomPlayId, true);
        }
        break;
      default:
        IconNode = <OrderPlayIcon />;
    }
  };
  /*eslint-disable no-unused-vars */
  //音频播放结束
  audioEnd = () => {
    this.props.audioEnded && this.props.audioEnded(this.getBaseAudioInfo());
    this.handlePlay(this.state.playMode);
  };
  /**
   * 上一首 下一首 通用方法
   * 除随机播放之外 都以  点击了上一首或者下一首 则以列表循环的方式 顺序放下一首歌
   * 参考常规播放器的逻辑
   */
  audioPrevAndNextBasePlayHandle = (isNext = true) => {
    const { playMode } = this.state;
    let _playMode = "";
    switch (playMode) {
      case this.PLAYMODE["shufflePlay"]["key"]:
        _playMode = playMode;
        break;
      default:
        _playMode = this.PLAYMODE["orderLoop"]["key"];
        break;
    }
    this.handlePlay(_playMode, isNext);
  };
  //上一首
  audioPrevPlay = () => {
    this.audioPrevAndNextBasePlayHandle(false);
  };
  //下一首
  audioNextPlay = () => {
    this.audioPrevAndNextBasePlayHandle(true);
  };
  //播放进度更新
  audioTimeUpdate = () => {
    const currentTime = this.audio.currentTime;
    this.setState({ currentTime });
    if (this.props.remember) {
      this.saveLastPlayStatus();
    }
    this.props.audioProgress &&
      this.props.audioProgress(this.getBaseAudioInfo());
  };
  //音量改变
  audioSoundChange = value => {
    this.setAudioVolume(value);
  };
  audioVolumeChange = () => {
    if (this.audio.volume <= 0) {
      this.setState({ isMute: true });
    } else {
      this.setState({ isMute: false });
    }
    this.props.audioVolumeChange &&
      this.props.audioVolumeChange(this.state.currentAudioVolume);
  };
  audioPlay = () => {
    this.props.audioPlay && this.props.audioPlay(this.getBaseAudioInfo());
  };
  //进度条跳跃
  audioSeeked = () => {
    if (this.props.audioLists.length >= 1) {
      this.loadAudio();
      this.props.audioSeeked && this.props.audioSeeked(this.getBaseAudioInfo());
    }
  };
  //静音
  onMute = () => {
    this.setState(
      {
        isMute: true,
        soundValue: 0,
        currentAudioVolume: this.audio.volume
      },
      () => {
        this.audio.volume = 0;
      }
    );
  };
  //加载中断
  audioAbort = e => {
    const audioInfo = this.getBaseAudioInfo();
    const _err = Object.assign({}, e, audioInfo);
    this.props.audioAbort && this.props.audioAbort(_err);
  };
  //切换播放器模式
  toggleMode = mode => {
    if (mode === this.toggleModeName["full"]) {
      this.setState({ toggle: true });
    }
  };
  saveLastPlayStatus = () => {
    const {
      currentTime,
      playId,
      duration,
      theme,
      soundValue,
      playMode,
      name,
      cover,
      singer,
      musicSrc,
      pause
    } = this.state;
    const lastPlayStatus = JSON.stringify({
      currentTime,
      playId,
      duration,
      theme,
      playMode,
      soundValue,
      name,
      cover,
      singer,
      musicSrc,
      pause
    });
    localStorage.setItem("lastPlayStatus", lastPlayStatus);
  };
  getLastPlayStatus = () => {
    const { theme, defaultPlayMode } = this.props;

    try {
      return JSON.parse(localStorage.getItem("lastPlayStatus"));
    } catch (error) {
      return {
        currentTime: 0,
        duration: 0,
        playMode: defaultPlayMode,
        name: "",
        cover: "",
        singer: "",
        musicSrc: "",
        playId: ++this.initPlayId,
        theme,
        pause: false
      };
    }
  };
  bindMobileAutoPlayerEvents = () => {
    document.addEventListener("DOMContentLoaded", () => {
      this.audio.play();
    });
  };
  unBindEvents = (...options) => {
    this.bindEvents(...options);
  };
  /**
   * 绑定 audio 标签 事件
   */
  bindEvents = (
    target = this.audio,
    eventsNames = {
      waiting: this.loadAudio,
      canplay: this.onPlay,
      error: this.loadAudioError,
      ended: this.audioEnd,
      seeked: this.audioSeeked,
      pause: this.pauseAudio,
      play: this.audioPlay,
      timeupdate: this.audioTimeUpdate,
      volumechange: this.audioVolumeChange,
      stalled: this.loadAudioError, //当浏览器尝试获取媒体数据，但数据不可用时
      abort: this.audioAbort,
      loadstart: this.loadStart
    },
    bind = true
  ) => {
    const { once } = this.props;
    for (let name in eventsNames) {
      const _events = eventsNames[name];
      bind
        ? target.addEventListener(name, _events, {
            once: !!(once && name === "play")
          })
        : target.removeEventListener(name, _events);
    }
  };
  getPlayInfo = (audioLists = []) => {
    const { name = "", cover = "", singer = "", musicSrc = "" } =
      audioLists[0] || {};
    return { name, cover, singer, musicSrc };
  };
  initPlayInfo = (audioLists, cb) => {
    this.setState(this.getPlayInfo(audioLists), cb);
  };
  //当父组件 更新 props 时 如 audioLists 改变 更新播放信息
  componentWillReceiveProps({ audioLists }) {
    if (!arrayEqual(audioLists)(this.props.audioLists)) {
      this.initPlayInfo(audioLists);
      this.bindEvents(this.audio);
    }
  }
  //合并state 更新初始值
  componentWillMount() {
    const { theme, mode, audioLists, defaultPlayMode, remember } = this.props;

    //切换 'mini' 或者 'full' 模式
    this.toggleMode(mode);

    if (audioLists.length >= 1) {
      this.setState({
        ...this.getPlayInfo(audioLists),
        ...(remember ? this.getLastPlayStatus() : {})
      });
    }
  }
  listenerIsMobile = ({ matches }) => {
    this.setState({
      isMobile: !!matches
    });
  };
  addMobileListener = () => {
    this.media = window.matchMedia(
      "(max-width: 768px) and (orientation : portrait)"
    );
    this.media.addListener(this.listenerIsMobile);
  };
  setDefaultAudioVolume = () => {
    const { defaultVolume, remember } = this.props;
    //音量 [0-100]
    this.defaultVolume = Math.max(0, Math.min(defaultVolume, 100)) / 100;
    const { soundValue } = this.getLastPlayStatus();
    this.setAudioVolume(remember ? soundValue : this.defaultVolume);
  };
  componentWillUnmount() {
    this.unBindEvents(this.audio, undefined, false);
    this.media.removeListener(this.listenerIsMobile);
    this.media = undefined;
  }
  componentDidMount() {
    this.addMobileListener();
    this.setDefaultAudioVolume();
    if (this.props.audioLists.length >= 1) {
      this.bindEvents(this.audio);
    }
  }
}
