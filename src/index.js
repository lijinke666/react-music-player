/**
 * @version 4.12.0
 * @name react-jinke-music-player
 * @description Maybe the best beautiful HTML5 responsive player component for react :)
 * @author Jinke.Li <1359518268@qq.com>
 * TODO: 如果有空的话 (估计没有),发布 5.0,
    1. 使用 typescript + react hooks 重构 :)
    4. 精简api
    6. 使用 antd icon
    8. 移除歌词功能
 */

import React, { PureComponent } from "react";
import { createPortal } from "react-dom";
import cls from "classnames";
import isMobile from "is-mobile";
import Slider from "rc-slider/lib/Slider";
import Switch from "rc-switch";
import download from "downloadjs";
import Draggable from "react-draggable";
import {
  formatTime,
  createRandomNum,
  arrayEqual,
  uuId,
  isSafari,
} from "./utils";
import AudioListsPanel from "./components/AudioListsPanel";
import AudioPlayerMobile from "./components/PlayerMobile";
import Lyric from "./lyric";

import {
  FaMinusSquareOIcon,
  LyricIcon,
  ReloadIcon,
  MdVolumeDownIcon,
  MdVolumeMuteIcon,
  DownloadIcon,
  LoopIcon,
  RepeatIcon,
  ShufflePlayIcon,
  OrderPlayIcon,
  PlayLists,
  NextAudioIcon,
  PrevAudioIcon,
  CloseIcon,
  DeleteIcon,
  AnimatePlayIcon,
  AnimatePauseIcon,
} from "./components/Icon";
import CircleProcessBar from "./components/CircleProcessBar";
import Load from "./components/Load";
import PlayModel from "./components/PlayModel";

import { sliderBaseOptions } from "./config/slider";
import { SPACE_BAR_KEYCODE } from "./config/keycode";
import PROP_TYPES from "./config/propTypes";
import LOCALE from "./config/locale";
import NETWORK_STATE from "./config/networkState";
import { AUDIO_LIST_REMOVE_ANIMATE_TIME } from "./config/animate";
import PLAY_MODE from "./config/playMode";

import LOCALE_CONFIG from "./locale";

import "rc-slider/assets/index.css";
import "rc-switch/assets/index.css";

const IS_MOBILE = isMobile();

export default class ReactJkMusicPlayer extends PureComponent {
  initPlayId = ""; //初始播放id
  state = {
    audioLists: [],
    playId: this.initPlayId, //播放id
    name: "", //当前歌曲名
    cover: "", //当前歌曲封面
    singer: "", //当前歌手
    musicSrc: "", //当前歌曲链
    lyric: "", // 当前歌词
    currentLyric: "",
    isMobile: IS_MOBILE,
    toggle: false,
    pause: true,
    playing: false,
    currentTime: 0,
    isLoop: false,
    soundValue: 100,
    moveX: 0,
    moveY: 0,
    isMove: false,
    loading: false,
    audioListsPanelVisible: false,
    playModelNameVisible: false,
    theme: this.darkThemeName,
    extendsContent: null, //自定义扩展功能按钮
    playMode: "", //当前播放模式
    currentAudioVolume: 0, //当前音量  静音后恢复到之前记录的音量
    initAnimate: false,
    isInitAutoplay: false,
    isInitRemember: false,
    loadProgress: 0,
    removeId: -1,
    isNeedMobileHack: IS_MOBILE,
    audioLyricVisible: false,
    isAudioListsChange: false,
    notAutoPlayUntilPlayClicked: false,
  };
  static defaultProps = {
    audioLists: [],
    theme: "dark",
    mode: "mini",
    defaultPlayMode: "order",
    defaultPosition: {
      left: 0,
      top: 0,
    },
    once: false, //onAudioPlay 事件  是否只触发一次
    drag: true,
    toggleMode: true, //能换在迷你 和完整模式下 互相切换
    showMiniModeCover: true, //迷你模式下 是否显示封面图
    showDownload: true,
    showPlay: true,
    showReload: true,
    showPlayMode: true,
    showThemeSwitch: true,
    showLyric: false,
    playModeTipVisible: false, //手机端切换播放模式
    autoPlay: true,
    defaultVolume: 1,
    showProgressLoadBar: true, //音频预加载进度
    seeked: true,
    playModeShowTime: 600, //播放模式提示 显示时间,
    bounds: "body", //mini 模式拖拽的可移动边界
    showMiniProcessBar: false, //是否在迷你模式 显示进度条
    loadAudioErrorPlayNext: true, // 加载音频失败时 是否尝试播放下一首
    preload: false, //是否在页面加载后立即加载音频
    glassBg: false, //是否是毛玻璃效果
    remember: false, //是否记住当前播放状态
    remove: true, //音乐是否可以删除
    defaultPlayIndex: 0, //默认播放索引
    getContainer: () => document.body, // 播放器挂载的节点
    autoHiddenCover: false, // 当前播放歌曲没有封面时是否自动隐藏
    onBeforeAudioDownload: () => {}, // 下载前转换音频地址等
    spaceBar: false, // 是否可以通过空格键 控制播放暂停
    showDestroy: false,
    showMediaSession: false,
    locale: LOCALE.en_US,
    responsive: true,
  };
  static propTypes = PROP_TYPES;

  get locale() {
    const { locale } = this.props;
    if (typeof locale === "string") {
      return LOCALE_CONFIG[this.props.locale];
    }
    return locale ? { ...LOCALE_CONFIG[LOCALE.en_US], ...locale } : {};
  }

  get audioDuration() {
    const { audioLists, playId } = this.state;
    if (!audioLists.length || !this.audio) {
      return 0;
    }
    const { duration } = audioLists.find((audio) => audio.id === playId) || {};

    return Math.max(Number(duration) || this.audio.duration || 0, 0);
  }

