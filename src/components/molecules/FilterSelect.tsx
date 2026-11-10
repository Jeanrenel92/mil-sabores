import Select from '../atoms/Select'
import type { SelectOption } from '../atoms/Select'
import FormField from './FormField'
import '../../styles/molecules/filterSelect.css'

interface FilterSelectProps {
  id: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  label?: string
  placeholder?: string
  className?: string
}

function FilterSelect({
  id,
  value,
  onChange,
  options,
  label = 'Categoría',
  placeholder = 'Todas las categorías',
  className = '',
}: FilterSelectProps) {
  const classes = ['filterSelect', className].filter(Boolean).join(' ')

  return (
    <FormField id={id} label={label} className={classes}>
      <Select
        id={id}
        value={value}
        options={options}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </FormField>
  )
}

export default FilterSelect
