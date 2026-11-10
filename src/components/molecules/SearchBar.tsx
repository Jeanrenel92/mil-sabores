import Input from '../atoms/Input'
import FormField from './FormField'
import '../../styles/molecules/searchBar.css'

interface SearchBarProps {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
}

function SearchBar({
  id,
  value,
  onChange,
  placeholder = 'Buscar...',
  label,
  className = '',
}: SearchBarProps) {
  const classes = ['searchBar', className].filter(Boolean).join(' ')

  const input = (
    <Input
      id={id}
      type="search"
      value={value}
      placeholder={placeholder}
      aria-label={label ?? placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  )

  if (label) {
    return (
      <FormField id={id} label={label} className={classes}>
        {input}
      </FormField>
    )
  }

  return <div className={classes}>{input}</div>
}

export default SearchBar
