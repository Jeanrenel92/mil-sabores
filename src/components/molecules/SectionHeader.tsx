import Tag from '../atoms/Tag'
import Title from '../atoms/Title'
import '../../styles/components/molecules/sectionHeader.css'

interface SectionHeaderProps {
  title: string
  tag?: string
  description?: string
  level?: 1 | 2
  className?: string
}

function SectionHeader({
  title,
  tag,
  description,
  level = 1,
  className = '',
}: SectionHeaderProps) {
  const classes = ['sectionHeader', className].filter(Boolean).join(' ')

  return (
    <header className={classes}>
      {tag && <Tag>{tag}</Tag>}
      <Title level={level} align="center">
        {title}
      </Title>
      {description && (
        <p className="sectionHeader__description">{description}</p>
      )}
    </header>
  )
}

export default SectionHeader
