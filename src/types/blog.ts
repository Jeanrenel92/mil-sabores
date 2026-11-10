export interface BlogPost {
  id: string
  image: string
  imageAlt: string
  category: string
  title: string
  excerpt: string
}

export interface BlogStory {
  id: string
  image: string
  category: string
  title: string
  paragraphs: string[]
}
