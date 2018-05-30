import React from "react";
import ReactDOM from "react-dom";
import ReactJkMusicPlayer from "../src";
import swal from "sweetalert";
import FaHeadphones from "react-icons/lib/fa/headphones";
import { createRandomNum } from "../src/utils";

import "../src/styles/index.less";
import "./example.less";
/*eslint-disable no-console*/

const options = {
  //audio lists model
  audioLists: [
    {
      name: "丑",
      singer: "草东没有派对",
      cover: "http://www.lijinke.cn/music/1387583682387727.jpg",
      musicSrc: "http://www.lijinke.cn/music/201711082.mp3"
    },
    {
      name: "达尔文",
      singer: "蔡健雅",
      cover: "http://www.lijinke.cn/music/5V49G-3GFLn-f6mRjHsGaUAh.jpg",
      musicSrc: "http://www.lijinke.cn/music/20171108.mp3"
    },
    {
      name: "十年青春换绝症",
      singer: "贰佰",
      cover: "http://www.lijinke.cn/music/18892908300128861.jpg",
      musicSrc: "http://www.lijinke.cn/music/201711081.mp3"
    }
  ],

  //color of the music player theme    [ type `string: 'light' or 'dark'  ` default 'dark' ]
  theme: "dark",

  // Specifies movement boundaries. Accepted values:
  // - `parent` restricts movement within the node's offsetParent
  //    (nearest node with position relative or absolute), or
  // - a selector, restricts movement within the targeted node
  // - An object with `left, top, right, and bottom` properties.
  //   These indicate how far in each direction the draggable
  //   can be moved.
  bounds: "body",

  //Whether to load audio immediately after the page loads.  [type `Boolean | String`, default `false`]
  //"auto|metadata|none" "true| false"
  preload: false,

  //Whether the player's background displays frosted glass effect  [type `Boolean`, default `false`]
  glassBg: false,

  //The next time you access the player, do you keep the last state  [type `Boolean` default `false`]
  remember: false,

  //The Audio Can be deleted  [type `Boolean`, default `true`]
  remove:true,

  //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
  defaultPosition: {
    top: 300,
    left: 120
  },

  // play mode text config of the audio player
  playModeText: {
    order: "顺序播放",
    orderLoop: "列表循环",
    singleLoop: "单曲循环",
    shufflePlay: "随机播放"
  },

  //audio controller open text  [ type `String | ReactNode` default 'open']
  openText: "打开",

  //audio controller close text  [ type `String | ReactNode` default 'close']
  closeText: "关闭",

  //audio theme switch checkedText  [ type `String | ReactNode` default '-']
  checkedText: "开",

  //audio theme switch unCheckedText [ type `String | ReactNode` default '-']
  unCheckedText: "关",

  // audio list panel show text of the playlist has no songs [ type `String` | ReactNode  default 'no music']
  notContentText: "暂无音乐",

  panelTitle: "播放列表",

  defaultPlayMode: "order",

  //audio mode        mini | full          [type `String`  default `mini`]
  mode: "full",

  /**
   * [ type `Boolean` default 'false' ]
   * The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
   */
  once: true,

  //Whether the audio is played after loading is completed. [type `Boolean` default 'true']
  autoPlay: true,

  //Whether you can switch between two modes, full => mini  or mini => full   [type 'Boolean' default 'true']
  toggleMode: true,

  //audio cover is show of the "mini" mode [type `Boolean` default 'true']
  showMiniModeCover: true,

  //audio playing progress is show of the "mini"  mode
  showMiniProcessBar: false,

  //audio controller is can be drag of the "mini" mode     [type `Boolean` default `true`]
  drag: true,

  //drag the audio progress bar [type `Boolean` default `true`]
  seeked: true,

  //audio controller title [type `String | ReactNode`  default <FaHeadphones/>]
  controllerTitle: <FaHeadphones />,

  //Displays the audio load progress bar.  [type `Boolean` default `true`]
  showProgressLoadBar: true,

  //play button display of the audio player panel   [type `Boolean` default `true`]
  showPlay: true,

  //reload button display of the audio player panel   [type `Boolean` default `true`]
  showReload: true,

  //download button display of the audio player panel   [type `Boolean` default `true`]
  showDownload: true,

  //loop button display of the audio player panel   [type `Boolean` default `true`]
  showPlayMode: true,

  //theme toggle switch  display of the audio player panel   [type `Boolean` default `true`]
  showThemeSwitch: true,

  //Extensible custom content       [type 'Array' default '[]' ]
  extendsContent: [],

  //default volume of the audio player [type `Number` default `100` range `0-100`]
  defaultVolume: 100,

  //playModeText show time [type `Number(ms)` default `700`]
  playModeShowTime: 600,

  //Whether to try playing the next audio when the current audio playback fails [type `Boolean` default `true`]
  loadAudioErrorPlayNext: true,

  //Music is downloaded handle
  audioDownload(audioInfo) {
    swal("download successfully", "", "success");
    console.log("audio download", audioInfo);
  },

  //audio play handle
  audioPlay(audioInfo) {
    console.log("audio playing", audioInfo);
  },

  //audio pause handle
  audioPause(audioInfo) {
    console.log("audio pause", audioInfo);
  },

  //When the user has moved/jumped to a new location in audio
  audioSeeked(audioInfo) {
    console.log("audio seeked", audioInfo);
  },

  //When the volume has changed  min = 0.0  max = 1.0
  audioVolumeChange(currentVolume) {
    console.log("audio volume change", currentVolume);
  },

  //The single song is ended handle
  audioEnded(audioInfo) {
    swal("Audio is ended!", "", "success");
    console.log("audio ended", audioInfo);
  },

  //audio load abort The target event like {...,audioName:xx,audioSrc:xx,playMode:xx}
  audioAbort(e) {
    console.log("audio abort", e);
  },

  //audio play progress handle
  audioProgress(audioInfo) {
    // console.log('audio progress',audioInfo);
  },

  //audio load failed error handle
  loadAudioError(e) {
    swal("audio load error", "", "error");
    console.log("audio load err", e);
  }
};

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    params: options
  };
  onAddAudio = () => {
    const data = {
      ...this.state.params,
      audioLists: [
        ...this.state.params.audioLists,
        {
          name: "I'm new here",
          singer: "jack",
          cover: "http://www.lijinke.cn/music/1387583682387727.jpg",
          musicSrc: "http://www.lijinke.cn/music/201711082.mp3"
        }
      ]
    };
    this.setState({
      params: data
    });
  };
  extendsContent = () => {
    const data = {
      ...this.state.params,
      extendsContent: [
        <div key="text1">content1</div>,
        <div key="text1">content2</div>
      ]
    };
    this.setState({
      params: data
    });
  };
  onShowGlassBg = () => {
    this.onChangeKey("glassBg");
  };
  onDrag = () => {
    this.onChangeKey("drag");
  };
  onToggleMode = () => {
    this.onChangeKey("toggle");
  };
  onSeeked = () => {
    this.onChangeKey("seeked");
  };
  onChangeKey = key => {
    const data = {
      ...this.state.params,
      [key]: !this.state.params[key]
    };
    this.setState({ params: data });
  };
  showMiniProcessBar = () => {
    this.onChangeKey("showMiniProcessBar");
  };
  showMiniModeCover = () => {
    this.onChangeKey("showMiniModeCover");
  };
  playModeShowTime = () => {
    const data = {
      ...this.state.params,
      playModeShowTime: createRandomNum(200, 2000)
    };
    this.setState({
      params: data
    });
  };
  render() {
    const { params } = this.state;
    return (
      <div>
        <h2 className="example-title">
          Drag, Click, or switch to phone mode to try  <a target="_blank" href="https://github.com/lijinke666/react-music-player/blob/master/example/example.js">【DEMO SOURCE】</a>
        </h2>
        <section className="settings">
          <button onClick={this.onAddAudio}>
            + add audio ({params.audioLists.length})
          </button>
          <button onClick={this.extendsContent}>+ add extends content</button>
          <button onClick={this.playModeShowTime}>
            change play mode show time ({params.playModeShowTime} ms)
          </button>

          <label htmlFor="glass">
            <input type="checkbox" id="glass" onChange={this.onShowGlassBg} />show
            glass background
          </label>
          <label htmlFor="drag">
            <input
              type="checkbox"
              id="drag"
              checked={params.drag}
              onChange={this.onDrag}
            />drag
          </label>
          <label htmlFor="seeked">
            <input
              type="checkbox"
              id="seeked"
              checked={params.seeked}
              onChange={this.onSeeked}
            />seeked
          </label>
          <label htmlFor="toggle">
            <input
              type="checkbox"
              id="toggle"
              checked={params.toggleMode}
              onChange={this.onToggleMode}
            />toggle mode
          </label>
          <label htmlFor="showMiniProcessBar">
            <input
              type="checkbox"
              id="showMiniProcessBar"
              checked={params.showMiniProcessBar}
              onChange={this.showMiniProcessBar}
            />show mini process bar
          </label>
          <label htmlFor="showMiniModeCover">
            <input
              type="checkbox"
              id="showMiniModeCover"
              checked={params.showMiniModeCover}
              onChange={this.showMiniModeCover}
            />show cover of mini mode
          </label>

          <label htmlFor="showProgressLoadBar">
            <input
              type="checkbox"
              id="showProgressLoadBar"
              checked={params.showProgressLoadBar}
              onChange={() => this.onChangeKey("showProgressLoadBar")}
            />showProgressLoadBar
          </label>
          <label htmlFor="showPlay">
            <input
              type="checkbox"
              id="showPlay"
              checked={params.showPlay}
              onChange={() => this.onChangeKey("showPlay")}
            />showPlay
          </label>
          <label htmlFor="showReload">
            <input
              type="checkbox"
              id="showReload"
              checked={params.showReload}
              onChange={() => this.onChangeKey("showReload")}
            />showReload
          </label>
          <label htmlFor="showDownload">
            <input
              type="checkbox"
              id="showDownload"
              checked={params.showDownload}
              onChange={() => this.onChangeKey("showDownload")}
            />showDownload
          </label>
          <label htmlFor="showPlayMode">
            <input
              type="checkbox"
              id="showPlayMode"
              checked={params.showPlayMode}
              onChange={() => this.onChangeKey("showPlayMode")}
            />showPlayMode
          </label>
          <label htmlFor="showThemeSwitch">
            <input
              type="checkbox"
              id="showThemeSwitch"
              checked={params.showThemeSwitch}
              onChange={() => this.onChangeKey("showThemeSwitch")}
            />showThemeSwitch
          </label>
          <label htmlFor="preload">
            <input
              type="checkbox"
              id="preload"
              checked={params.preload}
              onChange={() => this.onChangeKey("preload")}
            />preload
          </label>
          <label htmlFor="remove">
            <input
              type="checkbox"
              id="remove"
              checked={params.remove}
              onChange={() => this.onChangeKey("remove")}
            />remove
          </label>
        </section>
        <ReactJkMusicPlayer {...params} />
      </div>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById("root"));
