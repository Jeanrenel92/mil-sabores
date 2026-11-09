import type { HTMLAttributes } from 'react'
import '../../styles/atoms/title.css'

export type TitleLevel = 1 | 2 | 3
export type TitleAlign = 'left' | 'center'

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: TitleLevel
  align?: TitleAlign
}

function Title({
  level = 1,
  align = 'left',
  className = '',
  children,
  ...rest
}: TitleProps) {
  const Tag = `h${level}` as const
  const classes = ['title', `title--h${level}`, `title--${align}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}

export default Title
