import React from 'react'

interface LabelProps {
    label: string;
}

const Label: React.FC<LabelProps> = ({label}) => {
  return (
        <label className="text-xs leading-none mb-2 block w-full">
            {label}
        </label>
  )
}

export default Label