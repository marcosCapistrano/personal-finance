import React from 'react'

export default function Line({func, style}) {
  return <path d={func()} {...style}></path>
}
