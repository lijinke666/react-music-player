/* global describe,it*/
/*eslint-disable no-console */
//TODOS: 完成点击事件模拟测试 
import React from "react";
import assert from "power-assert";
import { expect } from "chai";
import { shallow, mount } from "enzyme";
// import sinon from 'sinon';

import ReactJkMusicPlayer, { createRandomNum, formatTime } from "../../src";
import PlayerMobile, { PlayModeTip } from "../../src/playerMobile";
import AudioListsPanel from "../../src/audioListsPanel";

describe("<ReactJkMusicPlayer/>", () => {
  it("should render a <ReactJkMusicPlayer/> components", () => {
    const wrapper = mount(<ReactJkMusicPlayer />);
    assert(wrapper.find(".react-jinke-music-player-main").length === 1);
    assert(wrapper.find(".react-jinke-music-player").length >= 1);
  });
  it("should render <AudioListsPanel/> components", () => {
    const wrapper = mount(<ReactJkMusicPlayer />);
    assert(wrapper.find(AudioListsPanel).length === 1);
    assert(wrapper.find(".audio-lists-panel").length === 1);
  });
  it("should find a <PlayerMobile/> components", () => {
    const wrapper = shallow(<PlayerMobile />);
    assert(wrapper.find(".react-jinke-music-player-mobile").length === 1);
    assert(wrapper.find(PlayModeTip).length === 1);
  });
  it("should render mini of full mode", () => {
    const wrapper = mount(<ReactJkMusicPlayer mode="full" />);
    assert(wrapper.props().mode === "full");
    wrapper.setProps({ mode: "mini" });
    assert(wrapper.props().mode === "mini");
  });
  it("should render dark and light theme", () => {
    const wrapper = mount(<ReactJkMusicPlayer theme="dark" />);
    assert(wrapper.props().theme === "dark");
    wrapper.setState({ theme: "dark" });
    assert(wrapper.find(".light-theme").length === 0);
    assert(wrapper.find(".dark-theme").length === 1);
    wrapper.setProps({ theme: "light" });
    wrapper.setState({ theme: "light" });
    assert(wrapper.props().theme === "light");
    assert(wrapper.find(".dark-theme").length === 0);
    assert(wrapper.find(".light-theme").length === 1);
  });
  it('should find audioLists and return Array, playlists show "no music" text ', () => {
    const testProps = {
      audioLists: [
        {
          name: "name",
          singer: "singer",
          cover: "test.jpg",
          musicSrc: "test.mp3"
        }
      ]
    };
    const wrapper = mount(<ReactJkMusicPlayer {...testProps} />);
    assert(wrapper.props().audioLists.length >= 1);
    assert(wrapper.props().audioLists[0].name === "name");
    assert(wrapper.props().audioLists[0].singer === "singer");
    assert(wrapper.props().audioLists[0].cover === "test.jpg");
    assert(wrapper.props().audioLists[0].musicSrc === "test.mp3");
    wrapper.setProps({ audioLists: [] });
    assert(wrapper.props().audioLists.length === 0);
    expect(wrapper.text()).to.contain("no music");
  });
  it("should toggle group setting buttons", () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        showDownload={true}
        showThemeSwitch={true}
        showReload={true}
        showPlayMode={true}
      />
    );
    wrapper.setState({ loading: false, toggle: true });
    assert(wrapper.find(".audio-download").length >= 1);
    assert(wrapper.find(".group").length >= 1);
    assert(wrapper.find(".theme-switch").length >= 1);
    assert(wrapper.find(".reload-btn").length >= 1);
    assert(wrapper.find(".loop-btn").length === 1);
    wrapper.setState({ toggle: false });
    assert(wrapper.find(".audio-download").length === 0);
    assert(wrapper.find(".theme-switch").length === 0);
    assert(wrapper.find(".reload-btn").length === 0);
    assert(wrapper.find(".loop-btn").length === 0);
  });
  it("should find Specified text", () => {
    const testProps = {
      playModeText: {
        order: "order",
        orderLoop: "orderLoop",
        singleLoop: "singleLoop",
        shufflePlay: "shufflePlay"
      },
      controllerTitle: "controllerTitle",
      openText: "openText",
      closeText: "closeText",
      panelTitle: "panelTitle",
      notContentText: "notContentText",
      checkedText: "checkedText",
      unCheckedText: "unCheckedText",
      showDownload: true,
      showThemeSwitch: true,
      showReload: true,
      showPlayMode: true,
      defaultPlayMode: "order"
    };
    const wrapper = mount(<ReactJkMusicPlayer {...testProps} />);
    expect(wrapper.text()).to.contain("openText");

    wrapper.setState({ toggle: false, loading: false });
    expect(wrapper.text()).to.contain("controllerTitle");

    wrapper.setState({ toggle: true });
    expect(wrapper.text()).to.contain("panelTitle");
    expect(wrapper.text()).to.contain("unCheckedText");

    wrapper.setState({ theme: "light" });
    expect(wrapper.text()).to.contain("checkedText");
    expect(wrapper.text()).to.contain("order");

    wrapper.setProps({ defaultPlayMode: "orderLoop" });
    expect(wrapper.text()).to.contain("orderLoop");

    wrapper.setProps({ defaultPlayMode: "singleLoop" });
    expect(wrapper.text()).to.contain("singleLoop");

    wrapper.setProps({ defaultPlayMode: "shufflePlay" });
    expect(wrapper.text()).to.contain("shufflePlay");

    wrapper.setProps({ audioLists: [] });
    expect(wrapper.text()).to.contain("notContentText");
  });
  it("should render range random", () => {
    const repeat = 10;
    const result = new Array(repeat).fill().map((_, i) => {
      return createRandomNum(0, i + 1) <= i + 1;
    });
    expect(result.filter(v => v)).to.have.length(repeat);
  });
  it("should print second return format time", () => {
    assert(formatTime(30000) === "20:00");
    assert(formatTime(60) === "00:60");
    assert(formatTime(140) === "02:20");
  });
//   it('simulates click events', () => {
//     const onButtonClick = sinon.spy();
//     const wrapper = mount(<ReactJkMusicPlayer onMouseDown={onButtonClick} />);
//     wrapper.find('.react-jinke-music-player').simulate('click');
//     expect(onButtonClick).to.have.property('callCount', 1);
//   });
});
