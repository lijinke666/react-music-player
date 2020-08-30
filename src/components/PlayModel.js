import cls from 'classnames'
import React, { memo } from 'react'

const PlayModel = ({ visible, value }) => (
  <div
    className={cls('play-mode-title', {
      'play-mode-title-visible': visible,
    })}
  >
    {value}
  </div>
)

export default memo(PlayModel)
