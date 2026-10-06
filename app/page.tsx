import Link from 'next/link'
import SiteHeader from './components/SiteHeader'
import JsonLd from './components/JsonLd'
import { activeCategories, categoryFor, notes } from '@/content/notes'
import { absoluteUrl, site } from '@/content/site'

export default function HomePage() {
  const latest = [...notes].sort((a, b) => b.date.localeCompare(a.date))
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': absoluteUrl('/#website'),
        url: absoluteUrl('/'),
        name: site.name,
        description: site.description,
        inLanguage: 'zh-Hant',
        publisher: { '@id': absoluteUrl('/#publisher') },
      },
      {
        '@type': 'Organization',
        '@id': absoluteUrl('/#publisher'),
        name: site.name,
        url: absoluteUrl('/'),
        logo: absoluteUrl(site.logo),
      },
      {
        '@type': 'ItemList',
        name: '最近更新',
        itemListElement: latest.map((note, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: absoluteUrl(`/notes/${note.slug}`),
          name: note.title,
        })),
      },
    ],
  }

  return (
    <main className="home-page">
      <JsonLd data={structuredData} />
      <SiteHeader />
      <div className="home-layout">
        <aside className="home-sidebar" aria-label="筆記導覽">
          <p className="sidebar-label">筆記庫</p>
          <Link className="sidebar-link active" href="/"><span>所有筆記</span></Link>
          <p className="sidebar-label sidebar-group">分類</p>
          {activeCategories.map((category) => (
            <Link className="sidebar-link" href={`/topics/${category.slug}`} key={category.slug}><span>{category.title}</span></Link>
          ))}
        </aside>

        <div className="home-content">
          <section className="home-intro" aria-labelledby="home-title">
            <div className="intro-copy">
              <p className="eyebrow">PERSONAL NOTES · 美國生活</p>
              <h1 id="home-title">美國生活<span className="hl">筆記</span></h1>
              <p>把在美國生活時遇到的事情，整理成能直接用上的筆記。這裡有親自走過的流程、查過的資料，以及容易忽略的小細節。</p>
            </div>
            <div className="intro-bear" aria-hidden="true">
              <img src="/images/jollux-bear-mark.png" alt="" />
              <span className="bubble">Hi！一起慢慢搞懂美國生活 ♡</span>
            </div>
          </section>

          <section id="latest" className="home-section" aria-labelledby="latest-title">
            <div className="section-heading"><h2 id="latest-title">最近更新</h2><span>{latest.length} 篇文章</span></div>
            <div className="note-list">
              {latest.map((note) => (
                <Link className="note-item" href={`/notes/${note.slug}`} key={note.slug}>
                  <span className="note-thumb"><img src={note.coverImage} alt="" /></span>
                  <span className="note-copy"><strong>{note.title}</strong><small>{note.summary}</small></span>
                  <span className="note-meta">{categoryFor(note.categorySlug)?.title}<br /><time dateTime={note.date}>{note.dateLabel}</time></span>
                </Link>
              ))}
            </div>
          </section>
          <footer className="site-footer">美國生活筆記 · 慢慢整理，持續更新。 · <Link href="/about">關於我</Link></footer>
        </div>
      </div>
    </main>
  )
}
