import '../../styles/molecules/contactInfoItem.css'

interface ContactInfoItemProps {
  label: string
  value: string
  className?: string
}

function ContactInfoItem({
  label,
  value,
  className = '',
}: ContactInfoItemProps) {
  const classes = ['contactInfoItem', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <strong className="contactInfoItem__label">{label}</strong>
      <p className="contactInfoItem__value">{value}</p>
    </div>
  )
}

export default ContactInfoItem
