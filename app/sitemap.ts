import type { MetadataRoute } from 'next'
import { activeCategories, notes, notesIn } from '@/content/notes'
import { absoluteUrl } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), lastModified: notes[0]?.date, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/about'), changeFrequency: 'yearly', priority: 0.5 },
    ...activeCategories.map((category) => ({
      url: absoluteUrl(category.href),
      lastModified: notesIn(category)[0]?.date,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...notes.map((note) => ({
      url: absoluteUrl(note.href),
      lastModified: note.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
