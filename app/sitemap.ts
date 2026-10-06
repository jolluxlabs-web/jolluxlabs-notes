import type { MetadataRoute } from 'next'
import { activeCategories, notes, notesIn } from '@/content/notes'
import { absoluteUrl } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = (dates: string[]) => [...dates].sort().at(-1)

  return [
    { url: absoluteUrl('/'), lastModified: latest(notes.map((note) => note.date)), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/about'), changeFrequency: 'yearly', priority: 0.5 },
    ...activeCategories.map((category) => ({
      url: absoluteUrl(`/topics/${category.slug}`),
      lastModified: latest(notesIn(category.slug).map((note) => note.date)),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...notes.map((note) => ({
      url: absoluteUrl(`/notes/${note.slug}`),
      lastModified: note.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
