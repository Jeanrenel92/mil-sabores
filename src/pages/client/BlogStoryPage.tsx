import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Image from '../../components/atoms/Image'
import Tag from '../../components/atoms/Tag'
import Title from '../../components/atoms/Title'
import { blogStories } from '../../data/blogStories'
import '../../styles/client/blogStoryPage.css'

function BlogStoryPage() {
  const { storyId } = useParams()
  const story = blogStories.find((item) => item.id === storyId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [storyId])

  if (!story) {
    return (
      <section className="blogStoryPage">
        <div className="contenedor blogStoryPage__notFound">
          <Title>Historia no encontrada</Title>
          <p>La historia que buscas no está disponible.</p>
          <Link to="/blog" className="blogStoryPage__back">
            ← Volver al blog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <article className="blogStoryPage">
      <div className="contenedor blogStoryPage__inner">
        <Link to="/blog" className="blogStoryPage__back">
          ← Volver al blog
        </Link>

        <header className="blogStoryPage__header">
          <Tag>{story.category}</Tag>
          <Title>{story.title}</Title>
        </header>

        <div className="blogStoryPage__media">
          <Image src={story.image} alt={story.title} fit="contain" rounded />
        </div>

        <div className="blogStoryPage__text">
          {story.paragraphs.map((paragraph, index) => (
            <p key={`${story.id}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  )
}

export default BlogStoryPage
