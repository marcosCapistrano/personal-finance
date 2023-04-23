import React, { HTMLProps } from 'react'

interface CardProps {
    className?: HTMLProps<HTMLElement>["className"] 
    children?: React.ReactNode
}

const Card: React.FC<CardProps> = ({className, children}) => {
  return (
    <div className={`
        ${className}
        rounded-xl
    `}>
      {children}
    </div>
  )
}

export default Card