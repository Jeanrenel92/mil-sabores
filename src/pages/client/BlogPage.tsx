import { useState } from 'react'
import Input from '../../components/atoms/Input'
import type { SelectOption } from '../../components/atoms/Select'
import Select from '../../components/atoms/Select'
import SectionHeader from '../../components/molecules/SectionHeader'
import BlogGrid from '../../components/organisms/BlogGrid'
import FeaturedPost from '../../components/organisms/FeaturedPost'
import { blogPosts, featuredPost } from '../../data/blogStories'
import '../../styles/client/blogPage.css'

function BlogPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const categoryOptions: SelectOption[] = Array.from(
    new Set(blogPosts.map((post) => post.category)),
  ).map((item) => ({ value: item, label: item }))
  const searchTerm = search.trim().toLocaleLowerCase('es')
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchTerm === '' ||
      `${post.title} ${post.excerpt} ${post.category}`
        .toLocaleLowerCase('es')
        .includes(searchTerm)
    const matchesCategory = category === '' || post.category === category

    return matchesSearch && matchesCategory
  })

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
        to={`/blog/${featuredPost.id}`}
      />

      <section className="blogPage__stories">
        <div className="contenedor">
          <SectionHeader
            level={2}
            tag="NUESTRA HISTORIA"
            title="🎂 Historias de la pastelería"
            description="Conoce las historias, personas y momentos que forman parte de Mil Sabores."
          />
          <div className="blogPage__filters row g-3">
            <div className="col-12 col-md-7">
              <label className="blogPage__filterLabel" htmlFor="blog-search">
                Buscar historias
              </label>
              <Input
                id="blog-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por título o contenido"
              />
            </div>
            <div className="col-12 col-md-5">
              <label className="blogPage__filterLabel" htmlFor="blog-category">
                Categoría
              </label>
              <Select
                id="blog-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                options={categoryOptions}
                placeholder="Todas las categorías"
              />
            </div>
          </div>
          {filteredPosts.length > 0 ? (
            <BlogGrid posts={filteredPosts} />
          ) : (
            <p className="blogPage__empty" role="status">
              No encontramos historias con esos filtros.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default BlogPage
