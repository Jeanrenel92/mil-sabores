import { useEffect } from 'react'
import type { MouseEvent } from 'react'
import Image from '../atoms/Image'
import Tag from '../atoms/Tag'
import ModalHeader from '../molecules/ModalHeader'
import type { BlogStory } from '../../types/blog'
import '../../styles/components/organisms/storyModal.css'

interface StoryModalProps {
  story: BlogStory | null
  onClose: () => void
}

function StoryModal({ story, onClose }: StoryModalProps) {
  useEffect(() => {
    if (!story) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [story, onClose])

  if (!story) return null

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="storyModal" onClick={handleOverlayClick}>
      <div
        className="storyModal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="storyModalTitle"
      >
        <Tag>{story.category}</Tag>
        <ModalHeader
          title={story.title}
          titleId="storyModalTitle"
          onClose={onClose}
        />

        <div className="storyModal__media">
          <Image src={story.image} alt={story.title} fit="contain" rounded />
        </div>

        <div className="storyModal__text">
          {story.paragraphs.map((paragraph, index) => (
            <p key={`${story.id}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StoryModal
