import IconButton from '../atoms/IconButton'
import Title from '../atoms/Title'
import '../../styles/molecules/modalHeader.css'

interface ModalHeaderProps {
  title: string
  onClose: () => void
  titleId?: string
  closeLabel?: string
  className?: string
}

function ModalHeader({
  title,
  onClose,
  titleId,
  closeLabel = 'Cerrar',
  className = '',
}: ModalHeaderProps) {
  const classes = ['modalHeader', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Title level={2} id={titleId} className="modalHeader__title">
        {title}
      </Title>
      <IconButton label={closeLabel} onClick={onClose} />
    </div>
  )
}

export default ModalHeader
