import type { ReactNode } from 'react'
import { site } from '@/content/site'

// 站外連結：IG 和我做的其他網站。左側欄、關於我頁面和文章結尾都從這裡取用。
const handle = `@${new URL(site.instagram).pathname.replaceAll('/', '')}`

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

// 折線圖示：代表 Jollux Labs 的進度追蹤
function TrackerGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 6-6" /><path d="M16 8h4v4" />
    </svg>
  )
}

function SidebarLink({ href, label, icon, children }: { href: string; label: string; icon: ReactNode; children: ReactNode }) {
  return (
    <a className="sidebar-ext" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {icon}<span className="sidebar-ext-copy">{children}</span>
    </a>
  )
}

function LinkCard({ href, icon, title, text, action }: { href: string; icon: ReactNode; title: string; text: string; action: string }) {
  return (
    <a className="link-card" href={href} target="_blank" rel="noopener noreferrer">
      <span className="link-card-icon">{icon}</span>
      <span className="link-card-copy"><strong>{title}</strong><span>{text}</span></span>
      <span className="link-card-action">{action} ↗</span>
    </a>
  )
}

export function InstagramSidebarLink() {
  return <SidebarLink href={site.instagram} label={`Instagram ${handle}`} icon={<InstagramGlyph />}>{handle}</SidebarLink>
}

// MDX 裡可以直接寫 <InstagramCard />
export function InstagramCard({ text = '在 Instagram 追蹤美國生活小筆記' }: { text?: string }) {
  return <LinkCard href={site.instagram} icon={<InstagramGlyph />} title={handle} text={text} action="追蹤" />
}

export function JolluxLabsSidebarLink() {
  const { name, url, short } = site.jolluxLabs
  return <SidebarLink href={url} label={`${name}：${short}`} icon={<TrackerGlyph />}>{name}<small>{short}</small></SidebarLink>
}

// MDX 裡可以直接寫 <JolluxLabsCard />
export function JolluxLabsCard() {
  const { name, url, description } = site.jolluxLabs
  return <LinkCard href={url} icon={<TrackerGlyph />} title={name} text={description} action="前往" />
}
