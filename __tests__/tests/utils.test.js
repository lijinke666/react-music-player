import isMobile from "is-mobile";
import assert from "power-assert";
import {
  parseLyric,
  formatTime,
  arrayEqual,
  distinct,
  createRandomNum
} from "../../src/utils";

/* global describe,it*/
describe("utils tests", () => {
  it("is mobile", () => {
    const _isMobile = Object.is(typeof isMobile(), "boolean");
    assert(_isMobile === true);
  });
  it.only("should parse lyric", () => {
    const lrc = parseLyric(`
    [00:00.66]11
    [00:01.62]22
    [00:01.75]33
    [00:01.98]44
    [00:02.98]55
    `);
    assert(Object.values(lrc).length >=0)
    assert(lrc['0'].trim() === "11")
    assert(lrc['1'].trim() === "44")
    assert(lrc['2'].trim() === "55")
  });
  it("should print second return format time", () => {
    assert(formatTime(30000) === "20:00");
    assert(formatTime(60) === "00:60");
    assert(formatTime(140) === "02:20");
  });
  it("should return array is equal", () => {
    assert(arrayEqual([1])([1]) === true);
    assert(arrayEqual([1])([2]) === false);
    assert(arrayEqual([{ musicSrc: "" }])([{ musicSrc: "xx" }]) === false);
    assert(arrayEqual([{ musicSrc: "aa" }])([{ musicSrc: "aa" }]) === true);
  });
  it("should distinct arrar", () => {
    assert(arrayEqual(distinct([1, 1, 1]))([1]) === true);
    assert(arrayEqual(distinct([{ a: 1 }, { a: 1 }]))([{ a: 1 }]) === true);
  });
  it("should render range random", () => {
    const repeat = 10;
    const result = new Array(repeat).fill().map((_, i) => {
      return createRandomNum(0, i + 1) <= i + 1;
    });
    assert(result.filter(v => v).length === repeat);
  });
});
