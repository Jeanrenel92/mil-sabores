import type { ButtonHTMLAttributes } from 'react'
import '../../styles/atoms/iconButton.css'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

function IconButton({
  label,
  type = 'button',
  className = '',
  children = '✕',
  ...rest
}: IconButtonProps) {
  const classes = ['iconButton', className].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} aria-label={label} {...rest}>
      {children}
    </button>
  )
}

export default IconButton
