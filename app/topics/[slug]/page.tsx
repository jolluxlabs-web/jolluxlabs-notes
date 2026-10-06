import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categories, categoryFor, notesIn } from '@/content/notes'
import { absoluteUrl, site } from '@/content/site'
import SiteHeader from '@/app/components/SiteHeader'
import DocsSidebar from '@/app/components/DocsSidebar'
import JsonLd from '@/app/components/JsonLd'
import { breadcrumbList } from '@/app/components/breadcrumbs'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categoryFor((await params).slug)
  if (!category) return { title: '主題' }
  const path = `/topics/${category.slug}`
  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: path },
    openGraph: { url: path, title: category.title, description: category.description, images: [{ url: site.logo, width: 512, height: 512, alt: site.name }] },
    // 還沒有文章的分類先不給搜尋引擎收錄，避免被當成空白頁。
    robots: notesIn(category.slug).length === 0 ? { index: false, follow: true } : undefined,
  }
}

export default async function TopicPage({ params }: Props) {
  const category = categoryFor((await params).slug)
  if (!category) notFound()

  const entries = notesIn(category.slug).sort((a, b) => b.date.localeCompare(a.date))
  const path = `/topics/${category.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        url: absoluteUrl(path),
        name: category.title,
        description: category.description,
        inLanguage: 'zh-Hant',
        isPartOf: { '@id': absoluteUrl('/#website') },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: entries.map((note, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(`/notes/${note.slug}`),
            name: note.title,
          })),
        },
      },
      breadcrumbList([
        { name: '首頁', path: '/' },
        { name: category.title, path },
      ]),
    ],
  }

  return (
    <main className="docs-page topic-page">
      <JsonLd data={structuredData} />
      <SiteHeader />
      <div className="docs-layout">
        <DocsSidebar current={category.slug} />
        <div className="docs-main">
          <div className="breadcrumb"><Link href="/">首頁</Link><span>/</span><span>分類</span><span>/</span><strong>{category.title}</strong></div>
          <header className="topic-hero"><span className="topic-icon" aria-hidden="true">{category.icon}</span><p className="eyebrow">TOPIC · {category.slug.toUpperCase()}</p><h1>{category.title}</h1><p>{category.description}</p></header>
          <section aria-label={`${category.title}文章`}>
            <div className="docs-section-label"><span>這個主題的筆記</span><span>{entries.length} 篇</span></div>
            {entries.length === 0 && (
              <div className="empty-state"><img src="/images/jollux-bear-mark.png" alt="" /><strong>小熊還在整理這個主題</strong><p>筆記寫好就會出現在這裡，敬請期待！</p></div>
            )}
            <div className="topic-entries">
              {entries.map((note) => (
                <Link className="topic-entry" href={`/notes/${note.slug}`} key={note.slug}>
                  <span className="entry-thumb"><img src={note.coverImage} alt="" /></span><span className="entry-copy"><strong>{note.title}</strong><span>{note.summary}</span></span>
                  <span className="entry-meta"><time dateTime={note.date}>{note.dateLabel}</time><span aria-hidden="true">↗</span></span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
