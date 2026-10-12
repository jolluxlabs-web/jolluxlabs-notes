import type { Metadata } from 'next'
import Link from 'next/link'
import { notes } from '@/content/notes'
import { site } from '@/content/site'
import About from '@/content/about.mdx'
import SiteHeader from '@/app/components/SiteHeader'
import DocsSidebar from '@/app/components/DocsSidebar'
import JsonLd from '@/app/components/JsonLd'
import Breadcrumb from '@/app/components/Breadcrumb'
import { trailForAbout } from '@/app/breadcrumbs'
import { forAbout } from '@/app/structured-data'

const description = `${site.author}：${site.authorTagline}`

export const metadata: Metadata = {
  title: '關於我',
  description,
  alternates: { canonical: '/about' },
  openGraph: { type: 'profile', url: '/about', title: `關於我｜${site.name}`, description, images: [{ url: site.logo, width: 512, height: 512, alt: site.name }] },
}

export default function AboutPage() {
  return (
    <main className="docs-page about-page">
      <JsonLd data={forAbout()} />
      <SiteHeader />
      <div className="docs-layout">
        <DocsSidebar current="about" />
        <article className="docs-main">
          <Breadcrumb trail={trailForAbout()} />
          <header className="about-hero">
            <img className="about-avatar" src={site.logo} alt="" />
            <div>
              <p className="eyebrow">ABOUT · 關於我</p>
              <h1>{site.author}</h1>
              <p>{site.authorTagline}</p>
              <div className="about-stats"><span><strong>{notes.length}</strong> 篇筆記</span></div>
            </div>
          </header>
          <div className="article-body"><About /><Link className="end-link" href="/">← 去看看筆記</Link></div>
        </article>
      </div>
    </main>
  )
}
