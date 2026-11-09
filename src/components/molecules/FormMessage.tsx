import type { ReactNode } from 'react'
import '../../styles/molecules/formMessage.css'

export type FormMessageType = 'success' | 'error'

interface FormMessageProps {
  type: FormMessageType
  children: ReactNode
  className?: string
}

function FormMessage({ type, children, className = '' }: FormMessageProps) {
  const classes = ['formMessage', `formMessage--${type}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <p role={type === 'error' ? 'alert' : 'status'} className={classes}>
      {children}
    </p>
  )
}

export default FormMessage