  constructor(props) {
    super(props);

    this.audio = null; //当前播放器
    this.lightThemeName = "light";
    this.darkThemeName = "dark";
    //模式配置
    this.toggleModeName = {
      full: "full",
      mini: "mini",
    };
    this.targetId = "music-player-controller";
    this.openPanelPeriphery = 1; //移动差值 在 这之间 认为是点击打开panel

    //播放模式配置
    this._PLAY_MODE_ = Object.values(PLAY_MODE);
    this._PLAY_MODE_LENGTH_ = this._PLAY_MODE_.length;
  }
  render() {
    const {
      className,
      drag,
      style,
      showDownload,
      showPlay,
      showReload,
      showPlayMode,
      showThemeSwitch,
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
      glassBg,
      remove,
      lyricClassName,
      showLyric,
      emptyLyricText,
      getContainer,
      autoHiddenCover,
      showDestroy,
      responsive,
    } = this.props;

    const { locale } = this;

    const {
      toggle,
      playing,
      currentTime,
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
      loadProgress,
      audioLists,
      removeId,
      currentLyric,
      audioLyricVisible,
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

    const currentPlayMode =
      PLAY_MODE[playMode || defaultPlayMode] || PLAY_MODE.order;
    const currentPlayModeName = locale.playModeText[currentPlayMode];

    const isShowMiniModeCover =
      (showMiniModeCover && !autoHiddenCover) || (autoHiddenCover && cover)
        ? {
            style: {
              backgroundImage: `url(${cover})`,
            },
          }
        : {};

    const formattedCurrentTime = formatTime(currentTime);
    const formattedAudioDuration = formatTime(this.audioDuration);

    const progressHandler = seeked
      ? {
          onChange: this.onHandleProgress,
          onAfterChange: this.onAudioSeeked,
        }
      : {};

    //进度条
    const ProgressBar = (
      <Slider
        max={Math.ceil(this.audioDuration)}
        defaultValue={0}
        value={Math.ceil(currentTime)}
        {...progressHandler}
        {...sliderBaseOptions}
      />
    );

    //下载按钮
    const DownloadComponent = showDownload && (
      <span
        className="group audio-download"
        {...{ [IS_MOBILE ? "onTouchStart" : "onClick"]: this.onAudioDownload }}
        title={locale.downloadText}
      >
        <DownloadIcon />
      </span>
    );

    //主题开关
    const ThemeSwitchComponent = showThemeSwitch && (
      <span className="group theme-switch">
        <Switch
          className="theme-switch-container"
          onChange={this.themeChange}
          checkedChildren={locale.lightThemeText}
          unCheckedChildren={locale.darkThemeText}
          checked={theme === this.lightThemeName}
          title={locale.switchThemeText}
        />
      </span>
    );

    //重放
    const ReloadComponent = showReload && (
      <span
        className="group reload-btn"
        {...(IS_MOBILE
          ? { onTouchStart: this.onAudioReload }
          : { onClick: this.onAudioReload })}
        title={locale.reloadText}
      >
        <ReloadIcon />
      </span>
    );

    //歌词
    const LyricComponent = showLyric && (
      <span
        className={cls("group lyric-btn", {
          "lyric-btn-active": audioLyricVisible,
        })}
        {...(IS_MOBILE
          ? { onTouchStart: this.toggleAudioLyric }
          : { onClick: this.toggleAudioLyric })}
        title={locale.toggleLyricText}
      >
        <LyricIcon />
      </span>
    );

    //播放模式
    const PlayModeComponent = showPlayMode && (
      <span
        className={cls("group loop-btn")}
        {...(IS_MOBILE
          ? { onTouchStart: this.togglePlayMode }
          : { onClick: this.togglePlayMode })}
        title={locale.playModeText[currentPlayMode]}
      >
        {this.renderPlayModeIcon(currentPlayMode)}
      </span>
    );

    const miniProcessBarR = isMobile ? 30 : 40;

    const DestroyComponent = showDestroy && (
      <span
        title={locale.destroyText}
        className="group destroy-btn"
        ref={(node) => (this.destroyBtn = node)}
        {...(!drag || toggle
          ? { [IS_MOBILE ? "onTouchStart" : "onClick"]: this.onDestroyPlayer }
          : null)}
      >
        <CloseIcon />
      </span>
    );

    const AudioController = (
      <div className={cls("react-jinke-music-player")} style={defaultPosition}>
        <div className={cls("music-player")}>
          {showMiniProcessBar && (
            <CircleProcessBar
              progress={currentTime / this.audioDuration}
              r={miniProcessBarR}
            />
          )}
          <div
            id={this.targetId}
            className={cls("scale", "music-player-controller", {
              "music-player-playing": this.state.playing,
            })}
            {...isShowMiniModeCover}
          >
            {loading ? (
              <Load />
            ) : (
              <>
                <span className="controller-title">
                  {locale.controllerTitle}
                </span>
                <div className="music-player-controller-setting">
                  {toggle ? locale.closeText : locale.openText}
                </div>
              </>
            )}
          </div>
          {DestroyComponent}
        </div>
      </div>
    );

    const container = getContainer() || document.body;
    const audioTitle = this.getAudioTitle();

    return createPortal(
      <div
        className={cls(
          "react-jinke-music-player-main",
          {
            "light-theme": theme === this.lightThemeName,
            "dark-theme": theme === this.darkThemeName,
          },
          className
        )}
        style={style}
        ref={(player) => (this.player = player)}
      >
        {toggle && isMobile && responsive && (
          <AudioPlayerMobile
            playing={playing}
            loading={loading}
            pause={pause}
            name={name}
            singer={singer}
            cover={cover}
            themeSwitch={ThemeSwitchComponent}
            duration={formattedAudioDuration}
            currentTime={formattedCurrentTime}
            progressBar={ProgressBar}
            onPlay={this.onTogglePlay}
            currentPlayModeName={currentPlayModeName}
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
            closeIcon={<CloseIcon />}
            loadingIcon={<Load />}
            playModeTipVisible={playModeTipVisible}
            openAudioListsPanel={this.openAudioListsPanel}
            onClose={this.onHidePanel}
            extendsContent={extendsContent}
            glassBg={glassBg}
            LyricIcon={LyricComponent}
            autoHiddenCover={autoHiddenCover}
          />
        )}

        {toggle ? undefined : drag ? (
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
          AudioController
        )}
        {toggle && (!isMobile || !responsive) && (
          <div
            className={cls("music-player-panel", "translate", {
              "glass-bg": glassBg,
            })}
          >
            <section className="panel-content">
              {(!autoHiddenCover || (autoHiddenCover && cover)) && (
                <div
                  className={cls("img-content", "img-rotate", {
                    "img-rotate-pause": pause || !playing || !cover,
                  })}
                  style={{ backgroundImage: `url(${cover})` }}
                />
              )}
              <div className="progress-bar-content">
                <span className="audio-title">{audioTitle}</span>
                <section className="audio-main">
                  <span className="current-time">
                    {loading ? "--" : formattedCurrentTime}
                  </span>
                  <div className="progress-bar">
                    {showProgressLoadBar && (
                      <div
                        className="progress-load-bar"
                        style={{ width: `${Math.min(loadProgress, 100)}%` }}
                      />
                    )}

                    {ProgressBar}
                  </div>
                  <span className="duration">
                    {loading ? "--" : formattedAudioDuration}
                  </span>
                </section>
              </div>
              <div className="player-content">
                {/*播放按钮*/}
                {loading ? (
                  <Load />
                ) : showPlay ? (
                  <span className="group">
                    <span
                      className="group prev-audio"
                      title={locale.previousTrackText}
                      {...(IS_MOBILE
                        ? { onTouchStart: this.audioPrevPlay }
                        : { onClick: this.audioPrevPlay })}
                    >
                      <PrevAudioIcon />
                    </span>
                    <span
                      className="group play-btn"
                      ref={(node) => (this.playBtn = node)}
                      {...(IS_MOBILE
                        ? { onTouchStart: this.onTogglePlay }
                        : { onClick: this.onTogglePlay })}
                      title={
                        playing
                          ? locale.clickToPauseText
                          : locale.clickToPlayText
                      }
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
                      title={locale.nextTrackText}
                      {...(IS_MOBILE
                        ? { onTouchStart: this.audioNextPlay }
                        : { onClick: this.audioNextPlay })}
                    >
                      <NextAudioIcon />
                    </span>
                  </span>
                ) : undefined}

                {/*重播*/}
                {ReloadComponent}
                {/*下载歌曲*/}
                {DownloadComponent}
                {/* 主题选择 */}
                {ThemeSwitchComponent}

                {/* 自定义扩展按钮 */}
                {extendsContent || null}

                {/*音量控制*/}
                <span className="group play-sounds" title={locale.volumeText}>
                  {soundValue === 0 ? (
                    <span
                      className="sounds-icon"
                      {...(IS_MOBILE
                        ? { onTouchStart: this.onSound }
                        : { onClick: this.onSound })}
                    >
                      <MdVolumeMuteIcon />
                    </span>
                  ) : (
                    <span
                      className="sounds-icon"
                      {...(IS_MOBILE
                        ? { onTouchStart: this.onMute }
                        : { onClick: this.onMute })}
                    >
                      <MdVolumeDownIcon />
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

                {/*歌词按钮*/}
                {LyricComponent}

                {/*播放列表按钮*/}
                <span
                  className="group audio-lists-btn"
                  title={locale.playListsText}
                  {...(IS_MOBILE
                    ? { onTouchStart: this.openAudioListsPanel }
                    : { onClick: this.openAudioListsPanel })}
                >
                  <span className="audio-lists-icon">
                    <PlayLists />
                  </span>
                  <span className="audio-lists-num">{audioLists.length}</span>
                </span>

                {/*收起面板*/}
                {toggleMode && (
                  <span
                    className="group hide-panel"
                    title={locale.toggleMiniModeText}
                    {...(IS_MOBILE
                      ? { onTouchStart: this.onHidePanel }
                      : { onClick: this.onHidePanel })}
                  >
                    <FaMinusSquareOIcon />
                  </span>
                )}

                {/*销毁播放器*/}
                {DestroyComponent}
              </div>
            </section>
            {/* 播放模式提示框 */}
            <PlayModel
              visible={playModelNameVisible}
              value={currentPlayModeName}
            />
          </div>
        )}
        {/* 播放列表面板 */}
        <AudioListsPanel
          playId={playId}
          pause={pause}
          loading={loading ? <Load /> : undefined}
          visible={audioListsPanelVisible}
          audioLists={audioLists}
          onPlay={this.audioListsPlay}
          onCancel={this.closeAudioListsPanel}
          playIcon={<AnimatePlayIcon />}
          pauseIcon={<AnimatePauseIcon />}
          closeIcon={<CloseIcon />}
          isMobile={isMobile}
          panelToggleAnimate={panelToggleAnimate}
          glassBg={glassBg}
          cover={cover}
          remove={remove}
          deleteIcon={<DeleteIcon />}
          onDelete={this.deleteAudioLists}
          removeId={removeId}
          audioListsDragEnd={this.audioListsDragEnd}
          locale={locale}
        />
        {/* 歌词 */}
        {audioLyricVisible && (
          <Draggable>
            <div className={cls("music-player-lyric", lyricClassName)}>
              {currentLyric || emptyLyricText}
            </div>
          </Draggable>
        )}
        <audio
          className="music-player-audio"
          title={audioTitle}
          {...preloadState}
          src={musicSrc}
          ref={(node) => (this.audio = node)}
        />
      </div>,
      container
    );
  }

  getAudioTitle = () => {
    // 暂时兼容
    const { audioTitle } = this.locale || {};
    const { name, singer } = this.state;
    if (typeof audioTitle === "function" && this.audio) {
      return audioTitle(this.getBaseAudioInfo());
    }
    return audioTitle || `${name} ${singer ? `- ${singer}` : ""}`;
  };

  toggleAudioLyric = () => {
    this.setState({
      audioLyricVisible: !this.state.audioLyricVisible,
    });
  };
  //播放模式切换
  togglePlayMode = () => {
    let index = this._PLAY_MODE_.findIndex(
      (mode) => mode === this.state.playMode
    );
    const playMode =
      index === this._PLAY_MODE_LENGTH_ - 1
        ? this._PLAY_MODE_[0]
        : this._PLAY_MODE_[++index];
    this.setState({
      playMode,
      playModelNameVisible: true,
      playModeTipVisible: true,
    });
    this.props.onPlayModeChange && this.props.onPlayModeChange(playMode);

    clearTimeout(this.playModelTimer);
    this.playModelTimer = setTimeout(() => {
      this.setState({ playModelNameVisible: false, playModeTipVisible: false });
    }, this.props.playModeShowTime);
  };
  //渲染播放模式 对应按钮
  renderPlayModeIcon = (playMode) => {
    let IconNode = "";
    const animateName = "react-jinke-music-player-mode-icon";
    switch (playMode) {
      case PLAY_MODE.order:
        IconNode = <OrderPlayIcon className={animateName} />;
        break;
      case PLAY_MODE.orderLoop:
        IconNode = <RepeatIcon className={animateName} />;
        break;
      case PLAY_MODE.singleLoop:
        IconNode = <LoopIcon className={animateName} />;
        break;
      case PLAY_MODE.shufflePlay:
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
  audioListsPlay = (playId, ignore = false, state = this.state) => {
    const { playId: currentPlayId, pause, playing, audioLists } = state;
    if (Array.isArray(audioLists) && audioLists.length === 0) {
      /*eslint-disable-next-line no-console*/
      return console.warn("Your playlist has no songs. and cannot play !");
    }
    //如果点击当前项 就暂停 或者播放
    if (playId === currentPlayId && !ignore) {
      this.setState({ pause: !pause, playing: !playing });
      return pause ? this.audio.play() : this._pauseAudio();
    }

    const { name, cover, musicSrc, singer, lyric = "" } = audioLists.find(
      (audio) => audio.id === playId
    );

    const loadAudio = (musicSrc) => {
      this.setState(
        {
          name,
          cover,
          musicSrc,
          singer,
          playId,
          lyric,
          currentTime: 0,
          playing: false,
          loading: true,
          loadProgress: 0,
        },
        () => {
          this.initLyricParser();
          this.audio.load();
          this.updateMediaSessionMetadata();
        }
      );
      this.props.onAudioPlay && this.props.onAudioPlay(this.getBaseAudioInfo());
      this.props.onAudioPlayTrackChange &&
        this.props.onAudioPlayTrackChange(
          playId,
          audioLists,
          this.getBaseAudioInfo()
        );
    };

    switch (typeof musicSrc) {
      case "function":
        musicSrc().then((originMusicSrc) => {
          loadAudio(originMusicSrc);
        }, this.onAudioLoadError);
        break;
      default:
        loadAudio(musicSrc);
    }
  };

  resetAudioStatus = () => {
    this.audio.pause();
    this.initPlayInfo([]);
    this.setState({
      currentTime: 0,
      loading: false,
      playing: false,
      pause: true,
      currentLyric: "",
      playId: this.initPlayId,
    });
  };
  deleteAudioLists = (audioId) => (e) => {
    e.stopPropagation();
    //如果不 传 id  删除全部
    const { audioLists, playId } = this.state;
    if (audioLists.length < 1) {
      return;
    }
    this.lyric && this.lyric.stop();
    if (!audioId) {
      this.props.onAudioListsChange &&
        this.props.onAudioListsChange("", [], {});
      return this.resetAudioStatus();
    }
    const newAudioLists = [...audioLists].filter(
      (audio) => audio.id !== audioId
    );
    //触发删除动画,等动画结束 删除列表
    this.setState({ removeId: audioId });
    setTimeout(() => {
      this.setState(
        {
          audioLists: newAudioLists,
          removeId: -1,
        },
        () => {
          if (!newAudioLists.length) {
            return this.resetAudioStatus();
          }
          // 如果删除的是当前正在播放的 顺延下一首播放
          if (audioId === playId) {
            this.handlePlay(PLAY_MODE.orderLoop);
          }
        }
      );
    }, AUDIO_LIST_REMOVE_ANIMATE_TIME);

    this.props.onAudioListsChange &&
      this.props.onAudioListsChange(
        playId,
        newAudioLists,
        this.getBaseAudioInfo()
      );
  };
  openAudioListsPanel = () => {
    this.setState(({ audioListsPanelVisible }) => ({
      initAnimate: true,
      audioListsPanelVisible: !audioListsPanelVisible,
    }));
    this.props.onAudioListsPanelChange &&
      this.props.onAudioListsPanelChange(!this.state.audioListsPanelVisible);
  };
  closeAudioListsPanel = (e) => {
    e.stopPropagation();
    this.setState({ audioListsPanelVisible: false });
    this.props.onAudioListsPanelChange &&
      this.props.onAudioListsPanelChange(false);
  };
  themeChange = (isLight) => {
    const theme = isLight ? this.lightThemeName : this.darkThemeName;
    this.setState({
      theme,
    });
    this.props.onThemeChange && this.props.onThemeChange(theme);
  };
  onAudioDownload = () => {
    const { musicSrc } = this.state;
    if (this.state.musicSrc) {
      const { customDownloader } = this.props;
      const baseAudioInfo = this.getBaseAudioInfo();
      const onBeforeAudioDownload = this.props.onBeforeAudioDownload(
        baseAudioInfo
      );
      let transformedDownloadAudioInfo = {};
      if (onBeforeAudioDownload && onBeforeAudioDownload.then) {
        onBeforeAudioDownload.then((info) => {
          const { src, filename, mimeType } = info;
          transformedDownloadAudioInfo = info;
          if (customDownloader) {
            customDownloader(info);
          } else {
            download(src, filename, mimeType);
          }
        });
      } else {
        customDownloader
          ? customDownloader({ src: musicSrc })
          : download(musicSrc);
      }
      this.props.onAudioDownload &&
        this.props.onAudioDownload(baseAudioInfo, transformedDownloadAudioInfo);
    }
  };
  controllerMouseMove = (e, { deltaX, deltaY }) => {
    const isMove =
      Math.abs(deltaX) >= this.openPanelPeriphery ||
      Math.abs(deltaY) >= this.openPanelPeriphery;
    this.setState({
      isMove,
    });
  };
  controllerMouseUp = (e, { x, y }) => {
    if (
      this.props.showDestroy &&
      this.destroyBtn &&
      this.destroyBtn.contains(e.target)
    ) {
      this.onDestroyPlayer();
      return;
    }
    if (!this.state.isMove) {
      if (this.state.isNeedMobileHack) {
        this.loadAndPlayAudio();
        this.setState({ isNeedMobileHack: false });
      }
      this.openPanel();
    }
    this.setState({ moveX: x, moveY: y });
    return false;
  };
  onHandleProgress = (value) => {
    this.audio.currentTime = value;
  };
  onSound = () => {
    this.setAudioVolume(this.state.currentAudioVolume);
  };
  setAudioVolume = (value) => {
    this.audio.volume = value;
    this.setState({
      currentAudioVolume: value,
      soundValue: value,
    });
  };
  stopAll = (target) => {
    target.stopPropagation();
    target.preventDefault();
  };
  getBoundingClientRect = (ele) => {
    const { left, top } = ele.getBoundingClientRect();
    return {
      left,
      top,
    };
  };
  //循环播放
  audioLoop = () => {
    this.setState(({ isLoop }) => {
      return {
        isLoop: !isLoop,
      };
    });
  };
  //重新播放
  onAudioReload = () => {
    this.handlePlay(PLAY_MODE.singleLoop);
    this.props.onAudioReload &&
      this.props.onAudioReload(this.getBaseAudioInfo());
  };
  openPanel = () => {
    if (this.props.toggleMode) {
      this.setState({ toggle: true });
      this.props.onModeChange &&
        this.props.onModeChange(this.toggleModeName.full);
    }
  };
  //收起播放器
  onHidePanel = () => {
    this.setState({ toggle: false, audioListsPanelVisible: false });
    this.props.onModeChange &&
      this.props.onModeChange(this.toggleModeName.mini);
  };

  onDestroyPlayer = () => {
    if (this.props.onBeforeDestroy) {
      const onBeforeDestroy = Promise.resolve(
        this.props.onBeforeDestroy(
          this.state.playId,
          this.state.audioLists,
          this.getBaseAudioInfo()
        )
      );

      if (onBeforeDestroy && onBeforeDestroy.then) {
        onBeforeDestroy
          .then(() => {
            this._onDestroyPlayer();
          })
          // ignore unhandledrejection handler
          .catch(() => {});
      }
      return;
    }
    this._onDestroyPlayer();
  };

  _onDestroyPlayer = () => {
    this.componentWillUnmount();
    this.player.remove();
  };

  _onDestroyed = () => {
    if (this.props.onDestroyed) {
      this.props.onDestroyed(
        this.state.playId,
        this.state.audioLists,
        this.getBaseAudioInfo()
      );
    }
  };

  //返回给使用者的 音乐信息
  getBaseAudioInfo() {
    const {
      playId,
      cover,
      name,
      musicSrc,
      soundValue,
      lyric,
      audioLists,
    } = this.state;

    const {
      currentTime,
      muted,
      networkState,
      readyState,
      played,
      paused,
      ended,
      startDate,
    } = this.audio;

    const currentPlayIndex = audioLists.findIndex(
      (audio) => audio.id === playId
    );
    const currentAudioListInfo = audioLists[currentPlayIndex] || {};

    return {
      ...currentAudioListInfo,
      cover,
      name,
      musicSrc,
      volume: soundValue,
      currentTime,
      duration: this.audioDuration,
      muted,
      networkState,
      readyState,
      played,
      paused,
      ended,
      startDate,
      lyric,
    };
  }
  //播放
  onTogglePlay = () => {
    if (this.state.audioLists.length >= 1) {
      this.lyric.togglePlay();
      if (this.state.playing) {
        return this._pauseAudio();
      }
      this.setState(
        { notAutoPlayUntilPlayClicked: !this.props.autoPlay },
        this.loadAndPlayAudio
      );
    }
  };

  canPlay = () => {
    this.setState({
      loading: false,
      playing: false,
      isAudioListsChange: false,
    });

    if (this.state.isInitAutoplay) {
      this.loadAndPlayAudio();
    }
  };

  //暂停
  _pauseAudio = () => {
    this.audio.pause();
    this.setState({ playing: false, pause: true }, () => {
      this.lyric && this.lyric.stop();
    });
  };
  onPauseAudio = () => {
    this._pauseAudio();
    this.lyric && this.lyric.stop();
    this.props.onAudioPause && this.props.onAudioPause(this.getBaseAudioInfo());
  };
  //加载音频
  loadAndPlayAudio = () => {
    const { autoPlay, remember } = this.props;
    const {
      isInitAutoplay,
      isInitRemember,
      loadProgress,
      notAutoPlayUntilPlayClicked,
    } = this.state;
    const { networkState } = this.audio;
    const maxLoadProgress = 100;
    this.setState({ loading: true });
    if (loadProgress < maxLoadProgress) {
      this.setState({ loadProgress: loadProgress + 1 });
    }
    if (networkState !== NETWORK_STATE.NETWORK_NO_SOURCE) {
      const { pause } = this.getLastPlayStatus();
      const isLastPause = remember && !isInitRemember && pause;
      const canPlay = isInitAutoplay || autoPlay || notAutoPlayUntilPlayClicked;
      this.setState(
        {
          playing: remember ? !isLastPause : canPlay,
          loading: false,
          pause: remember ? isLastPause : !canPlay,
          loadProgress: maxLoadProgress,
        },
        () => {
          if (remember ? !isLastPause : canPlay) {
            // fuck Safari is need muted :(
            // this.audio.muted = true
            this.audio.play();
          }
          this.setState({ isInitAutoplay: true, isInitRemember: true });
        }
      );
    } else {
      this.onAudioLoadError();
    }
  };
  onAudioLoadError = (error) => {
    const { playMode, audioLists, playId, musicSrc } = this.state;
    const { loadAudioErrorPlayNext } = this.props;
    const isSingleLoop = playMode === PLAY_MODE.singleLoop;
    const currentPlayMode = isSingleLoop ? PLAY_MODE.order : playMode;

    this.lyric.stop();

    //如果当前音乐加载出错 尝试播放下一首
    if (loadAudioErrorPlayNext && audioLists.length) {
      const isLastAudio =
        (playMode === PLAY_MODE.order || playMode === PLAY_MODE.orderLoop) &&
        playId === audioLists[audioLists.length - 1].id;
      if (!isLastAudio) {
        this.handlePlay(currentPlayMode, true);
      }
    }

    // 如果删除歌曲或其他原因导致列表为空时
    // 这时候会触发 https://developer.mozilla.org/en-US/docs/Web/API/MediaError
    if (musicSrc) {
      this.props.onAudioLoadError &&
        this.props.onAudioLoadError(
          this.audio.error || (error && error.reason) || null,
          playId,
          audioLists,
          this.getBaseAudioInfo()
        );
    }
  };
  //isNext true 下一首  false
  handlePlay = (playMode, isNext = true) => {
    let { playId, audioLists } = this.state;
    const audioListsLen = audioLists.length;
    if (!audioListsLen) {
      return;
    }
    const currentPlayIndex = audioLists.findIndex(
      (audio) => audio.id === playId
    );
    switch (playMode) {
      //顺序播放
      case PLAY_MODE.order:
        // 拖拽排序后 或者 正常播放 到最后一首歌 就暂停
        if (currentPlayIndex === audioListsLen - 1) return this._pauseAudio();
        this.audioListsPlay(
          isNext
            ? audioLists[currentPlayIndex + 1].id
            : audioLists[currentPlayIndex - 1].id
        );
        break;

      //列表循环
      case PLAY_MODE.orderLoop:
        if (isNext) {
          if (currentPlayIndex === audioListsLen - 1) {
            return this.audioListsPlay(audioLists[0].id);
          }
          this.audioListsPlay(audioLists[currentPlayIndex + 1].id);
        } else {
          if (currentPlayIndex === 0) {
            return this.audioListsPlay(audioLists[audioListsLen - 1].id);
          }
          this.audioListsPlay(audioLists[currentPlayIndex - 1].id);
        }
        break;

      //单曲循环
      case PLAY_MODE.singleLoop:
        this.audio.currentTime = 0;
        this.audioListsPlay(playId, true);
        break;

      //随机播放
      case PLAY_MODE.shufflePlay:
        {
          let randomIndex = createRandomNum(0, audioListsLen - 1);
          const randomPlayId = (audioLists[randomIndex] || {}).id;
          this.audioListsPlay(randomPlayId, true);
        }
        break;
      default:
        break;
    }
  };
  //音频播放结束
  audioEnd = () => {
    this.props.onAudioEnded &&
      this.props.onAudioEnded(
        this.state.playId,
        this.state.audioLists,
        this.getBaseAudioInfo()
      );
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
      case PLAY_MODE.shufflePlay:
        _playMode = playMode;
        break;
      default:
        _playMode = PLAY_MODE.orderLoop;
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
    this.props.onAudioProgress &&
      this.props.onAudioProgress(this.getBaseAudioInfo());
  };
  //音量改变
  audioSoundChange = (value) => {
    this.setAudioVolume(value);
  };
  onAudioVolumeChange = () => {
    const volume = this.audio.volume;
    this.setState({
      soundValue: volume,
    });
    this.props.onAudioVolumeChange && this.props.onAudioVolumeChange(volume);
  };
  onAudioPlay = () => {
    this.setState({ playing: true, loading: false }, this.initLyricParser);
    this.props.onAudioPlay && this.props.onAudioPlay(this.getBaseAudioInfo());
  };
  //进度条跳跃
  onAudioSeeked = () => {
    if (this.state.audioLists.length >= 1) {
      if (this.state.playing) {
        this.setState({ playing: true }, () => {
          this.loadAndPlayAudio();
          this.lyric.seek(this.getLyricPlayTime());
        });
      }
      this.props.onAudioSeeked &&
        this.props.onAudioSeeked(this.getBaseAudioInfo());
    }
  };
  //静音
  onMute = () => {
    this.setState(
      {
        soundValue: 0,
        currentAudioVolume: this.audio.volume,
      },
      () => {
        this.audio.volume = 0;
      }
    );
  };
  //加载中断
  onAudioAbort = (e) => {
    const { audioLists, playId } = this.state;
    const audioInfo = this.getBaseAudioInfo();
    const mergedAudioInfo = Object.assign({}, e, audioInfo);
    this.props.onAudioAbort &&
      this.props.onAudioAbort(playId, audioLists, mergedAudioInfo);
    if (audioLists.length) {
      this.audio.pause();
      this.state.isInitAutoplay && this.audio.play();
      this.lyric.stop();
    }
  };
  //切换播放器模式
  toggleMode = (mode) => {
    if (mode === this.toggleModeName["full"]) {
      this.setState({ toggle: true });
    }
  };
  toggleTheme = (theme) => {
    this.setState({ theme });
  };
  //列表拖拽排序
  audioListsDragEnd = (fromIndex, toIndex) => {
    const { playId, audioLists } = this.state;
    const _audioLists = [...audioLists];
    const item = _audioLists.splice(fromIndex, 1)[0];
    _audioLists.splice(toIndex, 0, item);

    //如果拖动正在播放的歌曲 播放Id 等于 拖动后的index
    let _playId = fromIndex === playId ? toIndex : playId;

    this.setState({ audioLists: _audioLists, playId: _playId });

    this.props.onAudioListsDragEnd &&
      this.props.onAudioListsDragEnd(fromIndex, toIndex);

    this.props.onAudioListsChange &&
      this.props.onAudioListsChange(
        _playId,
        _audioLists,
        this.getBaseAudioInfo()
      );
  };
  saveLastPlayStatus = () => {
    const {
      currentTime,
      playId,
      theme,
      soundValue,
      playMode,
      name,
      cover,
      singer,
      musicSrc,
      pause,
    } = this.state;
    const lastPlayStatus = JSON.stringify({
      currentTime,
      playId,
      theme,
      playMode,
      soundValue,
      name,
      cover,
      singer,
      musicSrc,
      pause,
    });
    localStorage.setItem("lastPlayStatus", lastPlayStatus);
  };
  getLastPlayStatus = () => {
    const { theme, defaultPlayMode } = this.props;

    let status = {
      currentTime: 0,
      playMode: defaultPlayMode,
      name: "",
      cover: "",
      singer: "",
      musicSrc: "",
      lyric: "",
      playId: this.getDefaultPlayId(),
      theme,
      pause: false,
    };
    try {
      return JSON.parse(localStorage.getItem("lastPlayStatus")) || status;
    } catch (error) {
      return status;
    }
  };
  mockAutoPlayForMobile = () => {
    if (this.props.autoPlay && !this.state.playing && this.state.pause) {
      this.audio.load();
      this.audio.pause();
      this.audio.play();
    }
  };
  bindMobileAutoPlayEvents = () => {
    document.addEventListener(
      "touchstart",
      () => {
        this.mockAutoPlayForMobile();
      },
      { once: true }
    );
    //监听微信准备就绪事件
    document.addEventListener("WeixinJSBridgeReady", () => {
      this.mockAutoPlayForMobile();
    });
  };
  bindSafariAutoPlayEvents = () => {
    document.addEventListener(
      "click",
      () => {
        this.mockAutoPlayForMobile();
      },
      { once: true }
    );
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
      waiting: this.loadAndPlayAudio,
      canplay: this.canPlay,
      error: this.onAudioLoadError,
      ended: this.audioEnd,
      seeked: this.onAudioSeeked,
      pause: this.onPauseAudio,
      play: this.onAudioPlay,
      timeupdate: this.audioTimeUpdate,
      volumechange: this.onAudioVolumeChange,
      stalled: this.onAudioLoadError, //当浏览器尝试获取媒体数据，但数据不可用时
      abort: this.onAudioAbort,
    },
    bind = true
  ) => {
    const { once } = this.props;
    for (let name in eventsNames) {
      const _events = eventsNames[name];
      bind
        ? target.addEventListener(name, _events, {
            once: !!(once && name === "play"),
          })
        : target.removeEventListener(name, _events);
    }
  };

  getPlayId = (audioLists = this.state.audioLists) => {
    const playIndex = Math.max(
      0,
      Math.min(audioLists.length, this.props.defaultPlayIndex)
    );
    const playId = this.state.playId || audioLists[playIndex].id;
    return playId;
  };

  getPlayInfo = (audioLists = []) => {
    const newAudioLists = audioLists.filter((audio) => !audio["id"]);
    const lastAudioLists = audioLists.filter((audio) => audio["id"]);
    const mergedAudioLists = [
      ...lastAudioLists,
      ...newAudioLists.map((info) => {
        return {
          ...info,
          id: uuId(),
        };
      }),
    ];
    const playId = this.getPlayId(mergedAudioLists);
    const { name = "", cover = "", singer = "", musicSrc = "", lyric = "" } =
      mergedAudioLists.find(({ id }) => id === playId) || {};
    return {
      name,
      cover,
      singer,
      musicSrc,
      lyric,
      audioLists: mergedAudioLists,
      playId,
    };
  };
  // I change the name of getPlayInfo to getPlayInfoOfNewList because i didn't want to change the prior changes
  // the only thing this function does is to add id to audiolist elements.
  getPlayInfoOfNewList = (audioLists = []) => {
    const _audioLists = audioLists.map((info) => {
      return {
        ...info,
        id: uuId(),
      };
    });

    const playIndex = Math.max(
      0,
      Math.min(_audioLists.length, this.props.defaultPlayIndex)
    );

    const playId = this.state.playId || _audioLists[playIndex].id;

    const { name = "", cover = "", singer = "", musicSrc = "", lyric = "" } =
      _audioLists.find(({ id }) => id === playId) || {};
    return {
      name,
      cover,
      singer,
      musicSrc,
      lyric,
      audioLists: _audioLists,
      playId,
    };
  };

  initPlayInfo = (audioLists, cb) => {
    const info = this.getPlayInfo(audioLists);

    switch (typeof info.musicSrc) {
      case "function":
        info.musicSrc().then((originMusicSrc) => {
          this.setState({ ...info, musicSrc: originMusicSrc }, cb);
        }, this.onAudioLoadError);
        break;
      default:
        this.setState(info, cb);
    }
  };

  listenerIsMobile = ({ matches }) => {
    this.setState({
      isMobile: !!matches,
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
    //音量 [0-1]
    this.defaultVolume = Math.max(0, Math.min(defaultVolume, 1));
    const { soundValue = this.defaultVolume } = this.getLastPlayStatus();
    this.setAudioVolume(remember ? soundValue : this.defaultVolume);
  };
  getDefaultPlayId = (audioLists = this.props.audioLists) => {
    const playIndex = Math.max(
      0,
      Math.min(audioLists.length, this.props.defaultPlayIndex)
    );
    return audioLists[playIndex] && audioLists[playIndex].id;
  };
  getLyricPlayTime = () => {
    const [m, s] = formatTime(this.audio.currentTime).split(":");
    return m * 1000 + s * 10;
  };
  initLyricParser = () => {
    this.lyric = undefined;
    this.lyric = new Lyric(this.state.lyric, this.onLyricChange);
    this.lyric.stop();
    if (this.props.showLyric && this.state.playing) {
      this.lyric.seek(this.getLyricPlayTime());
      this.lyric.play();
    }
  };
  onLyricChange = ({ lineNum, txt }) => {
    this.setState({
      currentLyric: txt,
    });
    this.props.onAudioLyricChange &&
      this.props.onAudioLyricChange(lineNum, txt);
  };

  updateTheme = (theme) => {
    if (
      theme &&
      theme !== this.props.theme &&
      (theme === this.lightThemeName || theme === this.darkThemeName)
    ) {
      this.setState({ theme });
      this.props.onThemeChange && this.props.onThemeChange(theme);
    }
  };

  updateMode = (mode) => {
    if (
      mode &&
      mode !== this.props.mode &&
      (mode === this.toggleModeName.full || mode === this.toggleModeName.mini)
    ) {
      this.setState({ toggle: mode === this.toggleModeName.full });
      this.props.onModeChange && this.props.onModeChange(mode);
    }
  };

  updateAudioLists = (audioLists) => {
    const newAudioLists = [
      ...this.state.audioLists,
      ...audioLists.filter(
        (audio) =>
          this.state.audioLists.findIndex(
            (v) => v.musicSrc === audio.musicSrc
          ) === -1
      ),
    ];
    this.initPlayInfo(newAudioLists);
    this.bindEvents(this.audio);
    this.props.onAudioListsChange &&
      this.props.onAudioListsChange(
        this.state.playId,
        audioLists,
        this.getBaseAudioInfo()
      );
  };

  loadNewAudioLists = (
    audioLists,
    {
      remember,
      defaultPlayIndex,
      defaultPlayMode,
      theme,
      autoPlayInitLoadPlayList,
    }
  ) => {
    if (audioLists.length >= 1) {
      const info = this.getPlayInfoOfNewList(audioLists);
      const lastPlayStatus = remember
        ? this.getLastPlayStatus(defaultPlayIndex)
        : { playMode: defaultPlayMode, theme };

      switch (typeof info.musicSrc) {
        case "function":
          info.musicSrc().then((val) => {
            this.setState({
              ...info,
              musicSrc: val,
              isInitAutoplay: autoPlayInitLoadPlayList,
              ...lastPlayStatus,
            });
          }, this.onAudioLoadError);
          break;
        default:
          this.setState({
            ...info,
            isInitAutoplay: autoPlayInitLoadPlayList,
            ...lastPlayStatus,
          });
      }
    }
  };

  // FIXME: 更新列表后 没有在第一首歌播放
  changeAudioLists = (audioLists) => {
    this.resetAudioStatus();
    this.loadNewAudioLists(audioLists, this.props);
    this.props.onAudioListsChange &&
      this.props.onAudioListsChange(
        this.state.playId,
        audioLists,
        this.getBaseAudioInfo()
      );
    this.setState({ isAudioListsChange: true });
  };

  resetPlayList = (state) => {
    const _playIndex = Math.max(
      0,
      Math.min(state.audioLists.length, this.props.defaultPlayIndex)
    );

    const currentPlay = state.audioLists[_playIndex];
    if (currentPlay && currentPlay.id) {
      this.audioListsPlay(currentPlay.id, true, state);
    }
  };

  updatePlayIndex = (playIndex) => {
    // 播放索引 改变
    const currentPlayIndex = this.state.audioLists.findIndex(
      (audio) => audio.id === this.state.playId
    );
    if (currentPlayIndex !== playIndex) {
      const _playIndex = Math.max(
        0,
        Math.min(this.state.audioLists.length, playIndex)
      );
      const currentPlay = this.state.audioLists[_playIndex];
      if (currentPlay && currentPlay.id) {
        this.audioListsPlay(currentPlay.id, true);
      }
    }
  };

  onGetAudioInstance = () => {
    if (this.props.getAudioInstance) {
      Object.defineProperty(this.audio, "destroy", {
        value: () => {
          this.onDestroyPlayer();
        },
        writable: false,
      });
      this.props.getAudioInstance(this.audio);
    }
  };

  updateMediaSessionMetadata = () => {
    if ("mediaSession" in navigator && this.props.showMediaSession) {
      const { name, cover, singer } = this.state;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: name,
        artist: singer,
        album: name,
        artwork: [
          { src: cover, sizes: "96x96", type: "image/png" },
          { src: cover, sizes: "128x128", type: "image/png" },
          { src: cover, sizes: "192x192", type: "image/png" },
          { src: cover, sizes: "256x256", type: "image/png" },
          { src: cover, sizes: "384x384", type: "image/png" },
          { src: cover, sizes: "512x512", type: "image/png" },
        ],
      });
      this.updateMediaSessionPositionState();
    }
  };

  updateMediaSessionPositionState = () => {
    if ("setPositionState" in navigator.mediaSession) {
      try {
        const { audio } = this;
        navigator.mediaSession.setPositionState({
          duration: this.audioDuration,
          playbackRate: audio.playbackRate || 1,
          position: audio.currentTime || 0,
        });
      } catch (error) {
        console.error("setPositionState error: ", error);
      }
    }
  };

  onAddMediaSession = () => {
    if ("mediaSession" in navigator && this.props.showMediaSession) {
      const defaultSkipTime = 10;
      this.updateMediaSessionMetadata();
      navigator.mediaSession.setActionHandler("play", this.onTogglePlay);
      navigator.mediaSession.setActionHandler("pause", this.onTogglePlay);
      navigator.mediaSession.setActionHandler("seekbackward", (details) => {
        const skipTime = details.seekOffset || defaultSkipTime;
        this.audio.currentTime = Math.max(this.audio.currentTime - skipTime, 0);
      });
      navigator.mediaSession.setActionHandler("seekforward", (details) => {
        const skipTime = details.seekOffset || defaultSkipTime;
        this.audio.currentTime = Math.min(
          this.audio.currentTime + skipTime,
          this.audioDuration
        );
      });
      navigator.mediaSession.setActionHandler(
        "previoustrack",
        this.audioPrevPlay
      );
      navigator.mediaSession.setActionHandler("nexttrack", this.audioNextPlay);

      try {
        navigator.mediaSession.setActionHandler("seekto", (event) => {
          if (event.fastSeek && "fastSeek" in this.audio) {
            this.audio.fastSeek(event.seekTime);
            return;
          }
          this.audio.currentTime = event.seekTime;
          this.updateMediaSessionPositionState();
        });
      } catch (error) {
        console.warn(
          'Warning! The "seekto" media session action is not supported.'
        );
      }
    }
  };

  //当父组件 更新 props 时 如 audioLists 改变 更新播放信息
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps({
    audioLists,
    playIndex,
    theme,
    mode,
    clearPriorAudioLists,
  }) {
    if (!arrayEqual(audioLists)(this.props.audioLists)) {
      if (clearPriorAudioLists) {
        this.changeAudioLists(audioLists);
      } else {
        this.updateAudioLists(audioLists);
      }
    } else {
      this.updatePlayIndex(playIndex);
    }
    this.updateTheme(theme);
    this.updateMode(mode);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextProps.clearPriorAudioLists) {
      if (nextState.isAudioListsChange !== this.state.isAudioListsChange) {
        this.resetPlayList(nextState);
      }
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const {
      mode,
      audioLists,
      defaultPlayMode,
      remember,
      theme,
      defaultPlayIndex,
      autoPlay,
    } = this.props;

    this.toggleMode(mode);
    this.toggleTheme(theme);

    if (audioLists.length >= 1) {
      const info = {
        ...this.getPlayInfo(audioLists),
        isInitAutoplay: autoPlay,
      };
      const lastPlayStatus = remember
        ? this.getLastPlayStatus(defaultPlayIndex)
        : { playMode: defaultPlayMode, theme };

      switch (typeof info.musicSrc) {
        case "function":
          info.musicSrc().then((val) => {
            this.setState({
              ...info,
              musicSrc: val,
              ...lastPlayStatus,
            });
          }, this.onAudioLoadError);
          break;
        default:
          this.setState({
            ...info,
            ...lastPlayStatus,
          });
      }
    }
  }
  bindUnhandledRejection = () => {
    window.addEventListener("unhandledrejection", this.onAudioLoadError);
  };
  unBindUnhandledRejection = () => {
    window.removeEventListener("unhandledrejection", this.onAudioLoadError);
  };
  bindKeyDownEvents = () => {
    document.addEventListener("keydown", this.onKeyDown, false);
  };
  unBindKeyDownEvents = () => {
    document.removeEventListener("keydown", this.onKeyDown, false);
  };
  onKeyDown = (e) => {
    const { spaceBar } = this.props;
    if (spaceBar && e.keyCode === SPACE_BAR_KEYCODE) {
      this.onTogglePlay();
    }
  };
  componentWillUnmount() {
    this._onDestroyed();
    this.unBindEvents(this.audio, undefined, false);
    this.unBindUnhandledRejection();
    this.unBindKeyDownEvents();
    this.media.removeListener(this.listenerIsMobile);
    this.media = undefined;
    this.lyric.stop();
  }
  componentDidMount() {
    this.setDefaultAudioVolume();
    this.addMobileListener();
    this.bindUnhandledRejection();
    if (this.props.audioLists.length >= 1) {
      this.bindEvents(this.audio);
      this.onGetAudioInstance();
      this.initLyricParser();
      this.onAddMediaSession();
      if (IS_MOBILE) {
        this.bindMobileAutoPlayEvents();
      } else {
        this.bindKeyDownEvents();
      }
      if (!IS_MOBILE && isSafari()) {
        this.bindSafariAutoPlayEvents();
      }
    }
  }
}
