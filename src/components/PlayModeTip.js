import React from 'react'
import cls from 'classnames'

const PlayModeTip = ({ prefix, visible, title, text }) => (
  <div className={cls(`${prefix}-play-model-tip`, { show: visible })}>
    <span className={`${prefix}-play-model-tip-title`}>{title}</span>
    <span className={`${prefix}-play-model-tip-text`}>{text}</span>
  </div>
)

export default PlayModeTip
