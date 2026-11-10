import type { SelectHTMLAttributes } from 'react'
import '../../styles/atoms/select.css'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  placeholder?: string
  hasError?: boolean
}

function Select({
  options,
  placeholder,
  hasError = false,
  className = '',
  ...rest
}: SelectProps) {
  const classes = ['select', hasError ? 'select--error' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <select className={classes} {...rest}>
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
