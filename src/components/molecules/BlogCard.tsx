import { Link } from 'react-router-dom'
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
  to: string
  readLabel?: string
  className?: string
}

function BlogCard({
  image,
  imageAlt,
  category,
  title,
  excerpt,
  to,
  readLabel = 'Leer más →',
  className = '',
}: BlogCardProps) {
  const classes = ['blogCard', className].filter(Boolean).join(' ')

  return (
    <article className={classes}>
      <Link to={to} className="blogCard__link">
        <div className="blogCard__media">
          <Image src={image} alt={imageAlt} fit="contain" />
        </div>

        <div className="blogCard__content">
          <Tag>{category}</Tag>
          <Title level={3}>{title}</Title>
          <p className="blogCard__excerpt">{excerpt}</p>
          <span className="blogCard__read">{readLabel}</span>
        </div>
      </Link>
    </article>
  )
}

export default BlogCard
