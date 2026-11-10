import { useState } from 'react'
import SectionHeader from '../../components/molecules/SectionHeader'
import BlogGrid from '../../components/organisms/BlogGrid'
import FeaturedPost from '../../components/organisms/FeaturedPost'
import StoryModal from '../../components/organisms/StoryModal'
import { blogPosts, blogStories, featuredPost } from '../../data/blogStories'
import '../../styles/client/blogPage.css'

function BlogPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedStory =
    blogStories.find((story) => story.id === selectedId) ?? null

  const handleClose = () => setSelectedId(null)

  return (
    <div className="blogPage">
      <section className="blogPage__hero">
        <div className="contenedor">
          <SectionHeader
            tag="NUESTRO BLOG"
            title="Un mundo lleno de dulces sabores"
            description="Descubre historias, recetas, consejos y secretos detrás de la pastelería 1000 Sabores."
          />
        </div>
      </section>

      <FeaturedPost
        image={featuredPost.image}
        imageAlt={featuredPost.imageAlt}
        category={featuredPost.category}
        title={featuredPost.title}
        excerpt={featuredPost.excerpt}
        onRead={() => setSelectedId(featuredPost.id)}
      />

      <section className="blogPage__stories">
        <div className="contenedor">
          <SectionHeader
            level={2}
            tag="NUESTRA HISTORIA"
            title="🎂 Historias de la pastelería"
            description="Conoce las historias, personas y momentos que forman parte de 1000 Sabores."
          />
          <BlogGrid posts={blogPosts} onRead={setSelectedId} />
        </div>
      </section>

      <StoryModal story={selectedStory} onClose={handleClose} />
    </div>
  )
}

export default BlogPage
