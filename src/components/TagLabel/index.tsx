import React from 'react'
import styles from './styles.module.scss'

interface TagLabelProp {
  label: string,
  bgColor?: string,
  color?: string,
}
const TagLabel: React.FC<TagLabelProp> = (props: TagLabelProp) => {
  const {
    label,
    bgColor = '#5625BF',
    color = 'white'
  } = props

  const bgColorStyle = {
    background: bgColor
  }
  const labelStyle = {
    color: color
  }
  return (
    <div className={styles.tag_label}
      style={bgColorStyle}
    >
      <p className={styles.label}
        style={labelStyle}
      >{label}</p>
    </div>
  )
}

export default TagLabel