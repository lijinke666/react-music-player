//迷你模式进度条
import React from 'react'

const CircleProcessBar = ({ progress = 0, r = 40 } = {}) => {
  const _progress = progress.toFixed(2)
  const perimeter = Math.PI * 2 * r
  const strokeDasharray = `${~~(perimeter * _progress)} ${~~(
    perimeter *
    (1 - _progress)
  )}`
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

export default CircleProcessBar
