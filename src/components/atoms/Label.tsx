import type { LabelHTMLAttributes } from 'react'
import '../../styles/components/atoms/label.css'

function Label({
  className = '',
  children,
  ...rest
}: LabelHTMLAttributes<HTMLLabelElement>) {
  const classes = ['label', className].filter(Boolean).join(' ')

  return (
    <label className={classes} {...rest}>
      {children}
    </label>
  )
}

export default Label
