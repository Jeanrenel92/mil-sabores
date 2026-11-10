import type { InputHTMLAttributes } from 'react'
import '../../styles/atoms/input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

function Input({
  type = 'text',
  hasError = false,
  className = '',
  ...rest
}: InputProps) {
  const classes = ['input', hasError ? 'input--error' : '', className]
    .filter(Boolean)
    .join(' ')

  return <input type={type} className={classes} {...rest} />
}

export default Input
