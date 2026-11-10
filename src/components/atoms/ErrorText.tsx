import type { HTMLAttributes } from 'react'
import '../../styles/atoms/errorText.css'

function ErrorText({
  className = '',
  children,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  const classes = ['errorText', className].filter(Boolean).join(' ')

  return (
    <span role="alert" className={classes} {...rest}>
      {children}
    </span>
  )
}

export default ErrorText
