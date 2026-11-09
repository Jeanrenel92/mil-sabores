import type { TextareaHTMLAttributes } from 'react'
import '../../styles/atoms/textarea.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

function Textarea({
  rows = 5,
  hasError = false,
  className = '',
  ...rest
}: TextareaProps) {
  const classes = ['textarea', hasError ? 'textarea--error' : '', className]
    .filter(Boolean)
    .join(' ')

  return <textarea rows={rows} className={classes} {...rest} />
}

export default Textarea
