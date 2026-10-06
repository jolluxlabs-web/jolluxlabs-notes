import Link from 'next/link'
import type { ReactNode } from 'react'
import { activeCategories } from '@/content/notes'

export default function DocsSidebar({ current, children }: { current: string; children?: ReactNode }) {
  return (
    <aside className="docs-sidebar" aria-label="筆記分類">
      <p className="sidebar-label">LIBRARY / 筆記分類</p>
      <Link href="/" className="sidebar-home">全部筆記</Link>
      {activeCategories.map((item) => <Link key={item.slug} className={`sidebar-link ${item.slug === current ? 'active' : ''}`} href={`/topics/${item.slug}`}>{item.title}</Link>)}
      {children}
    </aside>
  )
}
