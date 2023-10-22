import React from 'react'

interface IconProps {
  src: string
  size?: number
}
const Icon: React.FC<IconProps> = (props: IconProps) => {
  const {
    src,
    size = 20
  } = props
  return (
    <div>
      <img src={src}
        width={size}
        height={size}
        alt={src}
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}

export default Icon