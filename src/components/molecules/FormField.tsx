import type { ReactNode } from 'react'
import Label from '../atoms/Label'
import ErrorText from '../atoms/ErrorText'
import '../../styles/components/molecules/formField.css'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  className?: string
  children: ReactNode
}

function FormField({
  id,
  label,
  error,
  className = '',
  children,
}: FormFieldProps) {
  const classes = ['formField', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  )
}

export default FormField
