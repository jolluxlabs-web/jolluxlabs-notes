import Link from 'next/link'
import { InstagramSidebarLink } from './Instagram'

// 左側欄最下面的作者區：關於我 + IG。手機版側欄變成橫向分類列時不顯示，改由頁首的「關於我」代替。
export default function SidebarAuthor({ current }: { current?: boolean }) {
  return (
    <div className="sidebar-author">
      <Link className={`sidebar-link ${current ? 'active' : ''}`} href="/about">關於我</Link>
      <InstagramSidebarLink />
    </div>
  )
}
