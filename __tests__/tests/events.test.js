/* global describe,it*/
/*eslint-disable no-console */
import React from "react";
import assert from "power-assert";
import { mount } from "enzyme";

import ReactJkMusicPlayer from "../../src";
import AudioListsPanel from "../../src/components/AudioListsPanel";

describe("<ReactJkMusicPlayer/> click events tests", () => {
  it("sinon audio lists panel close events", () => {
    const wrapper = mount(<ReactJkMusicPlayer audioLists={[]} mode="mini" />);
    wrapper.find(".react-jinke-music-player").simulate("click");
    wrapper.setState({ toggle: true });
    assert(wrapper.find(".music-player-panel").length >= 1);
    //展开歌曲列表
    wrapper.find(".audio-lists-btn").simulate("click");
    assert(wrapper.find(AudioListsPanel).length === 1);
    assert(wrapper.state().audioListsPanelVisible === true);

    //关闭歌曲列表
    wrapper.find(".close-btn").simulate("click");
    assert(wrapper.find(AudioListsPanel).length === 1);
    assert(wrapper.state().audioListsPanelVisible === false);

    //切换到迷你模式
    wrapper.find(".hide-panel").simulate("click");
    assert(wrapper.find(AudioListsPanel).length === 1);
    assert(wrapper.state().audioListsPanelVisible === false);
    assert(wrapper.state().toggle === false);

    wrapper.setState({
      audioLists: [
        {
          name: "name",
          singer: "singer",
          cover: "test.jpg",
          musicSrc: "test.mp3"
        }
      ],
      toggle: true,
      isMobile: true,
      audioListsPanelVisible: true
    });
    wrapper.find(".audio-item").simulate("click");
  });

  it("change audio lists", () => {
    const wrapper = mount(<ReactJkMusicPlayer audioLists={[]} />);
    wrapper.setProps({
      audioLists: [
        {
          name: "name",
          singer: "singer",
          cover: "test.jpg",
          musicSrc: "test.mp3"
        }
      ]
    });
    wrapper.find(".react-jinke-music-player").simulate("click");
    assert(wrapper.state().audioLists.length === 1);
    //删除列表
    wrapper.find(".delete-btn").simulate("click");
    assert(wrapper.state().audioLists.length === 0);
    assert(wrapper.state().currentTime === 0);
    assert(wrapper.state().duration === 0);

    //列表更新
    wrapper.setProps({
      audioLists: [
        {
          name: "name",
          singer: "singer",
          cover: "test.jpg",
          musicSrc: "test.mp3"
        },
        {
          name: "name",
          singer: "singer",
          cover: "test.jpg",
          musicSrc: "test.mp3"
        }
      ]
    });

    assert(wrapper.state().audioLists.length === 2);
  });

  it("toggle theme", () => {
    const wrapper = mount(<ReactJkMusicPlayer audioLists={[]} mode="full" />);
    wrapper.setState({ theme: "dark" });
    wrapper.find(".theme-switch").simulate("click");
    assert(wrapper.state().theme === "dark");
    wrapper.find(".theme-switch").simulate("click");
    wrapper.setState({ theme: "light" });
    assert(wrapper.state().theme === "light");
    assert(wrapper.find(".light-theme").length === 1);
  });
  it("click reload button", () => {
    const wrapper = mount(<ReactJkMusicPlayer audioLists={[]} mode="full" />);
    wrapper.find(".reload-btn").simulate("click");
    assert(wrapper.state().currentTime === 0);
  });
  it("click pause and play button", () => {
    const wrapper = mount(<ReactJkMusicPlayer audioLists={[]} mode="full" />);
    //暂停
    wrapper.find(".play-btn").simulate("click");
    assert(wrapper.state().pause === true);
    assert(wrapper.state().playing === false);
  });
  it("click prev and next audio", () => {
    const wrapper = mount(<ReactJkMusicPlayer audioLists={[]} mode="full" />);
    wrapper.setState({
      audioLists: [
        {
          name: "prev",
          singer: "singer",
          cover: "test.jpg",
          musicSrc: "test.mp3"
        },
        {
          name: "next",
          singer: "singer",
          cover: "test.jpg",
          musicSrc: "test.mp3"
        }
      ]
    });
    wrapper.find(".next-audio").simulate("click");
    assert(wrapper.state().name === "prev");
    wrapper.setState({ loading: false });
    wrapper.find(".prev-audio").simulate("click");
    assert(wrapper.state().name === "next");
  });
  it("click mute", () => {
    const wrapper = mount(
      <ReactJkMusicPlayer audioLists={[]} mode="full" defaultVolume={100} />
    );
    //静音
    wrapper.find(".sounds-icon").simulate("click");
    assert(wrapper.state().isMute === true);
    assert(wrapper.state().soundValue === 0);
  });
  it("click change play mode", () => {
    const wrapper = mount(
      <ReactJkMusicPlayer audioLists={[]} mode="full" defaultPlayMode="order" />
    );
    wrapper.setState({ playMode: "order", toggle: true });
    assert(wrapper.state().playMode === "order");
    wrapper.find(".loop-btn").simulate("click");
    assert(wrapper.state().playMode === "orderLoop");
    wrapper.find(".loop-btn").simulate("click");
    assert(wrapper.state().playMode === "singleLoop");
    wrapper.find(".loop-btn").simulate("click");
    assert(wrapper.state().playMode === "shufflePlay");
  });
});
