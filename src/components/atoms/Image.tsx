import type { ImgHTMLAttributes } from 'react'
import '../../styles/atoms/image.css'

export type ImageFit = 'contain' | 'cover'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string
  fit?: ImageFit
  rounded?: boolean
}

function Image({
  fit = 'cover',
  rounded = false,
  className = '',
  alt,
  ...rest
}: ImageProps) {
  const classes = [
    'image',
    `image--${fit}`,
    rounded ? 'image--rounded' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <img className={classes} alt={alt} {...rest} />
}

export default Image
