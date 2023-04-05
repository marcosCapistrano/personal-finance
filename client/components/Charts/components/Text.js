import React from 'react'

export default function Text({x, y, style, children}) {
  return <text x={x} y={y} {...style}>{children}</text>
}
