import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { noteBySlug, notes } from '@/content/notes'
import { site } from '@/content/site'
import SiteHeader from '@/app/components/SiteHeader'
import DocsSidebar from '@/app/components/DocsSidebar'
import JsonLd from '@/app/components/JsonLd'
import Breadcrumb from '@/app/components/Breadcrumb'
import { InstagramCard } from '@/app/components/Instagram'
import { trailForNote } from '@/app/breadcrumbs'
import { forNote } from '@/app/structured-data'

type Props = { params: Promise<{ slug: string }> }

// 只產生 catalog 裡登記的筆記，其他網址一律 404。
export const dynamicParams = false

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const note = noteBySlug(slug)
  if (!note) return { title: '文章' }
  const path = note.href
  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      title: note.title,
      description: note.summary,
      publishedTime: note.date,
      section: note.category.title,
      images: [{ url: note.coverImage, alt: note.coverAlt }],
    },
    twitter: { card: 'summary_large_image', title: note.title, description: note.summary, images: [note.coverImage] },
  }
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params
  const note = noteBySlug(slug)
  if (!note) notFound()
  const { category } = note
  const { default: Content } = await import(`@/content/notes/${note.slug}.mdx`)
  // 本文目錄：桌機放在左側欄，手機放在文章上方。
  const toc = (className: string) => note.sections.length > 0 && (
    <nav className={`toc ${className}`} aria-label="本文目錄">
      <p>ON THIS PAGE / 本文目錄</p>
      {note.sections.map((section, index) => (
        <a href={`#${section.id}`} key={section.id}>{String(index + 1).padStart(2, '0')}　{section.title}</a>
      ))}
    </nav>
  )

  return (
    <main className="docs-page article-page">
      <JsonLd data={forNote(note)} />
      <SiteHeader />
      <div className="docs-layout">
        <DocsSidebar current={category.slug}>{toc('toc-sidebar')}</DocsSidebar>
        <article className="docs-main">
        <header className="article-hero">
          <Breadcrumb trail={trailForNote(note)} />
          <span className="pill">{category.title}</span>
          <h1>{note.title}</h1>
          <div className="post-meta"><time dateTime={note.date}>{note.dateDisplay}</time><span>·</span><Link href="/about">{site.author}</Link></div>
          <p className="deck">{note.intro}</p>
        </header>
        <div className="article-layout">
          {toc('toc-inline')}
          <div className="article-body"><Content /><InstagramCard text="喜歡這篇筆記？到 IG 追蹤更多 🐻" /><Link className="end-link" href={category.href}>← 回到{category.title}筆記</Link></div>
        </div>
        </article>
      </div>
    </main>
  )
}
