import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categoryFor, notes } from '@/content/notes'
import { absoluteUrl, site } from '@/content/site'
import SiteHeader from '@/app/components/SiteHeader'
import DocsSidebar from '@/app/components/DocsSidebar'
import JsonLd from '@/app/components/JsonLd'
import { breadcrumbList } from '@/app/components/breadcrumbs'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const note = notes.find((item) => item.slug === slug)
  if (!note) return { title: '文章' }
  const path = `/notes/${note.slug}`
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
      section: categoryFor(note.categorySlug)?.title,
      images: [{ url: note.coverImage, alt: note.coverAlt }],
    },
    twitter: { card: 'summary_large_image', title: note.title, description: note.summary, images: [note.coverImage] },
  }
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params
  const note = notes.find((item) => item.slug === slug)
  if (!note) notFound()
  const category = categoryFor(note.categorySlug)
  if (!category) notFound()
  const Content = note.Content
  // 本文目錄：桌機放在左側欄，手機放在文章上方。
  const toc = (className: string) => note.sections.length > 0 && (
    <nav className={`toc ${className}`} aria-label="本文目錄">
      <p>ON THIS PAGE / 本文目錄</p>
      {note.sections.map((section, index) => (
        <a href={`#${section.id}`} key={section.id}>{String(index + 1).padStart(2, '0')}　{section.title}</a>
      ))}
    </nav>
  )
  const url = absoluteUrl(`/notes/${note.slug}`)

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
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
        articleSection: category.title,
        author: { '@type': 'Person', '@id': absoluteUrl('/about#author'), name: site.author, url: absoluteUrl('/about') },
        publisher: { '@type': 'Organization', '@id': absoluteUrl('/#publisher'), name: site.name, logo: { '@type': 'ImageObject', url: absoluteUrl(site.logo) } },
        isPartOf: { '@id': absoluteUrl('/#website') },
        hasPart: note.sections.map((section) => ({ '@type': 'WebPageElement', name: section.title, url: `${url}#${section.id}` })),
      },
      breadcrumbList([
        { name: '首頁', path: '/' },
        { name: category.title, path: `/topics/${category.slug}` },
        { name: note.title, path: `/notes/${note.slug}` },
      ]),
    ],
  }

  return (
    <main className="docs-page article-page">
      <JsonLd data={structuredData} />
      <SiteHeader />
      <div className="docs-layout">
        <DocsSidebar current={category.slug}>{toc('toc-sidebar')}</DocsSidebar>
        <article className="docs-main">
        <header className="article-hero">
          <div className="breadcrumb"><Link href="/">首頁</Link><span>/</span><Link href={`/topics/${category.slug}`}>{category.title}</Link><span>/</span><strong>文章</strong></div>
          <span className="pill">{category.title}</span>
          <h1>{note.title}</h1>
          <div className="post-meta"><time dateTime={note.date}>{note.dateDisplay}</time><span>·</span><Link href="/about">{site.author}</Link></div>
          <p className="deck">{note.intro}</p>
        </header>
        <div className="article-layout">
          {toc('toc-inline')}
          <div className="article-body"><Content /><Link className="end-link" href={`/topics/${category.slug}`}>← 回到{category.title}筆記</Link></div>
        </div>
        </article>
      </div>
    </main>
  )
}
