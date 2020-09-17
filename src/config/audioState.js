export const AUDIO_NETWORK_STATE = {
  NETWORK_EMPTY: 0, // 未初始化
  NETWORK_IDLE: 1, // 未使用网络 304 缓存
  NETWORK_LOADING: 2, // 浏览器正在下载数据
  NETWORK_NO_SOURCE: 3, // 未找到资源
  NETWORK_READY_SUCCESS_STATE: 4, // 成功
}

export const AUDIO_READY_STATE = {
  HAVE_NOTHING: 0, // 没有关于音频/视频是否就绪的信息
  HAVE_METADATA: 1, // 关于音频/视频就绪的元数据
  HAVE_CURRENT_DATA: 2, // 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒
  HAVE_FUTURE_DATA: 3, // 当前及至少下一帧的数据是可用的
  HAVE_ENOUGH_DATA: 4, // 可用数据足以开始播放
}
