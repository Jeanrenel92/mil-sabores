import BlogCard from '../molecules/BlogCard'
import type { BlogPost } from '../../types/blog'
import '../../styles/components/organisms/blogGrid.css'

interface BlogGridProps {
  posts: BlogPost[]
  onRead: (id: string) => void
  readLabel?: string
}

function BlogGrid({ posts, onRead, readLabel }: BlogGridProps) {
  return (
    <div className="blogGrid">
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          image={post.image}
          imageAlt={post.imageAlt}
          category={post.category}
          title={post.title}
          excerpt={post.excerpt}
          readLabel={readLabel}
          onRead={() => onRead(post.id)}
        />
      ))}
    </div>
  )
}

export default BlogGrid
