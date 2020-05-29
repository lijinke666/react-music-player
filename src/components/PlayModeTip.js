import React from 'react'
import cls from 'classnames'

const PlayModeTip = ({ prefix, visible, title, text }) => (
  <div className={cls(`${prefix}-play-model-tip`, { show: visible })}>
    <span className="title">{title}</span>
    <span className="text">{text}</span>
  </div>
)

export default PlayModeTip
