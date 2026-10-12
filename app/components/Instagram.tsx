import { site } from '@/content/site'

const handle = `@${new URL(site.instagram).pathname.replaceAll('/', '')}`

// Instagram 圖示（白色線條，放在漸層底上）
function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

// 頁首右上角的小圓鈕
export function InstagramButton() {
  return (
    <a className="ig-button" href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${handle}`}>
      <InstagramGlyph />
    </a>
  )
}

// IG 名片：關於我頁面和每篇文章結尾都會用到。MDX 裡可以直接寫 <InstagramCard />。
export function InstagramCard({ text = '在 Instagram 追蹤美國生活小筆記' }: { text?: string }) {
  return (
    <a className="ig-card" href={site.instagram} target="_blank" rel="noopener noreferrer">
      <span className="ig-icon"><InstagramGlyph /></span>
      <span className="ig-copy"><strong>{handle}</strong><span>{text}</span></span>
      <span className="ig-follow">追蹤 ↗</span>
    </a>
  )
}
