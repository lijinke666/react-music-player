// 迷你模式进度条
import React, { memo } from 'react'

const CircleProcessBar = ({ progress = 0, r = 40 } = {}) => {
  const currentProgress = progress.toFixed(2)
  const perimeter = Math.PI * 2 * r
  const strokeDasharray = `${Math.floor(
    perimeter * currentProgress,
  )} ${Math.floor(perimeter * (1 - currentProgress))}`
  return (
    <svg className="audio-circle-process-bar">
      <circle
        cx={r}
        cy={r}
        r={r - 1}
        fill="none"
        className="stroke"
        strokeDasharray={strokeDasharray}
      />
      <circle
        cx={r}
        cy={r}
        r={r - 1}
        fill="none"
        className="bg"
        strokeDasharray="0 1000"
      />
    </svg>
  )
}

export default memo(CircleProcessBar)
