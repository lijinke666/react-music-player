# [4.18.0](https://github.com/lijinke666/react-music-player/compare/v4.17.1...v4.18.0) (2020-09-06)


### Bug Fixes

* audio auto play when appended new audio if enable autoplayInitLoadPlayList [#146](https://github.com/lijinke666/react-music-player/issues/146) ([c3c40b3](https://github.com/lijinke666/react-music-player/commit/c3c40b3974332eea270bd58046dec77b7355f4a5))
* auto play when audio list changed if autoplayInitLoadPlayList is false [#154](https://github.com/lijinke666/react-music-player/issues/154) ([3f08c70](https://github.com/lijinke666/react-music-player/commit/3f08c70a9625ec64c03e0e0326151f3caf2c5f76))
* call onModeChange and onCoverChange  when destroy button clicked if drag disabled ([c608cea](https://github.com/lijinke666/react-music-player/commit/c608cea5f3f8c6dd25fe7134b1861b64e6498aa3))
* cannot show audio info if audio list is empty by appendAudio [#146](https://github.com/lijinke666/react-music-player/issues/146) ([2c225da](https://github.com/lijinke666/react-music-player/commit/2c225da4b5c71460719eb6e1694113417ff594a6))
* cannot toggle mode if drag disabled [#147](https://github.com/lijinke666/react-music-player/issues/147) ([ca5c5ff](https://github.com/lijinke666/react-music-player/commit/ca5c5ff3f648536f9adba21851d96b4b95f7c792))
* destroy button position in mobile ([2500d17](https://github.com/lijinke666/react-music-player/commit/2500d171f5c79eae603a27a326534fa5d832da35))
* mobile play mode icon align style ([5e1a819](https://github.com/lijinke666/react-music-player/commit/5e1a81941ff7579f3844df843e41f67067120ca3))
* optimize progress load bar light theme bg color ([3127a2e](https://github.com/lijinke666/react-music-player/commit/3127a2e04ecc6b023bf240b53678c02bce5e043d))
* reset audio loaded progress when clear audio ([813b3ab](https://github.com/lijinke666/react-music-player/commit/813b3ab68a7ab6e2493aaa25f6793618fb1a506f))
* theme is reset to dark when audio list changed if theme is auto [#149](https://github.com/lijinke666/react-music-player/issues/149) ([7103183](https://github.com/lijinke666/react-music-player/commit/71031838178c96c4bdf848f087ec5849777447e6))


### Features

* add quietUpdate api for support don't interrupt current play state ([6e09798](https://github.com/lijinke666/react-music-player/commit/6e0979894a026bbb4cc3307366f9c0b4fb12f391))
* new icons & add packup and empty custom icon ([529a36e](https://github.com/lijinke666/react-music-player/commit/529a36e301d5725b0448e66438332b6b79bf61ac))
* rename locale notContentText => emptyText ([58b3ad0](https://github.com/lijinke666/react-music-player/commit/58b3ad093831d9d9ad89b473ffeb12982404e24e))
* support quiet update audio list [#148](https://github.com/lijinke666/react-music-player/issues/148) [#114](https://github.com/lijinke666/react-music-player/issues/114) ([c98105b](https://github.com/lijinke666/react-music-player/commit/c98105b84b218af318dcf2140df433cfd3da0d93))
* Upgrading from `react-icons` v2 to v3 ([fe3ec35](https://github.com/lijinke666/react-music-player/commit/fe3ec35beeec3fcc666cac94426aab0d4d953881))

## [4.17.1](https://github.com/lijinke666/react-music-player/compare/v4.17.0...v4.17.1) (2020-08-26)


### Bug Fixes

* adjust player mini mode size in mobile ([07fd649](https://github.com/lijinke666/react-music-player/commit/07fd649edb7199ce52f2b97e2945ae8c12127bc4))
* cannot show progress load bar in mobile full mode ([88eadb3](https://github.com/lijinke666/react-music-player/commit/88eadb3a15d5fafe2d12066f8194ad0ca5d24dfe))
* cannot trigger touch action in Firefox and Safari in mobile mode [#145](https://github.com/lijinke666/react-music-player/issues/145) ([d9aac9e](https://github.com/lijinke666/react-music-player/commit/d9aac9ef1dc4d5504e8c30702df3a79f48eec3bd))
* optimize audio loaded progress ([2bf7b03](https://github.com/lijinke666/react-music-player/commit/2bf7b03b12d796e21e6b62375e030c2a1aa6de37))

# [4.17.0](https://github.com/lijinke666/react-music-player/compare/v4.16.5...v4.17.0) (2020-08-19)


### Features

* support custom icons [#142](https://github.com/lijinke666/react-music-player/issues/142) ([9761a90](https://github.com/lijinke666/react-music-player/commit/9761a90947f701c4aa5539e8911f3e3f1a96aeac))

## [4.16.5](https://github.com/lijinke666/react-music-player/compare/v4.16.4...v4.16.5) (2020-08-04)


### Bug Fixes

* remove audio title max width [#141](https://github.com/lijinke666/react-music-player/issues/141) ([7ec856e](https://github.com/lijinke666/react-music-player/commit/7ec856ec864078a8ff8345e465aa00d0344b8f4d))

## [4.16.4](https://github.com/lijinke666/react-music-player/compare/v4.16.3...v4.16.4) (2020-07-30)


### Bug Fixes

* pages scroll down when audioList is modified [#133](https://github.com/lijinke666/react-music-player/issues/133) ([a9ce0ca](https://github.com/lijinke666/react-music-player/commit/a9ce0cadaff652c4a262f778ed7265f544778b3c))
* prevent scroll if audio player focus ([4f9087a](https://github.com/lijinke666/react-music-player/commit/4f9087a9489d829238db9a31267c7f1890bb7654))

## [4.16.3](https://github.com/lijinke666/react-music-player/compare/v4.16.2...v4.16.3) (2020-07-17)


### Bug Fixes

* repeat react key ([b17fb8e](https://github.com/lijinke666/react-music-player/commit/b17fb8ec95a3fad8ed4a36c9c3addd752a3d1d54))

## [4.16.2](https://github.com/lijinke666/react-music-player/compare/v4.16.1...v4.16.2) (2020-07-17)


### Bug Fixes

* **media-session:** cannot trigger onAudioSeeked handle if backward or forward from media session ([4f59ff6](https://github.com/lijinke666/react-music-player/commit/4f59ff6b67851a1a2b6b831dd384daf334132973))
* **media-session:** support no cover case [#130](https://github.com/lijinke666/react-music-player/issues/130) ([c0121b5](https://github.com/lijinke666/react-music-player/commit/c0121b51f349f6ab89d093acbe3d1ac332421634))

## [4.16.1](https://github.com/lijinke666/react-music-player/compare/v4.16.0...v4.16.1) (2020-07-02)


### Bug Fixes

* modify theme type define ([c324ae9](https://github.com/lijinke666/react-music-player/commit/c324ae94cb03f5da829181d7916334ef0689fdc0))

## [4.16.0](https://github.com/lijinke666/react-music-player/compare/v4.15.5...v4.16.0) (2020-07-02)


### Bug Fixes

* reset volume to 0.1 if last is mute when toggle mute button ([0dc4be5](https://github.com/lijinke666/react-music-player/commit/0dc4be5d32e704fd6f9dc889e89df56fc8be7617))


### Features

* add audio instance api, like appedAudio, togglePlay [#114](https://github.com/lijinke666/react-music-player/issues/114) ([42bcda1](https://github.com/lijinke666/react-music-player/commit/42bcda1d2851d7a73871bd9f9e4a7e3d3f03b81b))
* support follow system auto set theme ([aeb1630](https://github.com/lijinke666/react-music-player/commit/aeb163063fbaebbc195d2f2d71a26b731f6ec50e))
* update instance type define ([5167a5d](https://github.com/lijinke666/react-music-player/commit/5167a5d960f585fcb248bebfc3b48c3f89529ca9))

## [4.15.5](https://github.com/lijinke666/react-music-player/compare/v4.15.4...v4.15.5) (2020-07-02)


### Bug Fixes

* remove last playing audio throw error [#123](https://github.com/lijinke666/react-music-player/issues/123) ([355f2e1](https://github.com/lijinke666/react-music-player/commit/355f2e171ff84338be5df3a745c9f8193af304ea))
