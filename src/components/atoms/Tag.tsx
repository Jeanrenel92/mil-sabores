import type { HTMLAttributes } from 'react'
import '../../styles/components/atoms/tag.css'

function Tag({
  className = '',
  children,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  const classes = ['tag', className].filter(Boolean).join(' ')

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  )
}

export default Tag
