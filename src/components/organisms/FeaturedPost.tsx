import Button from '../atoms/Button'
import Image from '../atoms/Image'
import Tag from '../atoms/Tag'
import Title from '../atoms/Title'
import '../../styles/components/organisms/featuredPost.css'

interface FeaturedPostProps {
  image: string
  imageAlt: string
  category: string
  title: string
  excerpt: string
  onRead: () => void
  readLabel?: string
}

function FeaturedPost({
  image,
  imageAlt,
  category,
  title,
  excerpt,
  onRead,
  readLabel = 'Leer historia',
}: FeaturedPostProps) {
  return (
    <section className="featuredPost">
      <div className="contenedor featuredPost__inner">
        <div className="featuredPost__media">
          <Image src={image} alt={imageAlt} fit="contain" rounded />
        </div>

        <div className="featuredPost__text">
          <Tag>{category}</Tag>
          <Title level={2}>{title}</Title>
          <p className="featuredPost__excerpt">{excerpt}</p>
          <Button onClick={onRead}>{readLabel}</Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPost
