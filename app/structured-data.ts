// 結構化資料（schema.org JSON-LD）：讓搜尋引擎和 AI 看懂網站、作者、筆記之間的關係。
// 各頁之間靠 @id 互相引用，這些 @id 只在這裡定義；npm run check 會確認每個引用都找得到。
import { categories, notes, notesIn, type Category, type Note } from '../content/notes.ts'
import { absoluteUrl, site } from '../content/site.ts'
import { trailForAbout, trailForNote, trailForTopic, type Trail } from './breadcrumbs.ts'

const websiteId = absoluteUrl('/#website')
const publisherId = absoluteUrl('/#publisher')
const authorId = absoluteUrl('/about#author')

function graph(...nodes: Record<string, unknown>[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}

function breadcrumbList(trail: Trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  }
}

function noteListItems(list: Note[]) {
  return list.map((note, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: absoluteUrl(note.href),
    name: note.title,
  }))
}

export function forHome() {
  return graph(
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: absoluteUrl('/'),
      name: site.name,
      description: site.description,
      inLanguage: 'zh-Hant',
      publisher: { '@id': publisherId },
    },
    {
      '@type': 'Organization',
      '@id': publisherId,
      name: site.name,
      url: absoluteUrl('/'),
      logo: absoluteUrl(site.logo),
    },
    {
      '@type': 'ItemList',
      name: '最近更新',
      itemListElement: noteListItems(notes),
    },
  )
}

export function forNote(note: Note) {
  const url = absoluteUrl(note.href)
  return graph(
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      mainEntityOfPage: url,
      url,
      headline: note.title,
      description: note.summary,
      abstract: note.intro,
      image: absoluteUrl(note.coverImage),
      datePublished: note.date,
      dateModified: note.date,
      inLanguage: 'zh-Hant',
      articleSection: note.category.title,
      author: { '@type': 'Person', '@id': authorId, name: site.author, url: absoluteUrl('/about') },
      publisher: { '@type': 'Organization', '@id': publisherId, name: site.name, logo: { '@type': 'ImageObject', url: absoluteUrl(site.logo) } },
      isPartOf: { '@id': websiteId },
      hasPart: note.sections.map((section) => ({ '@type': 'WebPageElement', name: section.title, url: `${url}#${section.id}` })),
    },
    breadcrumbList(trailForNote(note)),
  )
}

export function forTopic(category: Category) {
  return graph(
    {
      '@type': 'CollectionPage',
      url: absoluteUrl(category.href),
      name: category.title,
      description: category.description,
      inLanguage: 'zh-Hant',
      isPartOf: { '@id': websiteId },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: noteListItems(notesIn(category)),
      },
    },
    breadcrumbList(trailForTopic(category)),
  )
}

export function forAbout() {
  return graph(
    {
      '@type': 'ProfilePage',
      url: absoluteUrl('/about'),
      name: `關於我｜${site.name}`,
      inLanguage: 'zh-Hant',
      isPartOf: { '@id': websiteId },
      mainEntity: { '@id': authorId },
    },
    {
      '@type': 'Person',
      '@id': authorId,
      name: site.author,
      description: site.authorTagline,
      url: absoluteUrl('/about'),
      image: absoluteUrl(site.logo),
      sameAs: [site.instagram],
    },
    breadcrumbList(trailForAbout()),
  )
}

// 全站每一頁的結構化資料，給檢查程式用。
export function forAllPages() {
  return [forHome(), forAbout(), ...notes.map(forNote), ...categories.map(forTopic)]
}
