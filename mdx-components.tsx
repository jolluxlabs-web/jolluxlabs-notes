import type { MDXComponents } from 'mdx/types'
import { InstagramCard, JolluxLabsCard } from '@/app/components/ExternalLinks'

export function useMDXComponents(): MDXComponents {
  return { InstagramCard, JolluxLabsCard }
}
