import Image from '../atoms/Image'
import Tag from '../atoms/Tag'
import Title from '../atoms/Title'
import '../../styles/molecules/blogCard.css'

interface BlogCardProps {
  image: string
  imageAlt: string
  category: string
  title: string
  excerpt: string
  onRead: () => void
  readLabel?: string
  className?: string
}

function BlogCard({
  image,
  imageAlt,
  category,
  title,
  excerpt,
  onRead,
  readLabel = 'Leer más →',
  className = '',
}: BlogCardProps) {
  const classes = ['blogCard', className].filter(Boolean).join(' ')

  return (
    <article className={classes}>
      <div className="blogCard__media">
        <Image src={image} alt={imageAlt} fit="contain" />
      </div>

      <div className="blogCard__content">
        <Tag>{category}</Tag>
        <Title level={3}>{title}</Title>
        <p className="blogCard__excerpt">{excerpt}</p>
        <button type="button" className="blogCard__read" onClick={onRead}>
          {readLabel}
        </button>
      </div>
    </article>
  )
}

export default BlogCard
